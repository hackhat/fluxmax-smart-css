// Here we get some special methods from the fluxmax library such as
// the methods `emitChange` which is required by stores to emit changes.
var FluxmaxStoreMixin = require('fluxmax').StoreMixin;
var EventEmitter      = require('event-emitter');
var _                 = require('lodash');





var BaseStore = function(){

};




// Here we extend the BaseStore from the EventEmitter and the FluxmaxStoreMixin.
// The EventEmitter allows use to emit changes, like in node.js.
_.extend(BaseStore.prototype, EventEmitter.prototype, FluxmaxStoreMixin, {

});





module.exports = BaseStore;
