steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR NOT NULL,
            phone_number VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            username VARCHAR NOT NULL UNIQUE,
            hashed_password VARCHAR NOT NULL,
            address VARCHAR NOT NULL,
            state CHAR(2) NOT NULL,
            zip_code CHAR(5) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE pets (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR NOT NULL,
            age VARCHAR NOT NULL,
            breed VARCHAR,
            pet_type VARCHAR NOT NULL,
            description VARCHAR,
            adoption_status VARCHAR,
            day_in DATE NOT NULL,
            day_out DATE,
            owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            photo_url VARCHAR
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE pets;
        """,
    ],
]
