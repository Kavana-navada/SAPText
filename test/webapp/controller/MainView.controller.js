sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text"
], (Controller,JSONModel,Dialog,Button,Text) => {
    "use strict";

    return Controller.extend("com.test.controller.MainView", {
        onInit() {
            const oData={
                products:[
                    {
                        "name":"Mobile",
                        "model":"Samgsung s24",
                        "stock":6,
                        "price":85000,
                        "details":"Moblie with best camera"
                    },
                    {
                        "name":"AC",
                        "model":"Samgsung7",
                        "stock":12,
                        "price":70000,
                        "details":"AC with energy saver"
                    },
                    {
                        "name":"TV",
                        "model":"Onida",
                        "stock":4,
                        "price":60000,
                        "details":"Updated to smart TV"
                    }
                ]
            }
            const oModel=new JSONModel(oData);
            this.getView().setModel(oModel);
        },
        onProdPress:function(oEvent){
            const oItem=oEvent.getSource();
            const oContext=oItem.getBindingContext();
            const oData=oContext.getObject();
            if(!this._oDialog){
                this._oDialog=new Dialog({
                    title:"Product details",
                    content:new Text({text:""}),
                    beginButton:new sap.m.Button({
                        text:"Close",
                        press:function(){
                            this._oDialog.close();
                        }.bind(this)
                    })
                });
                this.getView().addDependent(this._oDialog);
            }
            this._oDialog.getContent()[0].setText(
                `Name:${oData.name}
                Model:${oData.model}
                Stock:${oData.stock}
                Price:${oData.price}
                Description:${oData.description}`
            );
            this._oDialog.open();

        }

    });
});