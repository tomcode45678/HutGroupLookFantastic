/**
 * Created by Thomas Stapleton on 28/05/14.
 */

define(['ajax'], function () {

    var helper = {

        //assign ajax methods from ajax file
        ajax: {},

        /**
         * randomise array
         * @param array
         * @returns {array}
         */
        arrayRand: function(array){
            var i = array.length;
            while (i--) {
                var p = parseInt(Math.random()*i);
                var t = array[i];
                array[i] = array[p];
                array[p] = t;
            }
            return array;
        },

        /**
         * get JSON data
         * @param url       | location of data source
         * @param dataType  | type of data from source e.g. json or xml
         * @param dummyData | dummy data being added into function to directly use
         * @returns {string}
         */
        getData: function(url, dataType, dummyData){
            return helper.ajax.gets(url, dataType, dummyData);
        },

        /**
         * randomise data returned
         * @param item
         * @returns {array}
         */
        getRandomItems: function(item){
            return this.arrayRand(this.getData()[item]);
        },

        /**
         * gets random positioned array item
         * @param item
         * @returns array {item}
         */
        getRandomItem: function(item){
            var items = this.arrayRand(item);
            return items[0];
        }
    }
    //return object methods
    return helper;
});