### ETL-Engineering-Challenge

For this section, I used nodejs and developed terminal application. For this kind of application we need keep it as terminal application because it can connect directly to SQL tier.

Run npm install to run project
In the mysql: configure as described in .env file /in real world, we must not upload .env file to public. I uploaded env because its easy to share/

Then open command line or terminal and execute following commands to insert data to sql
node index.js etl/data1.csv etl/map1.csv
node index.js etl/data2.csv etl/map2.csv

In linux, if you have extra big data you can also execute followings to execute as background process

node index.js etl/data1.csv etl/map1.csv >execution.log 2&>1
node index.js etl/data2.csv etl/map2.csv >execution.log 2&>1

### Web-Service-Engineering-Challenge

For this section, I used nodejs, express.js, knex.js, mySQL and other libraries.

1. Writing access log by morgan
2. Restricting other domain requests by cors
3. CRUD operation with GET for read, POST for create, PUT for update and DELETE for delete.
4. Implemented dynamic search
5. For insertion, I implemented json validator
6. SQL builder by knex.js
7. Initiate server by express.js

To send request open customer.http file and you will find what kind of data should send to server

I used VSCODE with extension, you can find extension following link
https://marketplace.visualstudio.com/items?itemName=humao.rest-client

For start nodemon, if you have not,use node index.js
In the mysql: configure as described in .env file /in real world, we must not upload .env file to public. I uploaded env because its easy to share/ and import customers.sql

### js-engineering-challenge

For this section, I used reactJS, simple CSS.

1. Do not need to implement Redux because this application has simple states.
2. Used axios to connect API that I created on Web-Service-Engineering-Challenge.
3. All state related things covered in container folder
4. All functional components stored in component folder
5. This project requires only four components/Table, Input, Button, Spinner/. Do not need add google material or bootstrap or other component libraries which makes it bigger and bigger.

To use please start Web-Service-Engineering-Challenge

For start this project, use npm start

### UX-Design-Challenge

Used bootstrap on profile.html
Used UIKit on dashboard.html
