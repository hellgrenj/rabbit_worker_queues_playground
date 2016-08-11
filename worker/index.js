const rabbit = require('./rabbit');
setTimeout(() => {
  rabbit.init(() => {
      rabbit.listenOnWorkerQueue();
  });
},5000);
