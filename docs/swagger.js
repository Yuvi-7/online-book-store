const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Online Bookstore API',
        version: '1.0.0',
        description: 'Clean API Documentation',
    },
    servers: [
        {
            url: 'http://localhost:5001',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
};

const swaggerOptions = {
    definition: swaggerDefinition,
    apis: ['./docs/*.js']
};

module.exports = swaggerOptions;