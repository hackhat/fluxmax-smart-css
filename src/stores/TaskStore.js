var BaseStore = require('./BaseStore');
// Loads the static `App`, this is later required to register at "compile-time"
// this store.
var App       = require('fluxmax').App;
var _         = require('lodash');





var TaskStore = function(options){
    options = _.extend({
        stores: void 0,
    }, options);
    this.__stores = options.stores;
    // Calls the super class, the BaseStore constructor.
    BaseStore.apply(this, arguments);
    /////////////////////////////
    // This is very important  //
    /////////////////////////////
    // You really need to set the store's class in the instance
    // in this variable. This is needed by the fluxmax system to
    // setup all the wiring of your app.
    this.Class = TaskStore;
    this.__tasks = [];
    this.__taskId = 0;
};




///////////////////
// Fluxmax setup //
///////////////////
// Here is another essential part of your store. This describes your store's
// entity, such as it's name, which events dispatches and to which events it
// listens to. Read the comments below:
var E = TaskStore; // "E" from "Entity".
E.meta = {
    // Unique id of this entity. Is a good practice to name stores with the `store.`
    // prefix in order to don't confuse them with other entities of your app like ui or
    // views for example.
    id: 'store.task',
    // What events this entity dispatches. These are the events that your store emits
    // to the app. Other views and stores might listen to them.
    changeTypes: [
        'added',
        'completed',
        'uncompleted',
    ],
    // To what events this entity listens to. Here are described the events that this
    // store listens to. Each line is a different listener and defines several things such as:
    //  - Type of phase: Here you can choose between `each` and `batch`; Normally stores listens
    //    to the `each` phase and views listens to the `batch` phases.
    //  - The entity listens to: this is the entity id to which you want to wire the event;
    //  - The event name: this is the name of the event you listen on the defined entity;
    //  - The method to call on this store: This is the name of the method that you want to be called
    //    when the event you listen to is fired.
    //
    // > ['each', 'actions'   , 'ui.tasks.addTask'        , '__onUITaskAdd'        ],
    // For example the first line says: Call the `__onUITaskAdd` method on this store `each` time
    // the event named `ui.tasks.addTask` of the `actions` entity is fired;
    //
    // Yes, that might be confusing at first but is pretty easy to understand.
    //
    // > ['each', 'store.user', 'pointsChanged'           , '__onUserPointsChanged'],
    // Let's explain the last listener too with other words. Every time the `store.user`
    // entity fires the event `pointsChanged` call the method `__onUserPointsChanged`.
    //
    // What else you can do:
    //  - Listen to your own events; Yes, a store can listen to itself;
    //  - Listen on the same event and entity but with 2 different methods (not very useful, but you might
    //    find an use case);
    listeners: [
        ['each', 'actions'   , 'ui.tasks.addTask'        , '__onUITaskAdd'        ],
        ['each', 'actions'   , 'ui.tasks.completeTask'   , '__onUITaskComplete'   ],
        ['each', 'actions'   , 'ui.tasks.uncompleteTask' , '__onUITaskUncomplete' ],
        ['each', 'store.user', 'pointsChanged'           , '__onUserPointsChanged'],
    ]
}
// Here we create a listen instance. This is an internal thing about the framework. You just
// need to know that you have to write this exact code. Notice that we add this to the `App`, which
// is the singleton application.
E.listen = App.addMetaEntity(E.meta);




// Here we just inherit from the previously seen BaseStore.
_.extend(TaskStore.prototype, BaseStore.prototype, {



    getAll: function(){
        return this.__tasks.slice();
    },



    getTaskById: function(id){
        var task;
        this.__tasks.forEach(function(_task){
            if(_task._id === id) task = _task;
        })
        return task;
    },



    __onUserPointsChanged: function(){
        this.__refreshAutoTasks();
    },



    __refreshAutoTasks: function(){
        var points = this.__stores.user.getPoints();
        this.__tasks.forEach(function(task){
            // If has been manually complete or uncompleted then don't change.
            if(task.manual) return;
            if(task.completed) return;
            if(task.minPoints <= points){
                task.completed = true;
                // Here we emit a change named `completed` with the task as it's data.
                // This event will be listened by various entities, look at your console
                // when your app starts to see who listens to this event.
                this.emitChange('completed', task);
            }
        }.bind(this))
    },



    __onUITaskComplete: function(taskId){
        var task = this.getTaskById(taskId);
        if(task.completed) return;
        task.manual = true;
        task.completed = true;
        this.emitChange('completed', task);
    },



    __onUITaskUncomplete: function(taskId){
        var task = this.getTaskById(taskId);
        if(!task.completed) return;
        task.manual = true;
        task.completed = false;
        this.emitChange('uncompleted', task);
    },



    __onUITaskAdd: function(task){
        this.__add(task);
    },



    __add: function(task){
        task._id = this.__taskId++;
        task.completed = false;
        this.__tasks.push(task);
        this.emitChange('added', task);
    },



});





module.exports = TaskStore;
