# EXPRESS + DB

![scheme of project back](./schema.png)

```
mkdir users
cd users
touch app.js
npm init -y
npm install express
npm install nodemon --save-dev
npm i dotenv
npm i mysql2
```

_package.json_

```js
"main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }, ...
```

```
mysql> mysql -u <username> -p
mysql> create database shop;
mysql> use shop;
mysql> create table users (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, created_at DATE NOT NULL, updated_at DATE NOT NULL, is_admin BOOLEAN NOT NULL);
```

```
git init
```

create .env and .gitignore <br />
_.gitignore_

```js
node_modules.env;
```

_.env_

```
PORT = REPLACE_YOUR_SERVER_PORT
DB_HOST = REPLACE_YOUR_HOST
DB_PORT = REPLACE_YOUR_DB_PORT
DB_USER = REPLACE_YOUR_DB_USER
DB_PASSWORD = REPLACE_YOUR_DB_PASSWORD
DB_NAME = REPLACE_YOUR_DB_NAME
```

```
npm install @faker-js/faker --save-dev
```

# REACT

![scheme of project front](./schema-front.png)

```
shop-react-express$ npm create vite@latest client -- --template react
shop-react-express/client$ npm install
```

_shop-react-express/.gitignore_

```
./client/node_modules
node_modules
.env
```

```
shop-react-express/client$ npm i bootstrap
shop-react-express/client$ npm i reactstrap react react-dom
shop-react-express/client$ npm i react-icons
```

https://reactstrap.github.io/?path=/story/home-installation--page
https://react-icons.github.io/react-icons/

```
shop-react-express/client$ npm i react-router-dom
```
