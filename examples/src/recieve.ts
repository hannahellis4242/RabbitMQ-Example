import { listen } from "./queue";

listen("amqp://localhost", "time", (message, channel) => {
  if (!message) {
    console.error("No Message");
    return;
  }
  console.log(message.content.toString());
  channel.ack(message);
});
