sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("pnp.sam.controller.App", {

		//init hook of UI5 controller framework
		onInit: function () {

		},

		/**
		 * Event handler for select on navigation item
		 * @public
		 * @param {sap.ui.base.Event} oEvent The item select event
		 */
		onNavigationItemSelect: function (oEvent) {

			//get selected navigation item 
			var oNavigationItem = oEvent.getParameter('item');

			//do navigate to seleted item
			this.doNavigateToSelectedItem(oNavigationItem);

		},

		/**
		 * Event handler for select on navigation item
		 * @public
		 * @param {sap.ui.base.Event} oEvent The item select event
		 */
		doNavigateToSelectedItem: function (oNavigationItem) {

			//get selected navigation item and key thereof
			var sKey = oNavigationItem.getKey();

			//depending on selected navigation item key
			switch (sKey) {

				//navigate to route of same name
			case "Workplaces":
			case "Registers":
			case "Reports":
				this.getRouter().navTo(sKey);
				break;

				//navigate to menu
			case "Menu":

				//get menu fixed navigation item
				var oFixedNavigationItem = oNavigationItem.getBindingContext("SAMModel").getObject();

				//open another window with terms of use page
				window.open(oFixedNavigationItem.FeatureUrl, "_self");

				//no further processing
				break;

				//unhandled navigation items
			default:
				sap.m.MessageToast.show("Navigation for item key " + sKey + " has not yet been implemented");
			}

		},

		//toggle side navigation between expanded and condensed
		onSideNavButtonPress: function () {
			var oToolPage = this.getView().byId("app");
			var bSideExpanded = oToolPage.getSideExpanded();
			this._setToggleButtonTooltip(bSideExpanded);
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function (bSideExpanded) {
			var oToggleButton = this.getView().byId('sideNavigationToggleButton');
			if (bSideExpanded) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
		},

		//convenience method to get Router
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

	});

});