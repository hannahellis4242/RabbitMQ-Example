import { v4 } from "uuid";
import { push } from "./queue";
/*new Date().toISOString()*/
setInterval(
  () =>
    Promise.resolve(`${Date.now()}-${v4()}`)
      .then((message) => push("amqp://localhost", "time", message))
      .catch(console.error),
  1000
);
