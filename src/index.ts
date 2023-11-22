import dotenv from 'dotenv';
dotenv.config();

import { app } from './server';

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});
