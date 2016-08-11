const amqp = require('amqplib/callback_api');
const rabbit = {};

rabbit.init = function(done) {
    amqp.connect('amqp://the-rabbit', (err, conn) => {
        if (err) throw err;
        rabbit.conn = conn;
        console.log('connected to the-rabbit');
        done();
    });
};

rabbit.listenOnWorkerQueue = function() {
    rabbit.conn.createChannel((err, ch) => {
        const q = 'task_queue';
        ch.assertQueue(q, {
            durable: true
        });
        ch.prefetch(1); // only accept one message at a time
        ch.consume(q, function(msg) {

            console.log(" [x] Received %s", msg.content.toString());

            setTimeout(() => {
                console.log(" [x] Done");
                ch.ack(msg);
            }, 400); // wait 400 milliseconds before sending ACK to simulate being busy doing stuff

        }, {
            noAck: false
        });
    });
};
module.exports = rabbit;
