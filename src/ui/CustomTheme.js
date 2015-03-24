var BaseTheme = require('./tottys/BaseTheme');
var tinycolor = require('tinycolor');
var _         = require('lodash');





var CustomTheme = _.merge({}, BaseTheme, {
});



CustomTheme.colors.setColors({
    main: 'hsl(116, 100%, 50%)'
})





module.exports = CustomTheme;
