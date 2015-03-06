var _   = require('lodash');
var App = require('fluxmax').App;




// #fluxmax-tag
var Actions = function(app){
    this.__app = app;
};





var E = Actions;
E.meta = {
    id: 'actions',

    /**
     * This class is pretty static, the only thing you really need to care about is the following
     * lines which defines your app's actions.
     * Congratulations, you read all the essentials parts of the fluxmax system and you are ready to go!
     */
    changeTypes: [
        'ui.tasks.addTask',
        'ui.tasks.completeTask',
        'ui.tasks.uncompleteTask',
    ],

    listeners: [
    ]
}
E.listen = App.addMetaEntity(E.meta);





E.meta.changeTypes.forEach(function(changeType){
    Actions.prototype[changeType] =  function(data){
        this.__app.injectChange(E.meta.id, changeType, data)
    }
})





_.extend(Actions.prototype, {



});




module.exports = Actions;
