from queries.pets import PetOut, PetRepository
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
