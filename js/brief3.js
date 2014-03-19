/**
 * Created by Thomas on 10/02/14.
 */

/**
 * Global Variables
 * @ajax                    object  | call ajax functions
 */
ajax = {};

/**
 * ajax call
 * @returns {*}
 */
ajax.httpType = function () {
    try {
        return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (error) {
        try {
            return new ActiveXObject('Microsoft.XMLHTTP');
        } catch (error) {
            return new XMLHttpRequest();
        }
    }
};

/**
 *
 * @param url
 * @param type
 * @returns string JSON
 */
ajax.gets = function (url, type) {
    var call = ajax.httpType();
    //microsoft or other request.open get, url
    call.open('GET', url, false);
    //sending nothing in HTTP request
    call.send(null);
    if(type.toLowerCase() == "json"){
        return JSON.parse(call.responseText);
    }
    return call.responseText;
};

var module = {

    url: 'js/data.json',

    selectedProducts: [],

    remainingProducts: [],

    selectedTerms: [],

    remainingTerms: [],

    /**
     * get JSON data
     * @returns {string}
     */

    getData: function(){
        return ajax.gets(this.url, "JSON");
    },

    /**
     * randomise array
     * @param array
     * @returns {*}
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
     * randomise data returned
     * @param item
     * @returns array
     */
    getRandomItems: function(item){
        return this.arrayRand(this.getData()[item]);
    },

    /**
     * gets products and adds them to selected and remaining product arrays
     */
    getProducts: function(){
        document.querySelector('.buying-right-now-content ul').style.opacity = 0;
        var i = 0;
        var products = this.getRandomItems('products');
        while(this.selectedProducts.length < document.querySelectorAll('.buying-right-now-content ul li').length){
            //get random product
            this.selectedProducts.push(products[i]);
            i++;
        }
        //remove added products because splice in while loop does not work
        while(i != 0){
            products.splice(products[i], 1);
            i--;
        }
        //set remaining products to global var
        this.remainingProducts = products;
        this.setProducts();
    },

    /**
     * gets items and adds them to selected and remaining items arrays
     */
    getItems: function(){
        var i = 0;
        var terms = this.getRandomItems('termsTrending');
        while(this.selectedTerms.length < document.querySelectorAll('.trending-items li').length){
            //get random term
            this.selectedTerms.push(terms[i]);
            i++;
        }
        //remove added terms because splice in while loop does not work
        while(i != 0){
            terms.splice(terms[i], 1);
            i--;
        }
        //set remaining term to global var
        this.remainingTerms = terms;
        this.setTerms();
    },

    /**
     * sets products
     */
    setProducts: function(){
        //update products
        var productsLinks = document.querySelectorAll('.buying-right-now-content ul li a');
        var images = document.querySelectorAll('.buying-right-now-content ul li a img');
        var title = document.querySelectorAll('.buying-right-now-content ul li h3 a');
        var i = 0;
        var aTag = 0;
        while(i < document.querySelectorAll('.buying-right-now-content ul li').length){
            //set product info
                //set image a tag
                productsLinks[aTag].href = this.selectedProducts[i]['product-url'];
                //set h3 a tag
                productsLinks[aTag+1].href = this.selectedProducts[i]['product-url'];

                //set image
                images[i].src = this.selectedProducts[i]['product-image-url'];

                //set h3 title
                title[i].innerHTML = this.selectedProducts[i]['term'];

            //end of product info

            //increment variables
            aTag+=2;
            i++;
        }
        //animate them to fade out
        this.setProductAnimation();
        var that = this;
        setInterval(function(){that.setProductAnimation();}, 13000);
    },

    /**
     * sets product animation e.g. fade in and out
     */
    setProductAnimation: function(){
        document.querySelector('.buying-right-now-content ul').style.opacity = 1;
        var products = document.querySelectorAll('.buying-right-now-content ul li');
        var i = 0;
        while(i < products.length){
            setTimeout(this.createTimeoutHandler('product', products[i]), (i+0.5) * 2800);
            i++;
        }
    },

    /**
     * sets items
     */
    setTerms: function(){
        //update terms
        var terms = document.querySelectorAll('.trending-items li a');
        var i = 0;
        while(i < document.querySelectorAll('.trending-items li a').length){
            //set term
            terms[i].innerHTML = this.selectedTerms[i]['term'];
            terms[i].href = this.selectedTerms[i]['link'];
            i++;
        }

        //animate them to fade out
        this.setTermAnimation();
        var that = this;
        setInterval(function(){that.setTermAnimation();}, 10000);
    },

    /**
     * sets term animation e.g. fade in and out
     */
    setTermAnimation: function(){
        var terms = document.querySelectorAll('.trending-items li a');
        var i = 0;
        while(i < terms.length){
            terms[i].style.opacity = 1;
            setTimeout(this.createTimeoutHandler('term', terms[i]), (i+0.5) * 4000);
            i++;
        }
    },

    /**
     * sets fade out and remembers parameters e.g. i when looping through
     * @param func
     * @param item
     * @returns {Function}
     */
    createTimeoutHandler: function(func, item){
        var that = this;
        return function(){
            if(func == 'product'){
                that.fadeOut(item, function(item){that.updateProduct(item);});
            }
            if(func == 'term'){
                that.fadeOut(item, function(item){that.updateTerm(item);});
            }
        }
    },

    /**
     * updates product
     * @param obj
     */
    updateProduct: function(obj){
        var productOld;
        var i = 0;
        while(this.selectedProducts.length > i){
            if(obj.querySelector('h3 a').innerHTML == this.selectedProducts[i].term){
                productOld = this.selectedProducts[i];
            }
            i++;
        }
        var product = this.getRandomItem(this.remainingProducts);
        //once the product is select remove and add to appropriate array
        this.selectedProducts.push(product);
        this.remainingProducts.splice(product, 1);
        //add and remove old product from the array
        this.remainingProducts.push(productOld);

        //when the browser is minimised it will try to speed up the process and add the obj in multiple times it has been missed therefore deleting it numerous times because it isn't there on the second plus time of deleting the object, it must remove the object and
        if(productOld in this.selectedProducts){
            this.selectedProducts.splice(productOld, 1);
        }

        //set new product
        var image = obj.querySelector('li a img');
        var title = obj.querySelector('li h3 a');
        var aTags = obj.querySelectorAll('li a');
        image.src = product['product-image-url'];
        title.innerHTML = product['term'];
        aTags[0].href = product['product-url'];
        aTags[1].href = product['product-url'];
        this.fadeIn(obj);
    },

    /**
     * updates term
     * @param obj
     */
    updateTerm: function(obj){
        var termOld;
        var i = 0;
        while(this.selectedTerms.length > i){
            if(obj.innerHTML == this.selectedTerms[i].term){
                termOld = this.selectedTerms[i];
            }
            i++;
        }
        var term = this.getRandomItem(this.remainingTerms);
        //once the product is select remove and add to appropriate array
        this.selectedTerms.push(term);
        this.remainingTerms.splice(term, 1);
        //add and remove old product from the array
        this.remainingTerms.push(termOld);

        //when the browser is minimised it will try to speed up the process and add the obj in multiple times it has been missed therefore deleting it numerous times because it isn't there on the second plus time of deleting the object, it must remove the object and
        if(termOld in this.selectedTerms){
            this.selectedTerms.splice(termOld, 1);
        }
        //set new product
        obj.innerHTML = term['term'];
        obj.href = term['link'];
        this.fadeIn(obj);
    },

    /**
     * gets random positioned array item
     * @param item
     * @returns array item
     */
    getRandomItem: function(item){
        var items = this.arrayRand(item);
        return items[0];
    },

    /**
     * fades obj out
     * @param obj
     * @param callback
     */
    fadeOut: function(obj, callback){
        obj.style.opacity = 1;
        var interval = setInterval(function(){
            obj.style.opacity = obj.style.opacity - .02;
            if(obj.style.opacity <= 0.1){
                obj.style.opacity = 0;
                clearInterval(interval);
                callback(obj);
            }
        }, 10);
    },

    /**
     * fades obj in
     * @param obj
     */
    fadeIn: function(obj){
        var opacity = 0;
        var interval = setInterval(function(){
            opacity = opacity + .02;
            obj.style.opacity = opacity;
            if(obj.style.opacity >= 0.9){
                obj.style.opacity = 1;
                clearInterval(interval);
            }
        }, 10);
    }
};

/**
 * when the dom has loaded
 */
document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        module.getProducts();
        module.getItems();
    }
};