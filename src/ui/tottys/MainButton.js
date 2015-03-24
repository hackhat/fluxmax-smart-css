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



    css.setClass('root', _.extend({
        width        : '320px',
        padding      : '13px',
        border       : '0',
        outline      : 'none',
        marginBottom : '1px',
        boxSizing    : 'border-box',
        cursor       : 'pointer',
        transition   : theme.transition,
        ':hover': _.extend({
        }, theme.font.getStyle('big', theme.colors.getColor('main', 'lighten'))),
        ':active': _.extend({
        }, theme.font.getStyle('big', theme.colors.getColor('main', 'darken')))
    }, theme.font.getStyle('big', theme.colors.getColor('main'))))





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
