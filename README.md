# Fullstack Youtube Clone app

LIVE DEMO: https://skyoutube-clone-frontend.herokuapp.com/

Fullstack youtube clone app build with Node.js (Express), Next JS, Mongo DB, Typescript and Tailwindcss. Supports uploading and streaming mp4 files in chunks of 1MB.

## Setup

By default client is setup to run on port 3000 and server to run on 4000. Server is connecting to local cluster of mongoDB. If you want to change these settings do so inside .env file in the server folder.

To run client and server on the local machine do the following:

1. Clone the repository

2. Create .env.local in the client-next folder and change the NEXT_PUBLIC_API_ENDPOINT to the address you will run your server at (by default its http://localhost:4000). If you want to change server settings and DB settings create .env file inside server directory from .env.example and change your settings there.

3. Run npm install inside server and client-next directories

4. If you connecting to local mongoDB on your machine remember to start it first

5. Run server inside server folder and client inside client-next folder with "npm run dev"

## Possible issues with heroku with solutions

### Backend

Since the backend of the live demo version is deployed to free version on heroku with domain herokuapp.com it is not allowed to set cookies therefore user credentials with jason web token will not be saved in the browser. More info: https://devcenter.heroku.com/articles/cookies-and-herokuapp-com
If you want cookies to be saved to the browser after you deploy your app to heroku you will need a custom domain

### Frontend

Adding NEXT_PUBLIC_API_ENDPOINT as your env variable in Heroku will result in env variable being undefined when moving from page to page on the client. It will only load when you refresh the page. This can be fixed by adding env property in next.config.js pointing to NEXT_PUBLIC_API_ENDPOINT like below. This is for future reference as this repo already has the fix implemented.

env: {
NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
},
