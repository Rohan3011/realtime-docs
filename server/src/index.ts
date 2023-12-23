import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import router from "@/routes";
import log from "@/utils/logger";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

export const app = express();
const port = process.env.PORT;

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// serve client
app.use(express.static(path.join(__dirname, "../../client/dist")));

// routes definition
app.use("/api", router);

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  log.info(`User connected with ID: ${socket.id}`);

  socket.on("ping", () => {
    log.info("ping");
    const dummyData = {
      string: "this is a test string",
      integer: 42,
      array: [1, 2, 3, "test", null],
      float: 3.14159,
      object: {
        "first-child": true,
        "second-child": false,
        "last-child": null,
      },
      string_number: "1234",
      date: "2023-12-19T14:15:09.606Z",
    };
    socket.emit("pong", dummyData);
  });
});

httpServer.listen(port, () => {
  log.info(`Server is running at http://localhost:${port}`);
  // connectToDB();
});
