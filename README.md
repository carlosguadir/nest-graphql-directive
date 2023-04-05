## Description

Small example GraphQL directives in NestJS

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```



## Local validation

Navigate to 

(http://localhost:3000/api)[http://localhost:3000/api]

```graphql

query sweetData {
  sweetData( where: { uuid: "Hola" }) {
    id firstName
  }
}

mutation createSweetData {
  createSweetData {
    id lastName
  }
}

```