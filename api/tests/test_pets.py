from fastapi.testclient import TestClient
from main import app
from queries.pets import PetRepository

client = TestClient(app)


class EmptyPetRepository:
    def get_all(self):
        return []


class CreatePetQueries:
    def create_pet(self, pet):
        result = {
            "id": 5,
            "name": "string",
            "age": "string",
            "breed": "string",
            "pet_type": "string",
            "description": "string",
            "adoption_status": None,
            "day_in": "2024/3/3",
            "day_out": "2024/4/4",
            "owner_id": 2,
            "photo_url": None,
        }
        result.update(pet)
        return result


def test_get_all_pets():
    app.dependency_overrides[PetRepository] = EmptyPetRepository
    response = client.get("/api/pets")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_pet():
    # ARRANGE
    app.dependency_overrides[PetRepository] = CreatePetQueries
    pet_data = {
        "name": "Test Pet",
        "age": "2 years",
        "breed": "Test Breed",
        "pet_type": "Dog",
        "description": "Test Description",
        "adoption_status": "Available",
        "day_in": "2024/3/3",
        "day_out": "2024/4/4",
        "owner_id": 1,
        "photo_url": None,
    }
    expected = {
        "id": 5,
        "name": "Test Pet",
        "age": "2 years",
        "breed": "Test Breed",
        "pet_type": "Dog",
        "description": "Test Description",
        "adoption_status": "Available",
        "day_in": "2024/3/3",
        "day_out": "2024/4/4",
        "owner_id": 1,
        "photo_url": None,
    }
    # ACT
    response = client.post("/api/pets", json=pet_data)
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
