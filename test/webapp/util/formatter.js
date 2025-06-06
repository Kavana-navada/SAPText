sap.ui.define([], function () {
    "use strict";

    return {
        stockState: function (iStock) {
            if (iStock < 10) {
                return "Error"; // "Error" state gives a red background
            } else {
                return "None";
            }
        }
    };
});