## Week1:

Purpose-
Main part of our planning phase in which we set out to create the layout of our fastapi endpoints and wireframes.
Issues-
In our feedback we were told that we needed to make sure we understood who our client was as well as make sure
that we had a better plan for authentication on our website(resolved)
Comments:
We made some changes to our endpoints and even added some missing endpoints to our wireframe. Also, we built
out our database tables to include just users and pets.

## Week2:

Purpose-
create an endpoint and start our backend authorization
Issues-
We had an issue with our UserOut model, where we werent getting back the id created by the database(resolved)
Getting a 401 error when creating a user but the user was still being creted in the database(resolved by a sytax error where the user was being created(users.py - router.post), it was adding the email instead of the username)
comments:
Team works really well and we solve issues pretty quickly
