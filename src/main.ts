
import { logger } from "@infra/logger";
import HttpServer from "./http-server";
import mongoose, { ConnectOptions } from "mongoose";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

async function main() {
  try {
    const PORT = process.env.PORT || 8080;
    const httpServer = new HttpServer();
    const port = Number(PORT);
    // sinais do sistema operacional que o programa monitorará para saber quando dever parar
    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

    // Monitorando os sinais do sistema operacional
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          await mongoose.disconnect();
          httpServer.stop();
          logger.info("Existing app with success");
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      })
    );

    //Connect to database
    const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    try {
      await mongoose.connect(process.env.DATABASE_URI ? process.env.DATABASE_URI : "", clientOptions);
      console.log("Connected successfully to database");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(ExitStatus.Failure);
    }

    const app = await httpServer.createApp(port);

    app.listen(port, () => logger.info(`Running on port ${port}`));
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
}

main();
  