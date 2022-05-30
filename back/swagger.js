import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
      description: 'Test API with express',
    },
    basePath: '/',
  },
  apis: ['./src/routers/*.js', './db/models/model/*.js'],
};
const specs = swaggereJsdoc(options);
export { swaggerUi, specs };
