sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "com/test/util/formatter"
], (Controller, JSONModel, Fragment, formatter)  => {
    "use strict";

    return Controller.extend("com.test.controller.MainView", {
        // Make the formatter available in the view
        formatter: formatter,
        // onInit: function () {
        //     var oModel = new JSONModel("model/products.json"); // path must be relative to index.html
        //     this.getView().setModel(oModel, "products");
        // },

        onListItemPress: function (oEvent) {
            // Get the item that was clicked
            var oListItem = oEvent.getSource();
            // Get the binding context to know which product was clicked
            var oBindingContext = oListItem.getBindingContext("products");

            // Check if the dialog already exists
            if (!this.pDialog) {
                // if not, load the fragment
                this.pDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "com.test.view.ProductDetails",
                    controller: this // Pass the controller to the fragment
                }).then(function (oDialog) {
                    // connect dialog to the view's lifecycle
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }

            // After the dialog is loaded, open it and bind the data
            this.pDialog.then(function(oDialog) {
                // Bind the dialog to the specific product path
                oDialog.bindElement({
                    path: oBindingContext.getPath(),
                    model: "products"
                });
                oDialog.open();
            });
        },

        onCloseDialog: function () {
            // Get the dialog by its ID and close it
            this.byId("productDetailsDialog").close();
        }
    });
});