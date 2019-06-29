import * as dotenv from "dotenv"
import * as express from 'express'
import * as socketio from "socket.io";
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as path from "path";
import * as mongoose from 'mongoose';
import * as bluebird from "bluebird";

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
    } else {
      callback('Not allowed by CORS');
    }
  },
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Content-Length',
    'X-Requested-With',
    'Accept',
  ],
  methods: [
    'GET',
    'PUT',
    'POST',
    'DELETE',
    'OPTIONS',
  ],
  optionsSuccessStatus: 200,
};

// Configure App
const app = express();
const port = process.env.API_PORT;
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("port", port || 8888);
let http = require("http").Server(app);
let io = require("socket.io")(http);

// API Routes
app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

// Socket Connections
io.on("connection", function(socket: any) {
  console.log("a user connected");
});

// Start Server
const server = http.listen(port, function() {
  console.log(`listening on ${port}`);
});