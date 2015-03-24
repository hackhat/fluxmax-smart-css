var BaseTheme = require('./tottys/BaseTheme');
var tinycolor = require('tinycolor');
var _         = require('lodash');





var CustomTheme = _.merge({}, BaseTheme, {
});



CustomTheme.colors.setColors({
    main: 'hsl(11, 100%, 77%)'
})





module.exports = CustomTheme;
