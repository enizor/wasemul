/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import errorHandler from 'errorhandler';
import morgan from 'morgan';

const app = express();
const port = 3001;

// Parse application/json
app.use(bodyParser.json());

dotenv.load();

sequelize.sync();

if (process.env.NODE_ENV === 'development') {
  // Show better errors in development
  app.use(errorHandler());

  // Log http accesses
  app.use(morgan('dev'));

}

app.get('/', (_, res) => {
  res.send('Hello world!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
