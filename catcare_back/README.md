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
