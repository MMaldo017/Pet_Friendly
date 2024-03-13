from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import List, Union, Optional
from pydantic import BaseModel
from queries.users import (
    Error,
    UserIn,
    UserOut,
    UserInfoIn,
    UserInfoOut,
    UserPetOut,
    UserRepository,
    DuplicateAccountError,
    UsernamesOut,
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


# @router.get("/api/protected", response_model=bool)
# async def get_pro_token(
#     request: Request,
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     return True
# for review on making endpoint protected


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data),
):
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/users", response_model=AccountToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/api/users", response_model=Union[List[UserInfoOut], Error])
def get_all(
    repo: UserRepository = Depends(),
):
    return repo.get_all()


@router.get("/api/usernames", response_model=Union[List[UsernamesOut], Error])
def get_all_usernames(
    repo: UserRepository = Depends(),
):
    return repo.get_all_user_detail()


@router.get("/api/users/{user_id}/pets", response_model=List[UserPetOut])
def get_user_pets(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserPetOut:
    pets = repo.get_user_pets(user_id)
    if pets is None:
        response.status_code = 404
    return pets


@router.get("/api/users/{user_id}", response_model=Optional[UserInfoOut])
def get_user(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserInfoOut:
    user = repo.get_user(user_id)
    if user is None:
        response.status_code = 404
    return user


@router.put("/api/users/{user_id}", response_model=Union[UserInfoOut, Error])
def update_user(
    user_id: int,
    user: UserInfoIn,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, UserInfoOut]:
    return repo.update(user_id, user)


@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    success = repo.delete(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return success
