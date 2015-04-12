var BaseTheme = require('tottys-ui').themes.BaseTheme;
var tinycolor = require('tinycolor');
var _         = require('lodash');





var CustomTheme = _.merge({}, BaseTheme, {
});



CustomTheme.colors.setColors({
    main     : 'hsl(230, 78%, 54%)',
    positive : tinycolor('hsl(39, 56%, 60%)'),
})





module.exports = CustomTheme;
