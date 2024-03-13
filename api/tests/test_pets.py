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
            "id": 4,
            "name": "string",
            "age": "string",
            "breed": "string",
            "pet_type": "string",
            "description": "string",
            "adoption_status": None,
            "day_in": "2024/3/3",
            "day_out": "2024/4/4",
            "owner_id": 9,
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
        "owner_id": 9,
        "photo_url": (
            "https://tse4.mm.bing.net/th?id=OIP.wsAQLK9hlP0iRjbmL3MBYgHaFj"
            "&pid=Api&P=0&h=220"
        ),
    }
    expected = {
        "id": 4,
        "name": "Test Pet",
        "age": "2 years",
        "breed": "Test Breed",
        "pet_type": "Dog",
        "description": "Test Description",
        "adoption_status": "Available",
        "day_in": "2024/3/3",
        "day_out": "2024/4/4",
        "owner_id": 9,
        "photo_url": (
            "https://tse4.mm.bing.net/th?id=OIP.wsAQLK9hlP0iRjbmL3MBYgHaFj"
            "&pid=Api&P=0&h=220"
        ),
    }
    # ACT
    token = (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZWFiZjQ0Zi0y"
        "NTE1LTQwNWMtODdmNi1mOGRkZGQ5ZTU2OTIiLCJleHAiOjE3MTAzNjQ5NDEsInN1YiI6"
        "InN0cmluZyIsImFjY291bnQiOnsiaWQiOjksIm5hbWUiOiJibGFoIiwicGhvbmVfbnVtY"
        "mVyIjoic3RyaW5nIiwiZW1haWwiOiJzdHJpbmciLCJ1c2VybmFtZSI6ImJsYWgiLCJhZG"
        "RyZXNzIjoic3RyaW5nIiwic3RhdGUiOiJsYSIsInppcF9jb2RlIjoiNzA0NTgifX0.ekm"
        "ZIUbBIwN0pUSwuLfQJe6ochF3UYn31O3jATp0nf4"
    )
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/api/pets", json=pet_data, headers=headers)
    print("RESPONSE", response.status_code)
    print("RESPONSE", response.json())
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
