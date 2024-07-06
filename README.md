[![Adam Rao](https://circleci.com/gh/AdamRa0/posts.svg?style=svg)](https://circleci.com/docs/pipelines/) [![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

# Posts
Twitter + Reddit Clone

## Table Of Contents
- [Requirements](#requirements)
- [Instructions](#instructions)
- [Technologies](#technologies-used)
- [Acknowledgments](#acknowledgments)

## Requirements
- Docker

## Instructions
To run the project locally, first make the following changes.

- Inside the server directory, create a folder called instance.
- Inside the instance folder, create a file called config-docker.py
- Set create and assign values to the following environmental variables:
  - JWT_SECRET_KEY
  - JWT_COOKIE_SECURE
  - SQLALCHEMY_DATABASE_URI
  - JWT_TOKEN_LOCATION
  - JWT_ACCESS_TOKEN_EXPIRES
  - MAX_CONTENT_LENGTH
  - UPLOAD_FOLDER

- Inside the client folder, change the vite.config.ts file from
```typescript
export default defineConfig({
  // Other configuration code
  ...,
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/api",
        // Other configuration code
        ...
      },
      '/listen': {
        target: 'http://localhost:5000',
        // Other configuration code
        ...
      },
    }
  },
  ...
})
```
to
```typescript
export default defineConfig({
  // Other configuration code
  ...,
  server: {
    proxy: {
      "/api": {
        target: "http://server:5000/api",
        // Other configuration code
        ...
      },
      '/listen': {
        target: 'http://server:5000',
        // Other configuration code
        ...
      },
    }
  },
  ...
})
```
- Then run the following command
```bash
docker compose up -f compose.dev.yaml --build
```

## Technologies Used
- Python 3.10
- Flask
- PostgreSQL
- Pydantic
- PyTest
- ReactJS

## Acknowledgments
- [Banner Image by Rasmus Smedstrup Mortensen on Unsplash](https://unsplash.com/photos/_ZtPsxAomeI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
- [Server-side SSE code](https://maxhalford.github.io/blog/flask-sse-no-deps/)