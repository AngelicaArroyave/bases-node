# restserver
Aplicación básica de Web Server y Rest Server del curso *Legacy - Node de cero a experto en Udemy*

## Instalaciones necesarias
Para iniciar el proyecto se necesita instalar las siguientes dependencias:
1. ```npm init -y``` Para crear el package.json
2. ```npm install nodemon``` Es una herramienta que ayuda a desarrollar aplicaciones basadas en Node.js reiniciando automáticamente la aplicación cuando se detectan cambios en los archivos
3. ```npm install express``` Es un framework que permite el desarrolo de aplicaciones web y API's
4. ```npm install dotenv``` Es un módulo de dependencia cero que carga variables de entorno de un archivo .env en process.env
5. ```npm install cors``` Permite proteger un servidor
6. ```npm install mongoose``` Permite consultar y escribir en la base de datos de MongoDB
7. ```npm install bcryptjs``` Permite encriptar contraseñas
8. ```npm install express-validator``` Permite validar peticiones de express
9. ```npm install jsonwebtoken``` Generación e implementación de JWT (Json Web Token)
10. ```npm install google-auth-library --save``` Librería necesaria para la verificación de cuenta con Google
11. ```npm install express-fileupload``` Permite subir archivos
12. ```npm install uuid``` Permite generar identificadores únicos

## ¿Cómo ejecutar el código?
Para ejecutar o correr el proyecto se debe usar el comando ```nodemon app```, sin embargo en mi caso debo usar ```npx nodemon app```

## Documentación
1. [Nodemon](https://www.npmjs.com/package/nodemon)
2. [npm - Express](https://www.npmjs.com/package/express)
3. [Express](https://expressjs.com/)
4. [Dotenv](https://www.npmjs.com/package/dotenv/v/14.0.0)
5. [CORS](https://www.npmjs.com/package/cors)
6. [Mongoose](https://mongoosejs.com/docs/)
7. [BcryptJS](https://www.npmjs.com/package/bcryptjs)
8. [Express Validator](https://express-validator.github.io/docs)
9. [JWT - Json Web Token](https://www.npmjs.com/package/jsonwebtoken)
10. [Google Sign In - Google Identity](https://developers.google.com/identity/gsi/web/guides/overview?hl=es-419)
11. [File Upload - Express](https://www.npmjs.com/package/express-fileupload)
12. [UUID - Express](https://www.npmjs.com/package/uuid)

### **Nota:**
1. Recordar que al descargar el código se debe ejecutar el comando ```npm install``` para la construcción de los diferentes módulos
2. Se implementa el servicio de Google Sing In para autenticación del usuario