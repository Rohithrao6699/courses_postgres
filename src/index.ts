import express from "express";
import { config } from "./config/config";
import { userRouter } from "./routes/userRoutes";
import { errorMiddleWare } from "./middlewares/errorMiddleware";
import { courseRouter } from "./routes/courseRoutes";

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);

app.use(errorMiddleWare);
function main() {
  app.listen(config.PORT, function () {
    console.log(`listening on port ${config.PORT}`);
  });
}

main();
