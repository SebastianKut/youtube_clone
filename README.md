# Fullstack Youtube Clone app

Fullstack youtube clone app build with Node.js (Express), Next JS, Mongo DB, Typescript and Tailwindcss. Supports uploading and streaming mp4 files in chunks of 1MB.

## Setup

By default client is setup to run on port 3000 and server to run on 4000. Server is connecting to local cluster of mongoDB. If you want to change these settings do so inside .env file in the server folder.

To run client and server on the local machine do the following:

1. Clone the repository

2. Create .env.local in the client-next folder and change the NEXT_PUBLIC_API_ENDPOINT to the address you will run your server at (by default its http://localhost:4000). If you want to change server settings and DB settings create .env file inside server directory from .env.example and change your settings there.

3. Run npm install inside server and client-next directories

4. If you connecting to local mongoDB on your machine remember to start it first

5. Run server inside server folder and client inside client-next folder with "npm run dev"

TO BE DELETED

- add small dummy videos to the page
- deploy server to heroku
- deploy next client to vercel
- work on my cv and and both projects, update portfolio website with projects and cv and update my linkedin
