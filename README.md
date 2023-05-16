D&D-5e-condition-tracker

Project Description
What your application does

This application allows for straight forward tracking of the most commonly changing conditions for characters in D&D combat, ie Hit Points and Conditions. Rules around conditions can be complicated and are very specifically worded. To solve this impediment to an immersive D&D session, the project uses the D&D 5e api (https://www.dnd5eapi.co/api) to fetch and display the rules asociated with each condition, allowing for smoother running game sessions where the user does not need to constantly be referencing the Player's Manual.

Why you used the technologies you used.
Node.js
Express.js
EJS (ServerSideRendered templating)
PostresQL
Passport User Authentication

Some of the challenges you faced and features you hope to implement in the future.
In the future, I am looking to either rebuild the front end of this project using a framework like React. The main reason is Server Side Rendering like EJS makes Ajax calls very challenging, and refreshing / redirecting the page on simple actions makes too many unnecessary api-calls and database queries for an efficient scalable app.

How To Install:

1. After downloading or cloning the repository, install dependencies

npm i

2. Create PSQL database and test_db

(If psql cli is not installed, see https://www.postgresql.org/download/)

createdb roller
createdb roller_test



3. create db tables:

psql roller > roller-schema.sql
psql roller_test > roller-schema.sql

4. Create .env file with SESSION_SECRET variable
    - ex: SESSION_SECRET=secret123


5. start application (development):
npm run devStart


