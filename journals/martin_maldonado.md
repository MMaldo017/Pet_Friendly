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
create get_all_pets fastapi endpoint and get_all and get_all Pydantic models. Also, PetIn and PetOut
Issues-
We had an issue with our UserOut model, where we werent getting back the id created by the database(resolved)
Getting a 401 error when creating a user but the user was still being creted in the database(resolved by a sytax error where the user was being created(users.py - router.post), it was adding the email instead of the username)
comments:
Team works really well and we solve issues pretty quickly

## Week3:

Purpose-
To finish our backend authrorization and start our front end components. Started and finished Pets.jsx and Dropdown.jsx
Issues-
We had an issue where we needed to update the sql to include a photo_url. It was pretty simple, we just needed to import AllUrl in order
to have basic url imputs into the sql database
Comments:
Team is starting to get into their own parts of the projects and it will be individual pushes instead of group pushes.
I want to have the /pets up by Tuesday with my UseEffect working. Also, we need to discuss how we are going to manage our global
state.

## Week4:

Purpose:
To finish our frontend components, global state, and completed test_get_user in test_users.py
Issues:
No issues this week:
Comments:
Team has been working great and going to finish up unit test early next week and we will be down with everthing that is required for the project
