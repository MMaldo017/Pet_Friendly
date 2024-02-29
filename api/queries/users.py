from pydantic import BaseModel


class UserIn(BaseModel):
    name: str
    phone_number: str
    email: str
    username: str
    password: str
    address: str
    state: str
    zip_code: str
