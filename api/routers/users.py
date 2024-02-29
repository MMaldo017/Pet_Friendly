from fastapi import APIRouter, Depends
from queries.users import UserIn, UserRepository

router = APIRouter()


@router.post("/users")
def create_users(user: UserIn, repo: UserRepository = Depends()):
    return repo.create_user(user)
