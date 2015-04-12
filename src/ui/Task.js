var React     = require('react');
var SmartCSS  = require('smart-css');
var Theme     = require('./CustomTheme');
var positiveC = function(){
    return Theme.colors.getColor('positive');
}





var css = new SmartCSS();



css.setClass('.root', {
    maxWidth     : '320px',
    lineHeight   : '25px',
    cursor       : 'pointer',
    padding      : '7px 15px 5px 15px',
    borderBottom : ['1px solid', positiveC().lighten(30)],
    boxSizing    : 'border-box',
    fontFamily   : 'sans-serif',
    transition   : 'all 0.2s',
    color        : positiveC().darken(40),
})
css.setClass('.root:hover', {
    background: positiveC().lighten(30),
});



css.setClass('.completed', {
    background   : positiveC().darken(10),
    color        : positiveC().lighten(40),
    borderBottom : ['1px solid', positiveC().lighten(40)],
})
css.setClass('.completed:hover', {
    background: positiveC()
});



css.setClass('.warning', {
    transition     : 'all 0.2s',
    color          : positiveC().lighten(15),
    borderTop      : ['1px solid', positiveC().lighten(15)],
    display        : 'inline-block',
    width          : 'calc(100% - 0px)',
    paddingTop     : '5px',
    marginTop      : '5px',
    fontSize       : '12px',
})
css.setClass('.warning:hover', {
    color          : positiveC().darken(5),
    borderTopColor : positiveC().darken(5),
})



css.setClass('.warningCompleted', {
    transition     : 'all 0.2s',
    color          : positiveC().lighten(20),
    borderTopColor : positiveC().lighten(20),
})
css.setClass('.warningCompleted:hover', {
    color          : positiveC().lighten(35),
    borderTopColor : positiveC().lighten(35),
})




var displayName = 'ui.task';
var noop = function(){}





module.exports = React.createClass({



    displayName: displayName,



    getInitialState: function(){
        return {
            hover: false
        }
    },



    getDefaultProps: function(){
        return {
            onComplete   : noop,
            onUncomplete : noop,
        }
    },



    __onClick: function(){
        var task = this.props.task;
        if(task.completed){
            this.props.onUncomplete(task._id);
        }else{
            this.props.onComplete(task._id);
        }
    },



    __onMouseOver: function(){
        this.setState({hover: true});
    },



    __onMouseOut: function(){
        this.setState({hover: false});
    },



    render: function(){
        var task = this.props.task;
        return React.DOM.div({
            className : css.getClasses({
                root      : true,
                completed : task.completed
            }),
            onClick     : this.__onClick,
            onMouseOver : this.__onMouseOver,
            onMouseOut  : this.__onMouseOut,
        },
            React.DOM.span({}, task.title),
            React.DOM.br(),
            !task.completed && !task.manual ? React.DOM.span({
                className: css.getClasses({
                    warning : true,
                }),
            }, 'Automatically completed at: ' + task.minPoints + ' points.') : void 0,
            task.completed ? React.DOM.span({
                className: css.getClasses({
                    warning          : true,
                    warningCompleted : true,
                }),
            }, (task.manual ? 'Manually' : 'Automatically') + ' completed and earned ' + task.pointsOnComplete + ' points!') : void 0
        )
    }



});


