var React    = require('react');
var SmartCSS = require('smart-css');
var _        = require('lodash');





module.exports = function(options){
    options = _.extend({
        theme: void 0,
    }, options);
    var theme = options.theme;
    if(!theme) throw new Error('No theme defined.');



    var css = new SmartCSS();



    css.setClass('root', {
        width        : '320px',
        padding      : '13px',
        border       : '0',
        background   : theme.colors.main.toString(),
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





    var MainButton = React.createClass({



        displayName: 'tottys.MainButton',



        render: function(){
            return React.DOM.button(_.extend({}, _.omit(this.props, 'className'), {
                className: css.getClass('root'),
            }), this.props.label)
        }



    });



    return MainButton;
}
