import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRouter from './Routes/login.js';
import verifyTokenRouter from './Controllers/verifyToken.js';
import visitantesRouter from './Routes/visitantes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');

//routers
app.use('/auth', loginRouter);
app.use('/api', verifyTokenRouter);
app.use('/api', visitantesRouter); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://172.16.0.115:${PORT}`);
});
