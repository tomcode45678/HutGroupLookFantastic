/**
 * Created by Thomas Stapleton on 27/05/14.
 */

define(['helper'], function () {

    var trending = {

        //assign helper methods from helper file
        helper: {},

        module: {

            selectedProducts: [],

            remainingProducts: [],

            selectedTerms: [],

            remainingTerms: [],

            productColumns: '',

            termColumns: '',

            /**
             * gets products and adds them to selected and remaining product arrays
             */
            getProducts: function(){
                document.querySelector('.buying-right-now-content ul').style.opacity = 0;
                var i = 0, products = trending.helper.getRandomItems('products'), that = this;
                while(this.selectedProducts.length < parseInt(this.productColumns)){
                    //get random product
                    that.selectedProducts.push(products[i]);
                    i++;
                }
                //remove added products because splice in while loop does not work
                while(i != 0){
                    products.splice(i, 1);
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
                var i = 0, terms = trending.helper.getRandomItems('termsTrending');
                while(this.selectedTerms.length < parseInt(this.termColumns)){
                    //get random term
                    this.selectedTerms.push(terms[i]);
                    i++;
                }
                //remove added terms because splice in while loop does not work
                while(i != 0){
                    terms.splice(i, 1);
                    i--;
                }
                //set remaining term to global var
                this.remainingTerms = terms;
                this.setTerms();
            },

            /**
             * sets products
             */
            productAnimate: '',
            setProducts: function(){
                //update products
                var productsLinks = document.querySelectorAll('.buying-right-now-content ul li a');
                var images = document.querySelectorAll('.buying-right-now-content ul li a img');
                var title = document.querySelectorAll('.buying-right-now-content ul li h3 a');
                var i = 0, aTag = 0;
                while(i < parseInt(this.productColumns)){
                    //set image a tag
                    productsLinks[aTag].href = this.selectedProducts[i]['product-url'];
                    //set h3 a tag
                    productsLinks[aTag+1].href = this.selectedProducts[i]['product-url'];
                    //set image
                    images[i].src = this.selectedProducts[i]['product-image-url'];
                    //set h3 title
                    title[i].innerHTML = this.selectedProducts[i]['term'];
                    //increment variables
                    aTag+=2;
                    i++;
                }
                //animate them to fade out
                this.setProductAnimation();
                var that = this;
                this.productAnimate = setInterval(function(){that.setProductAnimation();}, 13000);
            },

            /**
             * sets product animation e.g. fade in and out
             */
            setProductAnimation: function(){
                document.querySelector('.buying-right-now-content ul').style.opacity = 1;
                var products = document.querySelectorAll('.buying-right-now-content ul li'), i = 0;
                // this.productTimeout;
                var that = this;
                while(i < parseInt(this.productColumns)){
                    that.productTimeout = setTimeout(that.createTimeoutHandler('product', products[i]), (i+0.5) * 2800);
                    i++;
                }
            },

            /**
             * sets terms
             */
            setTerms: function(){
                //update terms
                var terms = document.querySelectorAll('.trending-items li a'), i = 0;
                while(i < parseInt(this.termColumns)){
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
                var terms = document.querySelectorAll('.trending-items li a'), i = 0;
                while(i < parseInt(this.termColumns)){
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
                var productOld, i = 0, that = this;
                while(this.selectedProducts.length > i){
                    if(obj.querySelector('h3 a').innerHTML == this.selectedProducts[i].term){
                        productOld = that.selectedProducts[i];
                    }
                    i++;
                }

                var product = trending.helper.getRandomItem(this.remainingProducts);
                if(typeof product !== 'undefined' && typeof productOld !== 'undefined'){
                    if(this.selectedProducts.indexOf(product) === - 1 && this.remainingProducts.indexOf(product) > - 1){
                        //once the product is select remove and add to appropriate array
                        this.selectedProducts.push(product);
                        this.remainingProducts.splice(product, 1);
                        this.remainingProducts.push(productOld);
                        this.selectedProducts.splice(i, 1);
                        var image = obj.querySelector('li a img'), title = obj.querySelector('li h3 a'), aTags = obj.querySelectorAll('li a');
                        image.src = product['product-image-url'];
                        title.innerHTML = product['term'];
                        aTags[0].href = aTags[1].href = product['product-url'];
                    }
                }
                //set new product
                this.fadeIn(obj);
            },

            /**
             * updates term
             * @param obj
             */
            updateTerm: function(obj){
                var termOld, i = 0;
                while(this.selectedTerms.length > i){
                    if(obj.innerHTML == this.selectedTerms[i].term){
                        termOld = this.selectedTerms[i];
                    }
                    i++;
                }
                var term = trending.helper.getRandomItem(this.remainingTerms);
                //once the product is select remove and add to appropriate array
                this.selectedTerms.push(term);
                //when the browser is minimised it will try to speed up the process and add the obj in multiple times it has been missed therefore deleting it numerous times because it isn't there on the second plus time of deleting the object, it must remove the object
                if(this.remainingTerms.indexOf(term) > -1){
                    this.remainingTerms.splice(term, 1);
                }
                //add and remove old product from the array
                this.remainingTerms.push(termOld);
                //when the browser is minimised it will try to speed up the process and add the obj in multiple times it has been missed therefore deleting it numerous times because it isn't there on the second plus time of deleting the object, it must remove the object
                if(this.selectedTerms.indexOf(termOld) > -1){
                    this.selectedTerms.splice(termOld, 1);
                }
                //set new product
                obj.innerHTML = term['term'];
                obj.href = term['link'];
                this.fadeIn(obj);
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
        },

        /**
         * Start the script
         */
        initiate: function(){
            trending.module.getProducts();
            trending.module.getItems();
        }
    };
    //return object methods
    return trending;
});