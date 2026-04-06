import dotenv from "dotenv";
import http from "http";
import DBConnect from "./dbConnect/MongoDb";
import app from "./app";

dotenv.config();

const startServer = async () => {
  try {
    await DBConnect();

    const server = http.createServer(app);
    const PORT = process.env.PORT || 8080;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server start failed", error);
  }
};

startServer();