import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for Plated with Swagger',
      version: '1.0.0',
      description:
        'This is a backend API application for a food ordering platform - Plated made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
  },
  apis: ['./src/swagger-docs/*.ts'],
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
