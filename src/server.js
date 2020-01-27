const express = require('express');
const routes = require('./routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Imoveis Rest API',
            description: 'Estas APIs tem como objetivo realizar solicitações HTTP para o servidor.',
            contact: {
                name: 'Gustavo dos Santos Dias'

            },
            servers: ["http://localhost:3333"]
        }
    },
    apis: ["./src/routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


require('./database'); 
const app = express();

app.use(express.json());
app.use("/keycash-apis", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(routes);

app.listen(3333);