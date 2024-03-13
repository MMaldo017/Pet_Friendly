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


def test_get_all_users():
    app.dependency_overrides[UserRepository] = EmptyUserRepository
    response = client.get("/api/users")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNjhmMWU"
        "xNS1lNmViLTRkYTEtOGI3Zi01YzlmYmVhZDg4YTUiLCJleHAiOjE3MTAz"
        "NjA4MTUsInN1YiI6InN0cmluZyIsImFjY291bnQiOnsiaWQiOjcsIm5hbWU"
        "iOiJtYXJ0aW4iLCJwaG9uZV9udW1iZXIiOiJzdHJpbmciLCJlbWFpbCI6In"
        "N0cmluZyIsInVzZXJuYW1lIjoibWFydGluIiwiYWRkcmVzcyI6InN0cmluZy"
        "IsInN0YXRlIjoidHgiLCJ6aXBfY29kZSI6IjcwNDg4In19.sAz7YqFRrtFKEg"
        "P70UWumEQ20_26djIIKRlmyIAstX4"
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
