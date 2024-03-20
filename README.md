# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

-   Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
-   Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

-   [ ] Wire-frame diagrams
-   [ ] API documentation
-   [ ] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
-   [ ] GitLab issue board is setup and in use (or project management tool of choice)
-   [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `api`, are services, that
you can start building off of.

Inside of `ghi` is a minimal React app that has an "under construction" page.
This app is written using the [Vite](https://vitejs.dev/) bundler. The example
code is also using [jsdoc](https://jsdoc.app/) to provide type hints for
JavaScript. You are not required to use JSDoc yourself, and you will be removing
these examples and providing your own code for `App.jsx`

Inside of `api` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `api` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Installing python dependencies locally

In order for VSCode's built in code completion and intelligence to
work correctly, it needs the dependencies from the requirements.txt file
installed. We do this inside docker, but not in the workspace.

So we need to create a virtual environment and pip install the requirements.

From inside the `api` folder:

```bash
python -m venv .venv
```

Then activate the virtual environment

```bash
source .venv/bin/activate
```

And finally install the dependencies

```bash
pip install -r requirements.txt
```

Then make sure the venv is selected in VSCode by checking the lower right of the
VSCode status bar

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

-   `docker-compose.yaml`: there isn't much in here, just a
    **really** simple UI and FastAPI service. Add services
    (like a database) to this file as you did with previous
    projects in module #2.
-   `.gitlab-ci.yml`: This is your "ci/cd" file where you will
    configure automated unit tests, code quality checks, and
    the building and deployment of your production system.
    Currently, all it does is deploy an "under construction"
    page to your production UI on GitLab and a sample backend
    to CapRover. We will learn much more about this file.
-   `.gitignore`: This is a file that prevents unwanted files
    from getting added to your repository, files like
    `pyc` files, `__pycache__`, etc. We've set it up so that
    it has a good default configuration for Python projects.
-   `.env.sample`: This file is a template to copy when
    creating environment variables for your team. Create a
    copy called `.env` and put your own passwords in here
    without fear of it being committed to git (see `.env`
    listed in `.gitignore`). You can also put team related
    environment variables in here, things like api and signing
    keys that shouldn't be committed; these should be
    duplicated in your deployed environments.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

-   make sure this project is in a group. If it isn't, stop
    now and move it to a GitLab group
-   remove the fork relationship: In GitLab go to:

    Settings -> General -> Advanced -> Remove fork relationship

-   add these GitLab CI/CD variables:
    -   PUBLIC_URL : this is your gitlab pages URL
    -   VITE_APP_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Initialize CapRover

1. Attain IP address and domain from an instructor
1. Follow the steps in the CD Cookbook in Learn.

### Update GitLab CI/CD variables

Copy the service URL for your CapRover service and then paste
that into the value for the REACT_APP_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.

### API Documentation

#### Users

| Action                                  | Method | URL                                       |
| --------------------------------------- | ------ | ----------------------------------------- |
| [Get all users](#get-all-users)         | GET    | http://localhost:8000/api/users           |
| [Create user](#create-a-user)           | POST   | http://localhost:8000/api/users           |
| [Get all usernames](#get-all-usernames) | GET    | http://localhost:8000/api/usernames       |
| [Get user pets](#get-user-pets)         | GET    | http://localhost:8000/{user_id}/pets      |
| [Get user](#get-user)                   | GET    | http://localhost:8000/api/users/{user_id} |
| [Update user](#update-a-user)           | PUT    | http://localhost:8000/api/users/{user_id} |
| [Delete user](#delete-a-user)           | DELETE | http://localhost:8000/api/users/{user_id} |

#### Get all users

##### Response:

```
[
  {
    "id": 0,
    "name": "string",
    "phone_number": "string",
    "email": "string",
    "address": "string",
    "state": "string",
    "zip_code": "string"
  }
]
```

#### Create a user

##### Request body:

```
{
  "name": "string",
  "phone_number": "string",
  "email": "string",
  "username": "string",
  "password": "string",
  "address": "string",
  "state": "string",
  "zip_code": "string"
}
```

##### Response:

```
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "name": "string",
    "phone_number": "string",
    "email": "string",
    "username": "string",
    "address": "string",
    "state": "string",
    "zip_code": "string"
  }
}
```

#### Get all usernames

##### Response:

```
[
  {
    "username": "string"
  }
]
```

#### Get user pets

##### Response:

```
[
  {
    "id": 0,
    "name": "string",
    "age": "string",
    "breed": "string",
    "pet_type": "string",
    "description": "string",
    "adoption_status": "string",
    "day_in": "2024-03-20",
    "day_out": "2024-03-20",
    "owner_id": 0,
    "photo_url": "string"
  }
]
```

#### Get user

##### Response:

```
{
  "id": 0,
  "name": "string",
  "phone_number": "string",
  "email": "string",
  "address": "string",
  "state": "string",
  "zip_code": "string"
}

```

#### Update a user

##### Request body:

```
{
  "name": "string",
  "phone_number": "string",
  "email": "string",
  "address": "string",
  "state": "string",
  "zip_code": "string"
}
```

##### Response:

```
{
  "id": 0,
  "name": "string",
  "phone_number": "string",
  "email": "string",
  "address": "string",
  "state": "string",
  "zip_code": "string"
}
```

#### Delete a user

##### Response:

```
true
```

---

#### Pets

| Action                        | Method | URL                            |
| ----------------------------- | ------ | ------------------------------ |
| [Get all pets](#get-all-pets) | GET    | http://localhost/api/pets      |
| [Create a pet](#create-a-pet) | POST   | http://localhost/api/pets      |
| [Update a pet](#update-a-pet) | PUT    | http://localhost/pets/{pet_id} |

#### Get all pets

##### Response:

```
[
  {
    "id": 1,
    "name": "string",
    "age": "string",
    "breed": "string",
    "pet_type": "string",
    "description": null,
    "adoption_status": null,
    "day_in": "2024-03-21",
    "day_out": "None",
    "owner_id": 0,
    "photo_url": null
  }
]
```

#### Create a pet

##### Request body:

```
{
  "name": "string",
  "age": "string",
  "breed": "string",
  "pet_type": "string",
  "description": "string",
  "adoption_status": "string",
  "day_in": "string",
  "day_out": "string",
  "owner_id": 0,
  "photo_url": "string"
}

```

##### Response:

```
{
  "id": 1,
  "name": "string",
  "age": "string",
  "breed": "string",
  "pet_type": "string",
  "description": "string",
  "adoption_status": "string",
  "day_in": "string",
  "day_out": "string",
  "owner_id": 0,
  "photo_url": "string"
}
```

#### Update a pet

##### Request:

```
{
  "name": "string",
  "age": "string",
  "breed": "string",
  "pet_type": "string",
  "description": "string",
  "adoption_status": "string",
  "day_in": "string",
  "day_out": "string",
  "owner_id": 0,
  "photo_url": "string"
}
```

##### Response:

```

  "id": 0,
  "name": "string",
  "age": "string",
  "breed": "string",
  "pet_type": "string",
  "description": "string",
  "adoption_status": "string",
  "day_in": "string",
  "day_out": "string",
  "owner_id": 0,
  "photo_url": "string"
}
```
