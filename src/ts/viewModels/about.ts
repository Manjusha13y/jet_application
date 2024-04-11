/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import { whenDocumentReady } from "ojs/ojbootstrap";
import ArrayListDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojlistview";
import "ojs/ojavatar";
import "ojs/ojlistitemlayout";
import "ojs/ojknockout";
import "ojs/ojformlayout";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import * as ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";
import "ojs/ojactioncard";
// import "jet-composites/demo-profile-card-layout/loader";
class AboutViewModel {
  readonly size=ko.observable(6);
  readonly data=[
    {
       id:1,
       name:'Manjusha',
       title:'working on oracle jet',
       image:"https://img.freepik.com/free-photo/html-css-collage-concept-with-person_23-2150062008.jpg?w=740&t=st=1711615600~exp=1711616200~hmac=dbbd44a1c230576cff2687a212366824b0d659628488f2974bf2bd6d1a7e847c",
    },
    {
      id:2,
      name:'Manisha',
      title:'working on AI',
      image:"https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg?w=740&t=st=1711615861~exp=1711616461~hmac=9b45b9d78cdd56fab6e2a46e4c212b580bf0bd5f38134f82b3a5993be0dad688",

    },
    {
      id:3,
      name:'Nikhil',
      title:'working on OIC',
      image:"https://img.freepik.com/premium-photo/virtual-cloud-computing-tablet-hand-cloud-computing-is-system-sharing-download-upload-big-data-information_50039-1490.jpg?w=740",
    },
    {
      id:4,
      name:'Navikanth',
      title:'working on AI',
      image:"https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg?w=740&t=st=1711615861~exp=1711616461~hmac=9b45b9d78cdd56fab6e2a46e4c212b580bf0bd5f38134f82b3a5993be0dad688",
    },
    {
      id:3,
      name:'Nikhil',
      title:'working on OIC',
      image:"https://img.freepik.com/premium-photo/virtual-cloud-computing-tablet-hand-cloud-computing-is-system-sharing-download-upload-big-data-information_50039-1490.jpg?w=740",
    },
    {
      id:4,
      name:'Navikanth',
      title:'working on AI',
      image:"https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg?w=740&t=st=1711615861~exp=1711616461~hmac=9b45b9d78cdd56fab6e2a46e4c212b580bf0bd5f38134f82b3a5993be0dad688",
    },
    {
      id:3,
      name:'Nikhil',
      title:'working on OIC',
      image:"https://img.freepik.com/premium-photo/virtual-cloud-computing-tablet-hand-cloud-computing-is-system-sharing-download-upload-big-data-information_50039-1490.jpg?w=740",
    },
    {
      id:4,
      name:'Navikanth',
      title:'working on AI',
      image:"https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg?w=740&t=st=1711615861~exp=1711616461~hmac=9b45b9d78cdd56fab6e2a46e4c212b580bf0bd5f38134f82b3a5993be0dad688",
    }
  ]
  readonly dataProvider = new ArrayListDataProvider(this.data, {
    keyAttributes: "id",
  });
  readonly layoutViewRadios = [
    { id: "card", icon: "oj-ux-ico-grid-view-small" },
    { id: "list", icon: "oj-ux-ico-list-round" },
  ];

  readonly activeLayout = ko.observable("card");
  readonly prevActiveLayout = ko.observable("card");
  private smQuery= ResponsiveUtils.getFrameworkQuery(
    ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
  );

  readonly isSmall = () => {
    
    
    
   
  };
  constructor() {

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
    AccUtils.announce("About page loaded.");
    document.title = "About";
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

export = AboutViewModel;