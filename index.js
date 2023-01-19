import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import FileUpload from "express-fileupload";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import CourseRoute from "./routes/CourseRoute.js";
import VideoRoute from "./routes/VideoRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import Jobseeker from "./routes/Jobseeker.js";
import KandidatRoute from "./routes/KandidatRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: "auto" },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

app.use(UserRoute);
app.use(CourseRoute);
app.use(VideoRoute);
app.use(AuthRoute);
app.use(Jobseeker);
app.use(KandidatRoute);

// (async () => {
//   await db.sync();
// })();
// store.sync();

app.listen(process.env.PORT, () => {
  console.log("server up and run...");
});
