import os
from pydantic import BaseModel
from psycopg_pool import ConnectionPool
from typing import List, Union, Optional

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


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
                            day_out=record[7],
                            owner_id=record[8],
                        )
                        result.append(pet)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all Pets"}
