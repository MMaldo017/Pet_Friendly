import os
from pydantic import BaseModel, AnyUrl
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
    adoption_status: Optional[str]
    day_in: str
    day_out: Optional[str]
    owner_id: int
    photo_url: Optional[AnyUrl]


class PetOut(BaseModel):
    id: int
    name: str
    age: Optional[str]
    breed: Optional[str]
    pet_type: str
    description: Optional[str]
    adoption_status: Optional[str]
    day_in: str
    day_out: Optional[str]
    owner_id: int
    photo_url: Optional[AnyUrl]


class PetIdOut(BaseModel):
    id: int


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
                        owner_id,
                        photo_url
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
                            photo_url=record[9],
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
                            owner_id,
                            photo_url
                            )
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id,
                        name,
                        age,
                        breed,
                        pet_type,
                        description,
                        day_in,
                        day_out,
                        owner_id,
                        photo_url;
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
                            pet.photo_url,
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
                        photo_ur=pet.photo_url,
                    )
        except Exception:
            return {"message": "Could not create pet"}

    def update_pet(self, pet_id: int, pet: PetIn) -> Union[PetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE pets
                        SET name = %s,
                            age = %s,
                            breed = %s,
                            pet_type = %s,
                            description = %s,
                            adoption_status = %s,
                            day_in = %s,
                            day_out = %s,
                            owner_id = %s,
                            photo_url = %s,
                        WHERE id = %s
                        """,
                        [
                            pet.name,
                            pet.age,
                            pet.breed,
                            pet.pet_type,
                            pet.description,
                            pet.adoption_status,
                            pet.day_in,
                            pet.day_out,
                            pet.owner_id,
                            pet.photo_url,
                            pet_id,
                        ],
                    )
                    pet_data = pet.dict()
                    return PetOut(id=pet_id, **pet_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update pet"}

    def is_valid_pet_id(self, pet_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                        FROM pets
                        WHERE id = %s
                        """,
                        [pet_id],
                    )
                    return bool(db.fetchone())
        except Exception as e:
            print(e)
            return False
