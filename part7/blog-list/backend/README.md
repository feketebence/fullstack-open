# Blog list app backend

This is the backend of the blog-list app. It uses MongoDB to store users and their blogs.

## Requirements

The backend requires NodeJS v24.

The backend uses a free MongoDB instance running on `cloud.mongodb.com`. Check the [part-3c/MongoDB](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db) section of the tutorial on how to use a database instance hosted on MongoDB Atlas.

Install the dependencies with `npm install`

Create a `.env` file with the following:

```env
PORT=3001
MONGODB_URI=<mongo-connection-string-for-production-environment>
TEST_MONGODB_URI=<mongo-connection-string-for-e2e-test-environment>
SECRET=<secret-for-signing-JWT-tokens>
```

Connection string example:

```
mongodb+srv://<your-mongo-db-username>:<your-mongo-db-password>@<base-url-of-hosted-mongo-instance>/blogListApp?retryWrites=true&w=majority&appName=fullstack-open
```

## Start the app

Run `npm run dev` to start the backend locally.

It will be available at [`http://localhost:3001/`](http://localhost:3001/).

For sanity check, use the http://localhost:3001/api/blogs endpoint. You should see some initial blogs from the backend.
