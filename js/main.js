/**
 * Created by Thomas Stapleton on 27/05/14.
 */

var	paths = {ajax: 'modules/ajax', helper: 'modules/helper', trending: 'modules/trending'}, modules = []; //requireJS configuration

//reset all previously defined paths and their dependencies to point into a single "all" script
if (requirejs.s.contexts._.config.paths.all) {
    setScriptBuildPaths();
}

// initialize
requirejs.config({paths: paths});

//build final modules list
modules = Object.keys(requirejs.s.contexts._.config.paths);

define(function(){
    // load modules
    require(modules, function(){
        /*
         * Can set AJAX methods directly in the file and then reset them after using var ajax = require('ajax');
         * Can also use the helper.getData() method to pass in three parameters url, dataType and dummyData (if required)
         * Example: helper.getData('myurl.json', "json");
         */

        //set ajax variable to object (file returns)
        var ajax = require('ajax');

        //set url of data feed
        ajax.url = 'js/data.json';

        //specify the type of data expected to be returned (json usually expected)
        ajax.dataType = 'json';
        //TODO add XML functionality conversion from XML to JSON

        //setting dummy data (uncomment and modify to see dummy data working)
        /*ajax.dummyData = '{"author":"Thomas Stapleton","products":[{"term":"Perfect Curl","product-url":"http://www.lookfantastic.com/babyliss-pro-porcelain-conical-wand-hot-pink-32-19mm/10303434.html","product-image-url":"http://s4.thcdn.com/productimg/0/130/130/34/10303434-1363792286-937689.jpg"},{"term":"CAUDALIE BEAUTY ELIXIR","product-url":"http://www.lookfantastic.com/korres-vanilla-freesia-and-lychee-shower-gel-250ml/10625991.html","product-image-url":"http://s4.thcdn.com/productimg/0/130/130/91/10625991-1353342605-56259.jpg"},{"term":"L\'OCCITANE COLLECTION","product-url":"http://www.lookfantastic.com/abi-o-gradual-tanner-200ml/10726540.html","product-image-url":"http://s4.thcdn.com/productimg/0/130/130/40/10726540-1360165132-775941.jpg"},{"term":"Magnitone","product-url":"http://www.lookfantastic.com/magnitone-pulsar-daily-skin-cleansing-toning-system-for-face-and-body/10858382.html","product-image-url":"http://s4.thcdn.com/productimg/0/130/130/82/10858382-1385057152-463585.jpg"},{"term":"MOROCCANOIL SUPERSIZES","product-url":"http://www.lookfantastic.com/moroccanoil-treatment-25ml/10448780.html","product-image-url":"http://s4.thcdn.com/productimg/0/130/130/80/10448780-1385057152-463695.jpg"},{"term":"LIQUID GOLD","product-url":"http://www.lookfantastic.com/alpha-h-liquid-gold-100ml/10243506.html","product-image-url":"http://s4.thcdn.com/productimg/0/130/130/06/10243506-1368194275-779789.jpg"},{"term":"AVEDA","product-url":"http://www.lookfantastic.com/aveda-phomollient-styling-foam-200ml/10541399.html","product-image-url":"http://s4.thcdn.com/productimg/0/130/130/99/10541399-1319873770-753273.jpg"},{"term":"GHD WONDERLAND","product-url":"http://www.lookfantastic.com/ghd-iv-styler/10481950.html","product-image-url":"http://s4.thcdn.com/productimg/0/130/130/50/10481950-1382087024-388697.jpg"}],"termsTrending":[{"term":"Make Up","link":"http://www.lookfantastic.com/health-beauty/make-up.list"},{"term":"Perfume","link":"http://www.lookfantastic.com/health-beauty/fragrance/female.list"},{"term":"GHD","link":"http://www.lookfantastic.com/health-beauty/ghd.list"},{"term":"Hair Spray","link":"http://www.lookfantastic.com/health-beauty/hair/styling/hair-sprays.list"},{"term":"Post Tanning","link":"http://www.lookfantastic.com/health-beauty/body/self-tanning/post-tanning.list"},{"term":"Curling","link":"http://www.lookfantastic.com/elysium.search?autocomplete=searchsuggestion&search=curling"},{"term":"Salon","link":"http://www.lookfantastic.com/elysium.search?search=salon"},{"term":"Moisturisers","link":"http://www.lookfantastic.com/elysium.search?search=Moisturisers"}]}';*/

        //set helper variable to object (file returns)
        var helper = require('helper');

        //set ajax methods to the helper variable for access
        helper.ajax = ajax;

        //set trending variable to object (file returns)
        var trending = require('trending');

        //set helper variable to object (file returns)
        trending.helper = helper;

        //set the number of columns the products have (products displayed) number expected
        trending.module.productColumns = 4;

        //set the number of term columns (terms displayed) number expected
        trending.module.termColumns = 2;

        //run automated script
        trending.initiate();

    });

});