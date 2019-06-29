import * as dotenv from "dotenv"
import * as express from 'express'
import * as socketio from "socket.io";
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as mongoose from 'mongoose';
import * as bluebird from "bluebird";
import * as routes from "./routes";
// Set env values
dotenv.config();

// Connect to MongoDB
(<any>mongoose).Promise = bluebird;
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`, {useNewUrlParser: true});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.DB_NAME}`);
});

// Configure CORS
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (origin == undefined || process.env.CORS_WHITELIST && process.env.CORS_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else { callback('Not allowed by CORS')}
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
};

// Configure App
const app = express();
const port = process.env.API_PORT;
app.use(helmet());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("port", port || 8888);
app.use('/', routes);
let http = require("http").Server(app);
let io = require("socket.io")(http);
require('./socket')(io);

// Start Server
http.listen(port, function() {
  console.log(`listening on ${port}`);
});

export = app;