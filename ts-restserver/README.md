# ts-restserver

## Instalaciones necesarias
Para iniciar el proyecto se necesita instalar las siguientes dependencias:
1. ```npm install typescript``` Para instalar typescript en el proyecto se puede usar el comando ```npm install -g typescripte``` Para instalarlo de manera global
2. ```npm init -y``` Para crear el package.json
3. ```npx tsc --init``` Para crear el tsconfig.json
4. ```npm install tslint --save-dev``` Para configurar algunas reglas de linter
5. ```npm install typescript --save-dev``` Se instala typescript como dependencia de desarrollo

## Configuraciones necesarias
1. ```./node_modules/.bin/tslint --init``` Para crear el archivo tslint.json

## ¿Cómo ejecutar el código?
1. Para ejecutar o correr el proyecto se debe usar el comando ```tsc```, sin embargo en mi caso debo usar ```npx tsc```, esto lo que hará es crear la carpeta dist para ejecutar lo que se necesite.
2. Luego se debe ejecutar el comando ```node dist/app.js```, esto lo que hará es ejecutar el archivo app.js que se encuentra en la carpeta dist.