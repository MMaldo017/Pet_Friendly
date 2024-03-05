import os
from pydantic import BaseModel
from psycopg_pool import ConnectionPool
from typing import List, Union, Optional

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class PetIn(BaseModel):
    name: str
    age: Optional[str]
    breed: Optional[str]
    pet_type: str
    description: Optional[str]
    day_in: str
    day_out: Optional[str]
    owner_id: int


class PetOut(BaseModel):
    id: int
    name: str
    age: Optional[str]
    breed: Optional[str]
    pet_type: str
    description: Optional[str]
    day_in: str
    day_out: Optional[str]
    owner_id: int


class PetRepository:
    def get_all(self) -> Union[Error, List[PetOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT   id,
                        name,
                        age,
                        breed,
                        pet_type,
                        description,
                        day_in, day_out,
                        owner_id
                        FROM pets
                        ORDER BY pet_type;

                        """
                    )
                    result = []
                    for record in db:
                        pet = PetOut(
                            id=record[0],
                            name=record[1],
                            age=record[2],
                            breed=record[3],
                            pet_type=record[4],
                            description=record[5],
                            day_in=str(record[6]),
                            day_out=str(record[7]),
                            owner_id=record[8],
                        )
                        result.append(pet)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all Pets"}

    def create_pet(self, pet: PetIn) -> PetOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO pets (
                            name,
                            age,
                            breed,
                            pet_type,
                            description,
                            day_in,
                            day_out,
                            owner_id
                            )
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id,
                        name,
                        age,
                        breed,
                        pet_type,
                        description,
                        day_in,
                        day_out,
                        owner_id;
                        """,
                        (
                            pet.name,
                            pet.age,
                            pet.breed,
                            pet.pet_type,
                            pet.description,
                            pet.day_in,
                            pet.day_out,
                            pet.owner_id,
                        ),
                    )
                    id = result.fetchone()[0]

                    return PetOut(
                        id=id,
                        name=pet.name,
                        age=pet.age,
                        breed=pet.breed,
                        pet_type=pet.pet_type,
                        description=pet.description,
                        day_in=pet.day_in,
                        day_out=pet.day_out,
                        owner_id=pet.owner_id,
                    )
        except Exception:
            return {"message": "Could not create pet"}
