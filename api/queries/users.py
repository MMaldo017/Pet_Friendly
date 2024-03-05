import os
from datetime import date
from pydantic import BaseModel
from typing import Optional, List, Union
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class UserIn(BaseModel):
    name: str
    phone_number: str
    email: str
    username: str
    password: str
    address: str
    state: str
    zip_code: str


class UserOut(BaseModel):
    id: int
    name: str
    phone_number: str
    email: str
    username: str
    address: str
    state: str
    zip_code: str


class UserInfoOut(BaseModel):
    id: int
    name: str
    phone_number: str
    email: str
    address: str
    state: str
    zip_code: str


class UserPetOut(BaseModel):
    id: int
    name: str
    age: str
    breed: Optional[str]
    pet_type: str
    description: Optional[str]
    adoption_status: Optional[str]
    day_in: Optional[date]
    day_out: Optional[date]
    owner_id: int


class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepository:
    def create(
        self, user: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users (
                            name,
                            phone_number,
                            email,
                            username,
                            hashed_password,
                            address,
                            state,
                            zip_code
                        )
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id,
                        name,
                        phone_number,
                        hashed_password,
                        address,
                        state,
                        zip_code;
                        """,
                        [
                            user.name,
                            user.phone_number,
                            user.email,
                            user.username,
                            hashed_password,
                            user.address,
                            user.state,
                            user.zip_code,
                        ],
                    )
                    id = result.fetchone()[0]
                    return UserOutWithPassword(
                        id=id,
                        name=user.name,
                        phone_number=user.phone_number,
                        email=user.email,
                        username=user.username,
                        hashed_password=hashed_password,
                        address=user.address,
                        state=user.state,
                        zip_code=user.zip_code,
                    )
        except Exception:
            return {"message": "Could not create a user"}

    def get(self, username: str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        name,
                        phone_number,
                        email,
                        username,
                        hashed_password,
                        address,
                        state,
                        zip_code
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception:
            return {"message": "Could not get account"}

    def get_all(self) -> Union[Error, List[UserInfoOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        name,
                        phone_number,
                        email,
                        address,
                        state,
                        zip_code
                        FROM users
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_user_info_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def get_user_pets(
        self, id: int
    ) -> Optional[Union[Error, List[UserPetOut]]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM pets
                        WHERE owner_id = %s
                        """,
                        [id],
                    )
                    return [
                        self.record_to_pets_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all pets"}

    def record_to_pets_out(self, record):
        return UserPetOut(
            id=record[0],
            name=record[1],
            age=record[2],
            breed=record[3],
            pet_type=record[4],
            description=record[5],
            adoption_status=record[6],
            day_in=record[7],
            day_out=record[8],
            owner_id=record[9],
        )

    def record_to_user_out(self, record) -> UserOutWithPassword:
        account_dict = {
            "id": record[0],
            "name": record[1],
            "phone_number": record[2],
            "email": record[3],
            "username": record[4],
            "hashed_password": record[5],
            "address": record[6],
            "state": record[7],
            "zip_code": record[8],
        }

        return account_dict

    def record_to_user_info_out(self, record) -> UserInfoOut:
        account_dict = {
            "id": record[0],
            "name": record[1],
            "phone_number": record[2],
            "email": record[3],
            "address": record[4],
            "state": record[5],
            "zip_code": record[6],
        }

        return account_dict
