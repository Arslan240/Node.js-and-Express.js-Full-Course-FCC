// likw we use events in js we can also use events to respond to stuff in node js
// we require modules events which is actually a class and returns a class which we store in a variable.
// convention is to name it as EventEmitter.

const EventEmitter = require('events')

// we can setup a new event by initializing the EventEmitter class
const customEmitter = new EventEmitter()

// .on is a method which we can use to setup an event and pass a callback function to do what we want to do.
customEmitter.on('response', (name, id) => { 
  console.log(`hi ${name} who have id of ${id}`);
})

// we can also have multiple events with the same name and it'll perform all those functionalities.

// .emit is another method which we use to remove the event listener by passing the name. But i'm confused because we also pass the arguments in the emit method.
customEmitter.emit('response','john',34)

// also creating a server is also an example of this event driven programming.
// alot of programs are using this events stuff under the hood.