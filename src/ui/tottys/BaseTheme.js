var tinycolor  = require('tinycolor');
var ColorStore = require('./ColorStore');
window.tinycolor= tinycolor;




var BaseTheme = {
    colors: new ColorStore(),
    font: {
        getStyle: function(type, background){
            type = type || 'medium';
            if(!background) throw new Error('Background should be set.')
            background = tinycolor(background);
            var style = {};
            if(type === 'big'){
                style.fontSize = '26px';
            }
            else if(type === 'medium'){
                style.fontSize = '18px';
            }
            else if(type === 'small'){
                style.fontSize = '12px';
            }
            else{
                throw new Error('Not type "' + type + '" found.');
            }
            style.background = background.toString();
            var fontColor;
            if(background.isLight()){
                fontColor = background.darken(35);
            }else{
                fontColor = background.lighten(35);
            }
            style.color = fontColor.toString();
            return style;
        }
    },
    transition: 'all 0.2s'
};



BaseTheme.colors.setColors({
    main: tinycolor('hsl(196, 100%, 50%)')
})





module.exports = BaseTheme;
