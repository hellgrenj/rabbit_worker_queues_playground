const hulken = require('hulken');
const timer = require('setcountdown');
const colors = require('colors');
const runHulkenContinuously = function() {
    const myArrayOfRequests = [{
        method: 'POST',
        path: '/putonq',
        payload: {
            query: '::random letters 10'
        },
        expectedTextToExist: 'placed the message on the worker queue'
    }];

    const hulken_options = {
        targetUrl: 'http://localhost:1337',
        requestsArray: JSON.stringify(myArrayOfRequests),
        numberOfHulkenAgents: 10,
        timesToRunEachRequest: 10
    };

    hulken.run((stats) => {
        process.exit(1);
    }, (stats) => {
        console.log('STARTING ANOTHER RUN IN 10 SECONDS'.yellow);
        timer.setCountdown(() => {
            runHulkenContinuously();
        }, 10000, '     '.bgCyan);
    }, hulken_options);
};

runHulkenContinuously();
