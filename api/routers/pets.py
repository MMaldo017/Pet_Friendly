from queries.pets import PetOut, PetRepository, PetIn
from typing import List, Union
from pydantic import BaseModel
from fastapi import (
    Depends,
    # HTTPException,
    status,
    Response,
    APIRouter,
    # Request,
)
from authenticator import authenticator

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
    account_data: dict = Depends(authenticator.get_current_account_data),
):

    created_pet_id = repo.create_pet(pet_in)
    return created_pet_id


@router.put("/api/pets/{pet_id}", response_model=Union[PetOut, Error])
def update_pet(
    pet: PetIn,
    pet_id: int,
    response: Response,
    repo: PetRepository = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
) -> Union[PetOut, Error]:
    updated_pet = repo.update_pet(pet_id, pet)

    if repo.is_valid_pet_id(pet_id):
        return updated_pet
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": f"Pet with id {pet_id} does not exist"}
