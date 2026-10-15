# ApiBETest

A TypeScript and Jest test suite for the [Restful Booker API](https://restful-booker.herokuapp.com). The tests cover booking retrieval, creation, and deletion.

## Requirements

- Node.js and npm

## Setup

```bash
npm install
```

## Run tests

Run the full test suite:

```bash
npm test
```

Run one test file, for example:

```bash
npm test -- --runInBand test/integrationTest/deleteBookerApiTest.test.ts
```

## Test organization

- `test/unitTest/` contains unit tests that mock Axios and do not make API requests.
- `test/integrationTest/` contains tests that call the live Restful Booker API. These require network access; tests that create bookings can modify data on the service.
- `test/utils/auth.ts` requests an authentication token used by booking operations that require authorization.

Jest is configured with `ts-jest` and discovers TypeScript test files ending in `.test.ts` under `test/`.
