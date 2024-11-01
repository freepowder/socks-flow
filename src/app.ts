require('dotenv').config({ path:  `./.env` });
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// import * as middlewares from './middlewares';
import api from './api';

const app = express();
app.use(morgan('dev'));
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({
    maxAge: 15778476000, //SIX_MONTHS,
    includeSubDomains: true,
}));
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

// Event route
app.use("/api", api);

export default app;
