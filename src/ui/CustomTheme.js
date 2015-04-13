var BaseTheme = require('tottys-ui').themes.BaseTheme;
var tinycolor = require('tinycolor');
var _         = require('lodash');





var CustomTheme = _.merge({}, BaseTheme, {
});



CustomTheme.colors.setColors({
    main      : tinycolor('hsl(230, 78%, 54%)'),
    secondary : tinycolor('hsl(230, 0%, 90%)'),
    positive  : tinycolor('hsl(139, 56%, 60%)'),
})





module.exports = CustomTheme;
