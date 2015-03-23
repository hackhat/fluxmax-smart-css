var React    = require('react');
var SmartCSS = require('smart-css');
var _        = require('lodash');





var css = new SmartCSS();



css.setClass('root', {
    width        : '320px',
    padding      : '13px',
    border       : '0',
    background   : 'hsl(196, 100%, 50%)',
    color        : 'white',
    fontSize     : '26px',
    outline      : 'none',
    marginBottom : '1px',
    boxSizing    : 'border-box',
    cursor       : 'pointer',
    transition   : 'all 0.2s',
    ':hover': {
    background   : 'hsl(196, 100%, 40%)',
    }
})





module.exports = React.createClass({



    displayName: 'tottys.MainButton',



    render: function(){
        return React.DOM.button(_.extend({}, _.omit(this.props, 'className'), {
            className: css.getClass('root'),
        }), this.props.label)
    }



});


