
const events = require('events');

class AppEventEmitter extends events.EventEmitter{
}

export const AppEvent = new AppEventEmitter();