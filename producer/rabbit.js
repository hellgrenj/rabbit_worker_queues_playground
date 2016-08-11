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
rabbit.sendToQueue = function(msg) {
    rabbit.conn.createChannel((err, ch) => {
        const q = 'task_queue';
        ch.assertQueue(q, {
            durable: true
        });
        ch.sendToQueue(q, new Buffer(msg), {
            persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
    });
};
module.exports = rabbit;
