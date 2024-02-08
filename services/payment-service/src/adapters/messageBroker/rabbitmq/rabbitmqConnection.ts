import amqp, { Channel, Connection  } from 'amqplib'
// import { default queue name } from '../../../queues';
// import { consumeDataFromQueue } from './commonMessageReceiver';
// import dependencies from '../../../utils/config/dependencies';

let channel: Channel;
let connection: Connection;


const connectRabbitMq = async () => {
    try {
        connection = await amqp.connect("amqp://localhost:5672")
        channel = await connection.createChannel()

        // creating the payment service' common queue 
        await channel.assertQueue(`default queue name`)
        // consumeDataFromQueue(dependencies)
        console.log(`rabbit mq connected successfully with payment-service`)
    } catch (error) {
        console.log(`an error happened during connecting the queue ${error}`);
    }
}

export {
    connectRabbitMq,
    channel
};