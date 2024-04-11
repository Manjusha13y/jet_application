/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import "ojs/ojfilepicker";
import * as ko from "knockout";
// import "ojs/ojnavigationlist";
// import "ojs/ojmenu";
// import "ojs/ojtoolbar";
import { FilePickerElement } from "ojs/ojfilepicker";
// import app = require("viewModels/appLayout/navBarWeb/appController");
// import Router = require("ojs/ojrouter");
// import CoreRouter = require("@oracle/oraclejet/ojcorerouter");
// import UrlParamAdapter = require("@oracle/oraclejet/ojurlparamadapter");
// import ModuleRouterAdapter = require("@oracle/oraclejet/ojmodulerouter-adapter");
// import KnockoutRouterAdapter = require("@oracle/oraclejet/ojknockoutrouteradapter");
// import ArrayDataProvider = require("@oracle/oraclejet/ojarraydataprovider");

class IncidentsViewModel {
  multiple : ko.ObservableArray<string> = ko.observableArray(["multiple"]);
  multipleStr : ko.Computed<any> = ko.pureComputed(() => {
    return this.multiple()[0] ? "multiple" : "single";
  });
  disabled : ko.ObservableArray<string> = ko.observableArray();
  isDisabled : ko.Computed<boolean> = ko.pureComputed(() => {
    return this.disabled()[0] === "disable" ? true : false;
  });
  invalidMessage : ko.Observable<string> = ko.observable("");
  invalidListener = (event : FilePickerElement.ojInvalidSelect) => {
    this.fileNames([]);
    this.invalidMessage(
      "{severity: '" +
        event.detail.messages[0].severity +
        "', summary: '" +
        event.detail.messages[0].summary +
        "'}"
    );
    const promise = event.detail.until;

    if (promise) {
      promise.then(() => {
        this.invalidMessage("");
      });
    }
  };
  acceptStr : ko.Observable<string> = ko.observable("image/*");
  acceptArr : ko.Computed<string[]> = ko.pureComputed(() => {
    const accept = this.acceptStr();
    return accept ? accept.split(",") : [];
  });
  fileNames : ko.Observable<any> = ko.observable([] as any);
  selectListener = (event: FilePickerElement.ojSelect): void => {
    this.invalidMessage("");
    let files: FileList | null = event.detail.files;
    if (files) {
        // Use Array.from to convert FileList to an array
        const fileNames: any = Array.from(files).map((file: File) => file);
        this.fileNames(fileNames);
         console.log(this.fileNames());
        
    }
};
  // moduleAdapter: any;
  // selection: any;
  // navDataProvider: ArrayDataProvider<unknown, unknown>;

 

  constructor() {
    this.fileNames = ko.observableArray<string>([]);
    // const navDataSource = [
    //   { path: "", redirect: "dashboard" },
    //   { path: "dashboard", detail: { label: "Dashboard", iconClass: "oj-ux-ico-bar-chart" } },
    //   { path: "incidents", detail: { label: "Incidents", iconClass: "oj-ux-ico-fire" } },
    //   { path: "customers", detail: { label: "Customers", iconClass: "oj-ux-ico-contact-group" } },
    //   { path: "about", detail: { label: "About", iconClass: "oj-ux-ico-information-s" } },
    //   { path: "navbar", detail: { label: "Navbar", iconClass: "oj-ux-ico-information-s" } }
    // ];



    // const router = new CoreRouter(navDataSource, {
    //   urlAdapter: new UrlParamAdapter()
    // });
    // router.sync();

    // this.moduleAdapter = new ModuleRouterAdapter(router);

    // this.selection = new KnockoutRouterAdapter(router);
    // this.navDataProvider = new ArrayDataProvider(navDataSource.slice(1), {keyAttributes: "path"});


  }

  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  connected(): void {
    AccUtils.announce("Incidents page loaded.");
    document.title = "Incidents";
    // implement further logic if needed
  }

  /**
   * Optional ViewModel method invoked after the View is disconnected from the DOM.
   */
  disconnected(): void {
    // implement if needed
  }

  /**
   * Optional ViewModel method invoked after transition to the new View is complete.
   * That includes any possible animation between the old and the new View.
   */
  transitionCompleted(): void {
    // implement if needed
  }
}

export = IncidentsViewModel;
