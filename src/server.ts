import * as dotenv from "dotenv"
import * as path from "path";
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as mongoose from 'mongoose';
import * as bluebird from "bluebird";
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';

// Set env values
dotenv.config();

// Connect to MongoDB
(<any>mongoose).Promise = bluebird;
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`, {useCreateIndex: true, useNewUrlParser: true});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.DB_NAME}`);
});

// Configure CORS
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (process.env.CORS_WHITELIST && process.env.CORS_WHITELIST.indexOf(origin) !== -1) callback(null, true);
    else callback('Not allowed by CORS');
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], optionsSuccessStatus: 200,
};

// Configure App
const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let http = require("http").Server(app);
require('./sockets')(require("socket.io")(http));

// Start Server
const port = process.env.API_PORT;
http.listen(port, ()=> {
  console.log(`listening on ${port}`);
});

// Serve Socket test page
app.get("/socket", (req: any, res: any) => {
    res.sendFile(path.resolve("./src/client/index.html"));
  });

// Start Swagger Docs
RegisterRoutes(app);
try {
    const swaggerDocument = require('../swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
    console.log('Unable to load swagger.json', err);
}

export = app;
