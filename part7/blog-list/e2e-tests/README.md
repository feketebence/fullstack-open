# End-2-end tests for the blog-list app

These are the [playwright](https://playwright.dev/) e2e tests of the blog list app.

## Requirements

Both the [backend](../backend/README.md) and the [frontend](../frontend/README.md) should be running locally.

- The backend should be started with: `npm run start:test`. This will use the test MongoDB collections.
- The frontend should be started normally with `npm run dev`. It should be accessible at [`http://localhost:5173`](http://localhost:5173/). The playwright tests will access the frontend at that address.

Install the dependencies with `npm install`

## Run the tests

Execute the e2e tests locally with:

```shell
npm run test
```

NOTE: Before the tests are executed, all of the existing users and blogs are cleared from the backend's e2e-test related database (`testBlogListApp`) using the `https://localhost:3001/api/testing/reset` endpoint, and dummy users and blogs are posted for testing.

NOTE: Unfortunately some tests are still flaky.
