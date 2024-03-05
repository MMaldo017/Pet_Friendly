from queries.pets import PetOut, PetRepository, PetIn
from typing import List, Union
from pydantic import BaseModel
from fastapi import (
    Depends,
    # HTTPException,
    # status,
    # Response,
    APIRouter,
    # Request,
)

router = APIRouter()


class Error(BaseModel):
    message: str


@router.get("/api/pets", response_model=Union[Error, List[PetOut]])
def get_all(
    repo: PetRepository = Depends(),
):
    return repo.get_all()


@router.post("/api/pets", response_model=PetOut)
def create_pet(
    pet_in: PetIn,
    repo: PetRepository = Depends(),
):

    created_pet_id = repo.create_pet(pet_in)
    return created_pet_id
