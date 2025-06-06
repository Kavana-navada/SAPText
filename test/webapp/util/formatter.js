sap.ui.define([], function () {
    "use strict";

    return {
        stockState: function (iStock) {
            if (iStock < 10) {
                return "Error"; 
                return "None";
            }
        }
    };
});