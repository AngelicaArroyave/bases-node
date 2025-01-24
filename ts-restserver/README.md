# ts-restserver

## Instalaciones necesarias
Para iniciar el proyecto se necesita instalar las siguientes dependencias:
1. ```npm install typescript``` Para instalar typescript en el proyecto se puede usar el comando ```npm install -g typescripte``` Para instalarlo de manera global
2. ```npm init -y``` Para crear el package.json
3. ```npx tsc --init``` Para crear el tsconfig.json
4. ```npm install tslint --save-dev``` Para configurar algunas reglas de linter
5. ```npm install typescript --save-dev``` Se instala typescript como dependencia de desarrollo
6. ```npm install express``` Es un framework que permite el desarrolo de aplicaciones web y API's
7. ```npm install dotenv``` Es un módulo de dependencia cero que carga variables de entorno de un archivo .env en process.env
8. ```npm install cors``` Permite proteger un servidor
9. ```npm i --save-dev @types/express``` Habilita todo el tipado de express en TypeScript
10. ```npm install nodemon``` Es una herramienta que ayuda a desarrollar aplicaciones basadas en Node.js reiniciando automáticamente la aplicación cuando se detectan cambios en los archivos
11. ```npm i --save-dev @types/cors``` Habilita todo el tipado de cors en TypeScript
12. ```npm install --save sequelize``` Permite la creación de modelos, consultas y operaciones CRUD sobre la base de datos
13. ```npm install --save mysql2``` Es el controlador de la base de datos

## Configuraciones necesarias
1. ```./node_modules/.bin/tslint --init``` Para crear el archivo tslint.json

## ¿Cómo ejecutar el código?
1. Para ejecutar o correr el proyecto se debe usar el comando ```tsc```, sin embargo en mi caso debo usar ```npx tsc```, esto lo que hará es crear la carpeta dist para ejecutar lo que se necesite. para que se identifique cuándo se realizan cambios en el código se puede dejar ejecutando el comando ```npx tsc --watch```.
2. Luego se debe ejecutar el comando ```node dist/app.js```, esto lo que hará es ejecutar el archivo app.js que se encuentra en la carpeta dist.
3. Para que el proyecto se quede ejecutando en modo de desarrollo se debe usar el comando ```npx nodemon dist/app.js```.

## Documentación
1. [npm - Express](https://www.npmjs.com/package/express)
2. [Express](https://expressjs.com/)
3. [Dotenv](https://www.npmjs.com/package/dotenv/v/14.0.0)
4. [CORS](https://www.npmjs.com/package/cors)
5. [Nodemon](https://www.npmjs.com/package/nodemon)
6. [Sequelize](https://sequelize.org/docs/v6/getting-started/)