import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'Documentation for a simple Express API',
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/routes/**/*.ts'], 
};

export default swaggerOptions;