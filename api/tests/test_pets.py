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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0M2RkNjBlNS1iNWIw"
        "LTRhNGUtYTg2ZC1kMDRkZTU2MGQ2YTEiLCJleHAiOjE3MTA0Mzg4MzEsInN1YiI6I"
        "mNoYXJsZXMuYWdhckBpY2xvdWQuY29tIiwiYWNjb3VudCI6eyJpZCI6MTEsIm5hbW"
        "UiOiJmcm9udGVuZCIsInBob25lX251bWJlciI6Ijk4NTI5MDQ2OTEiLCJlbWFpbCI"
        "6ImNoYXJsZXMuYWdhckBpY2xvdWQuY29tIiwidXNlcm5hbWUiOiJmcm9udGVuZCIsI"
        "mFkZHJlc3MiOiIxNzI1IG1hcnkgZHIiLCJzdGF0ZSI6IkxBIiwiemlwX2NvZGUiOi"
        "I3MDQ1OCJ9fQ.xWi0gTxeB4fJTstp6WjfAxa3NjjkEX1t-DbF4etXoMs"
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
