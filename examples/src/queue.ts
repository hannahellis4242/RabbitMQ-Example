import { Channel, ConsumeMessage, Replies, connect } from "amqplib";

export const push = (url: string, queue: string, message: string) =>
  connect(url)
    .then((connection) => connection.createChannel())
    .then((channel) =>
      channel
        .assertQueue(queue)
        .then(() => channel.sendToQueue(queue, Buffer.from(message)))
        .then((value) =>
          value ? Promise.resolve() : Promise.reject(new Error("Queue is full"))
        )
        .finally(() => channel.close())
    );

export const listen = async (
  url: string,
  queue: string,
  fn: (msg: ConsumeMessage | null, channel: Channel) => void
): Promise<Replies.Consume> =>
  connect(url)
    .then((connection) => connection.createChannel())
    .then((channel) =>
      channel
        .assertQueue(queue)
        .then(() => channel.consume(queue, (msg) => fn(msg, channel)))
    );
