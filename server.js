const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRout = require('./routes/auth.Route');
const businessRoute = require('./routes/business.Route');
const noteRoute = require('./routes/notesRoute');
const orderRoute = require('./routes/order.Route');
const userRoute = require('./routes/userRoute');
const serviceRouter = require('./routes/serviceRoute');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = 3001;

const mongoURI = 'mongodb://localhost:27017/YummyCatering';
mongoose.set('strictQuery', false);
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

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

app.use('/service',serviceRouter);
app.use('/auth', authRout);
app.use('/business', businessRoute);
app.use('/notes', noteRoute);
app.use('/order', orderRoute);
app.use('/users',userRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRout);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
