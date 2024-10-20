# Catcare back-end

## Docker Compose for running the Postgres Database

First, be sure to have set the `.env` file correctly, following the `.env.example` format.

Then run the following:

```sh
docker compose up -d db pgadmin4
```

This will get the postgres database to be up and running as well as the pgadmin frontend.

> If you kept the ports defined in `.env.example`, you can access the pgadmin4 frontend at [http//localhost:5433](http://localhost:5433)

Then, for running prisma's migrations, run the following:

```sh
docker compose up -d migrations
```

> Remember: `sudo` may or may not be needed when running those commands.

## Running the Backend Project

To run the backend project, follow these steps:

**Install Node.js:** \
Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

**Install Dependencies:** \
Install project dependencies using npm. You need to be in the path `.../catcare_back`:

```sh
npm install
```

**Run the Server:** \
Start the aplication. You need to be in the path `.../catcare_back/src`:

```sh
node app.js
```