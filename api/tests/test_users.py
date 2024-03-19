from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
import bcrypt

client = TestClient(app)

hashed_password = bcrypt.hashpw(
    "password".encode("utf-8"), bcrypt.gensalt()
).decode("utf-8")


class EmptyUserRepository:
    def get_all(self):
        return []


class CreateUserQueries:
    def create(self, user, hashed_password):
        result = {
            "id": 1,
            "name": "Test User",
            "phone_number": "1234567890",
            "email": "testuser@example.com",
            "username": "testuser",
            "hashed_password": hashed_password,
            "address": "123 Test St",
            "state": "la",
            "zip_code": "12345",
        }
        result.update(user)
        return result

    def get(self, username):
        if username == "testuser":
            return {
                "id": 1,
                "name": "Test User",
                "phone_number": "1234567890",
                "email": "testuser@example.com",
                "username": "testuser",
                "hashed_password": hashed_password,
                "address": "123 Test St",
                "state": "la",
                "zip_code": "12345",
            }
        return None

    def delete(self, user_id):
        if user_id == 1:
            return True
        return False


def test_get_all_users():
    app.dependency_overrides[UserRepository] = EmptyUserRepository
    response = client.get("/api/users")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_delete_user():
    user_id = 1
    app.dependency_overrides[UserRepository] = CreateUserQueries
    token = "insert access_token here"
    headers = {"Authorization": f"Bearer {token}"}
    response = client.delete(f"/api/users/{user_id}", headers=headers)
    app.dependency_overrides = {}
    print(response.json())
    assert response.status_code == 200
    assert response.json()


def test_get_all_user_pets():
    class MockUserRepository(UserRepository):
        def get_user_pets(self, id):
            return [
                {
                    "id": 1,
                    "name": "string",
                    "age": "string",
                    "breed": "string",
                    "pet_type": "string",
                    "description": "string",
                    "adoption_status": "string",
                    "day_in": "2024-03-06",
                    "day_out": "2024-03-06",
                    "owner_id": 1,
                    "photo_url": "https://www.google.com/",
                }
            ]

    app.dependency_overrides[UserRepository] = MockUserRepository

    response = client.get("/api/users/1/pets")
    assert response.status_code == 200
    assert response.json() == MockUserRepository().get_user_pets(1)

    app.dependency_overrides = {}


def test_create_user():
    # ARRANGE
    app.dependency_overrides[UserRepository] = CreateUserQueries
    user_data = {
        "name": "Test User",
        "phone_number": "1234567890",
        "email": "testuser@example.com",
        "username": "testuser",
        "password": "password",
        "address": "123 Test St",
        "state": "la",
        "zip_code": "12345",
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
    response = client.post("/api/users", json=user_data, headers=headers)
    print("RESPONSE", response.status_code)
    print("RESPONSE", response.json())
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "token_type" in response.json()
    assert "account" in response.json()
    assert response.json()["account"]["id"] == 1
    assert response.json()["account"]["name"] == "Test User"
    assert response.json()["account"]["phone_number"] == "1234567890"
    assert response.json()["account"]["email"] == "testuser@example.com"
    assert response.json()["account"]["username"] == "testuser"
    assert response.json()["account"]["address"] == "123 Test St"
    assert response.json()["account"]["state"] == "la"
    assert response.json()["account"]["zip_code"] == "12345"


def test_init():
    assert 1 == 1
