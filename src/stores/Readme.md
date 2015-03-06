# Stores



## Base Store

The first thing you need to do is to create a [BaseStore](./BaseStore.js) in your app. Look at it's source.

The BaseStore inherits from a special class from the fluxmax system. This will add some new methods on your store. The one that you will use is this one:

 - `emitChange(eventName, eventData)`: This emits a change to the system;



## Other stores

After you understood how to create the BaseStore (you can even copy paste it in your app) proceed to create some stores. 
Here we create stores that inherit from the BaseStore. In this example we have 2 stores (open them in this order because the TaskStore contains important comments that UserStore does not):

 - [TaskStore](./TaskStore.js);
 - [UserStore](./UserStore.js);
