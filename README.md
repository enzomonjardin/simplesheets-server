# 📄 simplesheets server

This is the server for the simplesheets app. It's running express & apollo-server, and written in typescript. It users mongodb, and Docker & docker-compose.

## Getting started

The env variables are configurable in the .env file.

To build the docker image & run the server & db:

```
docker-compose up --build
```

Or if you don't want to see the clutter from mongodb's logs:

```
docker-compose up --build -d && docker-compose logs -f api
```

### API

By default the graph api url is `http://localhost:4000/graph` .
apollo-server playground is available in development mode.
