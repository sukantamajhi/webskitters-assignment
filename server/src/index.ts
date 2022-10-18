/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import config from "./config";
import connectToDb from "./database/index";
import routes from "./routes/routes";

dotenv.config();

/**
 * App Variables
 */

const app = express();
const whitelist = ["http://localhost:3000", "http://localhost:3001"];

app.use(helmet());
app.use(cors({ origin: whitelist, credentials: true }));
app.use(express.json());
app.use("/api", routes);

// Connection to mongoDB
connectToDb();

const server = app.listen(config.port, () => {
  console.log(`
   ################################################
   🛡️  Server listening on port: http://localhost:${config.port} 🛡️
   ################################################
 `);
  //   console.log(
  //     `
  //     ################################################
  // 😍  Swagger is available on http://localhost:${config.port}/api-docs 😍
  //     #################################################`
  //   );
});

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
