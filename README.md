ETL-Engineering-Challenge

Run npm install to run project
In the mysql: configure as described in .env file

Then open command line or terminal and execute following commands to insert data to sql
node index.js etl/data1.csv etl/map1.csv
node index.js etl/data2.csv etl/map2.csv

In linux, if you have extra big data you can also execute followings to execute as background process

node index.js etl/data1.csv etl/map1.csv >execution.log 2&>1
node index.js etl/data2.csv etl/map2.csv >execution.log 2&>1

Web-Service-Engineering-Challenge

To send request open customer.http file and you will find what kind of data should send to server

I used VSCODE with extension, you can find extension following link
https://marketplace.visualstudio.com/items?itemName=humao.rest-client
