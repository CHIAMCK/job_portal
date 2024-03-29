import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes'
import { errorConverterMiddleware } from './middlewares/errorConverterMiddleware'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerOptions';

dotenv.config();
const app = express();
const PORT = 3000;

const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(specs, { explorer: true }));

app.use('/v1', routes);
app.use(errorConverterMiddleware);

async function connectToDatabase() {
    const dbUrl = process.env.DB_CONNECTION_STRING as string;
    try {
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
        console.log('Couldnot connect to MongoDB')
    }
}
  
// Call the function to connect to the database
connectToDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
