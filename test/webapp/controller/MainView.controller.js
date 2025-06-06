sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "com/test/util/formatter"
], (Controller, JSONModel, Fragment, formatter)  => {
    "use strict";

    return Controller.extend("com.test.controller.MainView", {
        formatter: formatter,
       

        onListItemPress: function (oEvent) {
            var oListItem = oEvent.getSource();
            var oBindingContext = oListItem.getBindingContext("products");

            if (!this.pDialog) {
                this.pDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "com.test.view.ProductDetails",
                    controller: this 
                }).then(function (oDialog) {
                   
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }

            this.pDialog.then(function(oDialog) {
                oDialog.bindElement({
                    path: oBindingContext.getPath(),
                    model: "products"
                });
                oDialog.open();
            });
        },

        onCloseDialog: function () {
            this.byId("productDetailsDialog").close();
        }
    });
});