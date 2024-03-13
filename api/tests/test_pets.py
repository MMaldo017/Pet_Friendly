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
            "owner_id": 1,
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
        "owner_id": 1,
        "photo_url": (
            "https://tse4.mm.bing.net/th?id=OIP.wsAQLK9hlP0iRjbmL3MBYgHaFj"
            "&pid=Api&P=0&h=220"
        ),
    }
    # ACT
    token = (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
        "eyJqdGkiOiI1NzY0YzI4NS01OTM4LTQ0MzktOTNiMC1kM"
        "WRmMGFiMmQzMDgiLCJleHAiOjE3MTAzNTAxMzUs"
        "InN1YiI6InN0cmluZyIsImFjY291bnQiOnsiaWQiOjQs"
        "Im5hbWUiOiJuYW1lIiwicGhvbmVfbnVtYmVyIjoi"
        "c3RyaW5nIiwiZW1haWwiOiJzdHJpbmciLCJ1c2VybmFtZSI6"
        "InRvZGF5IiwiYWRkcmVzcyI6InN0cmluZyIs"
        "InN0YXRlIjoibGEiLCJ6aXBfY29kZSI6IjcwNDU4In19."
        "KnbjOO9nHje0oMGUlJyt-yaMayqWd0SSQxl7rK1WaTU"
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
