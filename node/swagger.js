const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Yummy Catering API',
      version: '1.0.0',
      description: 'API documentation for Yummy Catering project',
      contact: {
        name: 'Ester',
        email: 's0504139282@gmail.com'
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local server'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
