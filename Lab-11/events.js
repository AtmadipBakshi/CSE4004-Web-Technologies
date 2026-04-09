
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});
eventEmitter.on('greet', (name) => {
    console.log(`Welcome to Node.js, ${name}!`);
});


eventEmitter.on('dataEvent', (data) => {
    console.log('Data received:', data);
});


eventEmitter.emit('greet', 'Atmadip');
eventEmitter.emit('dataEvent', { id: 1, message: 'Event-driven programming' });

setTimeout(() => {
    eventEmitter.emit('greet', 'Delayed User');
}, 2000);