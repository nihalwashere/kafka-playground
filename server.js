const { Kafka, logLevel } = require("kafkajs");
const { WinstonLogCreator } = require("./logger");
const ip = require("ip");

const host = process.env.HOST_IP || ip.address();

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  logCreator: WinstonLogCreator,
  clientId: "kafka-playground",
  brokers: [`${host}:9092`]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "counter-group" });

let count = 0;

const incCounter = () => count++;

const generateMessage = count => ({
  key: `count-${count}`,
  value: incCounter().toString()
});

const sendMessage = async topic => {
  return await producer.send({
    topic,
    messages: [generateMessage(count)]
  });
};

const produce = async topic => {
  // Producing
  await producer.connect();
  setInterval(async () => {
    const result = await sendMessage(topic);
    console.log("producer : ", result);
  }, 3000);
};

const consume = async topic => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("consumer : ", {
        topic,
        partition,
        offset: message.offset,
        value: JSON.parse(message.value)
      });
    }
  });
};

const run = async () => {
  const topic = "counter-topic";
  await produce(topic);
  await consume(topic);
};

run().catch(err => console.error(err));
