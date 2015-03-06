var React     = require('react');
var Fluxmax   = require('fluxmax');
var SmartCSS  = require('smart-css');
var Actions   = require('./Actions');
var RootUI    = require('./ui/index');
var TaskStore = require('./stores/TaskStore');
var UserStore = require('./stores/UserStore');





////////////////////////////
// Stores and app config. //
////////////////////////////
var App     = Fluxmax.App;
// Create a new app instance. Notice that somewhere we use the `App` and in
// other places we use `app`. The `App` is the singleton which is used for the
// static dependency checker, the `app` is the one that makes your app work.
var app     = new App();
// Create a new actions entity, this will be used by your views to trigger certain
// actions which your stores listen to.
var actions = new Actions(app);
// Creates 2 stores and passes the `store` variable in order to have access to each other.
// The stores' public's methods are just to get data, they don't change any data. The data
// is changed after they receive an external event.
var stores = {};
stores.task = new TaskStore({stores: stores});
stores.user = new UserStore({stores: stores});
var instanceEntities = [
    stores.task,
    stores.user
];
// Here we add the entities (in this case store) to the application. Notice that this is not the singleton.
app.addEntities(instanceEntities);
// Mounts stores into the app. This is essential because here happens the
// real wiring between the stores and the rest of the app.
_.forEach(stores, function(store){
    store.mount(app);
})


/////////////////
// App's data. //
/////////////////
// Here is some data that will be passed down to the react views.
var data = {
    context: {
        app     : app,
        stores  : stores,
        actions : actions,
    }
}



///////////////////
// React render. //
///////////////////
// Here we just render the RootUI. The RootUI is the root of the application, look into the
// `ui` folder to view all the views.
React.render(React.createElement(RootUI, data), document.getElementById('root'), function(){
    console.log('React root UI has been added to DOM.')
});



/////////////
// Styles. //
/////////////
// Is needed to inject the css styles from the views.
SmartCSS.injectStyles();




///////////////
// Debug app //
///////////////
// Notice that we are calling these methods on the static `App`.
// These methods will write to your console important data such as
// the dependencies.
App.checkDependencies();
App.renderDependencies();


/////////////////
// Batch phase //
/////////////////
// Here is when the batch phase is invoked, this is manually done
// on each frame. When the `app.emitBatchChanges()` method is called
// all the views are updated with the data from stores.
var requestAnimationFrame = require('requestanimationframe');
var scheduleNextRAF = function(){
    requestAnimationFrame(function(){
        // On the instance app.
        app.emitBatchChanges();
        scheduleNextRAF();
    })
}
scheduleNextRAF();

// In order to continue to understand how to setup, read the docs from the stores folder.
// Then read the docs from the ui folder
