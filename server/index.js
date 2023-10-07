import express from "express";
import cors from "cors";
import { Parser } from "./youtube/index.js";

const PORT = 3333;
const server = express();

server.use(cors());
server.use(express.json());

const parser = new Parser();

server.post("/get/", async (req, res) => {
  const response = await parser.getData(req.body.id);

  res.send({
    data: response,
  });
});

server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
