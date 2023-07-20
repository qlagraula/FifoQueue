import { zodiosApp } from "@zodios/express";
import { api } from "api";
import winston from "winston";
import expressWinston from "express-winston";
import cors from "cors";

import router from "./router";
import { stopQueue } from "./controller/queue";

const app = zodiosApp(api);

app.use(cors());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.cli()
    ),
    expressFormat: true,
    colorize: true,
  })
);

app.use(router);

const server = app.listen(5000, () => console.log("Started on port 5000"));

server.on("close", () => {
  stopQueue();
});
