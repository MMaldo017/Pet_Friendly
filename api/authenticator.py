import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserRepository, UserOutWithPassword


class ExampleAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: UserRepository,
    ):

        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: UserRepository = Depends(),
    ):

        return accounts

    def get_hashed_password(self, account: UserOutWithPassword):

        print("DICT", account)
        return account.__getitem__("hashed_password")


authenticator = ExampleAuthenticator(os.environ["SIGNING_KEY"])
