import { push } from "./queue";

setInterval(
  () =>
    push("amqp://localhost", "time", new Date().toISOString()).catch(
      console.error
    ),
  5000
);
