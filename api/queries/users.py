import os
from pydantic import BaseModel
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


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


class UserRepository:
    def create_user(self, user: UserIn) -> UserOut:
        id = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                        INSERT INTO users (
                            name,
                            phone_number,
                            email,
                            username,
                            password,
                            address,
                            state,
                            zip_code
                        )
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                    [
                        user.name,
                        user.phone_number,
                        user.email,
                        user.username,
                        user.password,
                        user.address,
                        user.state,
                        user.zip_code,
                    ],
                )

                id = result.fetchone()[0]
                old_data = user.dict()
                return UserOut(id=id, **old_data)
