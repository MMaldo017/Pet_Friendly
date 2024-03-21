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

    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NGU"
    "4ZWE3ZC00NjIzLTRkY2UtYjlhZi1kNmQzZGE3ZDg3NDUiLCJleHAiOjE3MTA4"
    "NjY3MDYsInN1YiI6Im1hcnRpbkBlbWFpbC5jb20iLCJhY2NvdW50Ijp7ImlkI"
    "jozLCJuYW1lIjoicGV0cyIsInBob25lX251bWJlciI6IjEyMzQ1Njc"
    "4OTkiLCJlbWFpbCI6Im1hcnRpbkBlbWFpbC5jb20iLCJ1c2VybmFtZ"
    "SI6Im1hcnRpbjAxNyIsImFkZHJlc3MiOiIxMjMiLCJzdGF0ZSI6IldBIiwiem"
    "lwX2NvZGUiOiIxMjM0NSJ9fQ.pIndrSmW1mH1FwAygc1mhEZyXMLgeD3kLO1p8o_mOOM"
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/api/pets", json=pet_data, headers=headers)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
