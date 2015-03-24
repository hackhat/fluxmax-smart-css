var tinycolor  = require('tinycolor');
var ColorStore = require('./ColorStore');





var BaseTheme = {
    colors: new ColorStore()
};



BaseTheme.colors.setColors({
    main: tinycolor('hsl(196, 100%, 50%)')
})





module.exports = BaseTheme;
