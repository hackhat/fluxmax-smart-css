module.exports = function(options){
    options = _.extend({
        theme: void 0,
    }, options);
    var theme = options.theme;
    if(!theme) throw new Error('No theme defined.');

    return {
        MainButton: require('./MainButton')(options)
    }
}
