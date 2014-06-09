/**
 * Created by Thomas Stapleton on 28/05/14.
 */

define(['ajax'], function () {

    var ajax = {

        url: undefined,

        dataType: undefined,

        dummyData: undefined,

        /**
         * ajax call
         * @returns {method}
         */
        httpType: function () {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (error) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                } catch (error) {
                    return new XMLHttpRequest();
                }
            }
        },

        /**
         *
         * @param url
         * @param dataType
         * @param dummyData
         * @returns string JSON
         */
        gets: function (url, dataType, dummyData) {
            //if the url is not set in the object the url can be set directly within the function
            this.url = this.url !== undefined ? this.url : url;
            //if the type is not set in the object the type can be set directly within the function
            this.dataType = this.dataType !== undefined ? this.dataType : dataType;
            this.dummyData = this.dummyData !== undefined ? this.dummyData : dummyData;
            if(this.url){
                var call = this.httpType();
                //microsoft or other request.open get, url
                call.open('GET', this.url, false);
                //sending nothing in HTTP request
                call.send(null);
            }
            var responseText = this.dummyData !== undefined ? this.dummyData : call.responseText;
            //JSON return
            if(this.dataType.toLowerCase() == "json"){
                return JSON.parse(responseText);
            }
            //TODO make xmlToJson function in helper and call to return json from xml file
            if(this.dataType.toLowerCase() == "xml"){
                return JSON.parse(responseText);
            }
            return JSON.parse(responseText);
        }
    };
    //return object methods
    return ajax;
});