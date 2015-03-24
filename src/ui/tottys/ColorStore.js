var _         = require('lodash');
var tinycolor = require('tinycolor');





var ColorStore = function(options){
    options = _.extend({
    });
    this.__colors = {};
};



_.extend(ColorStore.prototype, {



    /**
     * Sets a color to a certain id.
     * @param {String} id
     * @param {tinycolor|String} color
     */
    setColor: function(id, color){
        this.__colors[id] = tinycolor(color);
    },



    /**
     * Returns a certain color.
     * @param  {String} id [description]
     * @param  {'default'|'lighten'|'darken'} [variation='default'] This applies a standard change to the color.
     * @param  {'string'|'tinycolor'} [as='string']
     * @return {tinycolor|String}
     */
    getColor: function(id, variation, as){
        variation = variation || 'default';
        as = as || 'string';
        var color = this.__colors[id];
        if(!color) throw new Error('No color with id "' + id + '" found.');
        if(variation === 'lighten'){
            color.lighten(10);
        }
        else if(variation === 'darken'){
            color.darken(10);
        }
        else if(variation === 'default'){

        }
        else{
            throw new Error('Color variation "' + variation + '" not found.');
        }
        if(as === 'string'){
            return color.toString();
        }
        else if(as === 'tinycolor'){
            return color;
        }
    },



    /**
     * Sets many colors at once.
     * @param {Object[]} colors An array of objects where the key is the id of the color and the value
     *                          is the color. Color can be a tinycolor instance or a string.
     */
    setColors: function(colors){
        _.forEach(colors, function(color, id){
            this.setColor(id, color);
        }.bind(this));
    },


});





module.exports = ColorStore;
