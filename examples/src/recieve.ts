import { v4 } from "uuid";
import { listen } from "./queue";

const id = v4();

listen("amqp://localhost", "time", (message, channel) => {
  if (!message) {
    console.error("No Message");
    return;
  }
  const accept = Math.random() < 0.8 ;
  if(accept){
    channel.ack(message);
    console.log( `${id} : accepted : ${message.content.toString()}`);
  }
  else{
    channel.reject(message,true);//reject and requeue the message
    console.log( `${id} : rejected : ${message.content.toString()}`);
  }
});
