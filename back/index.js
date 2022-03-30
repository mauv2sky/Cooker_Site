import 'dotenv/config';
import app from './src/app';

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () =>
  console.log(`server is working: http://localhost:${PORT}`)
);
