/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
// import ArrayDataProvider = require("@oracle/oraclejet/ojarraydataprovider");
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import { ojTable } from 'ojs/ojtable';
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import "ojs/ojtrain";
import { ojTrain } from "ojs/ojtrain";
import 'ojs/ojtable';
import "ojs/ojlabel";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojvalidationgroup";
import "ojs/ojbutton";
import { ojValidationGroup } from "ojs/ojvalidationgroup";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { Model, Collection } from 'ojs/ojmodel';
import axios, { AxiosResponse } from 'axios';
class CustomersViewModel {
// readonly data=[
//   {id: 1, name:"manjusha",location:"Hyderabad",mobilenumber:"7032028739",emailid:"manjusha@gmail.com"},
//   {id:2, name:"Manisha",location:"Banglore",mobilenumber:"9502045389",emailid:"manishaa@gmail.com"},
//   {id:3, name:"navikanth",location:"Chennai",mobilenumber:"950345689",emailid:"navikanth@gmail.com"},
//   {id: 4, name:"nikhil",location:"Kolkata",mobilenumber:"6281962568",emailid:"nikhil@gmail.com"}];


readonly data=ko.observableArray();

readonly names=new ArrayDataProvider(this.data,{keyAttributes:"name"});
isFormReadonly: ko.Observable<boolean>;
selectedStepValue: ko.Observable<string>;
selectedStepLabel: ko.Observable<string>;
selectedStepFormLabel: ko.Observable<string>;
name: ko.Observable<string|undefined>;
email: ko.Observable<string|undefined>;
telephoneNumber: ko.Observable<string|undefined>;
stepArray: ko.ObservableArray<ojTrain.Step>;
updateLabelText: (event: CustomEvent) => void;
regExpValidator: AsyncRegExpValidator<string>;
emailRegExpValidator: AsyncRegExpValidator<string>;
// isRequirementMet:ko.Computed<boolean>;

//validate: (event: CustomEvent) => void;
update: (event: CustomEvent) => void;
confirm: (event: CustomEvent) => void;
// readonly isRequirementMet=ko.computed(()=>{
//   const selectedStepValue = this.selectedStepValue();
//   return  selectedStepValue=='stp1'||'stp3' ? true : false;
// });

  getCustomers(){
    fetch("http://localhost:3000/customers")
        .then(response=>{
         return response.json();
        }).then(json1 => {
          console.log(json1.data);
         this.data(json1.data);
        }) .catch(error => {
         console.error("Error fetching customer data:", error);
     });
 }


  constructor() {
    // this.getCustomers().then(response=>{
    //   this.data(response);
    //   console.log(response);
    // })
    this.getCustomers();

    this.name = ko.observable();
    this.email = ko.observable();
    this.telephoneNumber = ko.observable();
    this.selectedStepValue = ko.observable("stp1");
    this.selectedStepLabel = ko.observable("Step 1");
    this.selectedStepFormLabel = ko.observable("Please fill in your full name");
    this.isFormReadonly = ko.observable(false);
    this.stepArray = ko.observableArray<ojTrain.Step>([
      { label: "Your Name", id: "stp1" },
      { label: "Contact Information", id: "stp2" },
      { label: "Confirm Details", id: "stp3" },
    ]);

    // this. isRequirementMet=ko.computed(()=>{
    //   const selectedStepValue1 = this.selectedStepValue();
    //   console.log(selectedStepValue1);
    //   return  selectedStepValue1!=='stp1'||'stp3' ? true : false;
    // });
    // console.log(this.isRequirementMet());
    
    
    this.regExpValidator = new AsyncRegExpValidator({
      pattern: "[a-zA-Z ,.'-]{1,}",
      hint: "1 or more letters",
      messageDetail: "You must enter at least 1 letter",
    });
    
    this.emailRegExpValidator = new AsyncRegExpValidator({
      pattern: ".+@.+..+",
      hint: "email format",
      messageDetail: "Invalid email format",
    });

    this.updateLabelText = (event: CustomEvent) => {
      var train = document.getElementById("train") as ojTrain;
      let selectedStep = train.getStep(event.detail.value) as ojTrain.Step;
      console.log(selectedStep.id);
      
      // if (selectedStep != null) {
      //   this.selectedStepLabel(selectedStep.label);
      // }
      // if (selectedStep != null && selectedStep.id == "stp2") {
      //   this.selectedStepFormLabel("Please fill in your contact information");
      //   this.isFormReadonly(false);
      // } else if (selectedStep != null && selectedStep.id == "stp1") {
      //   this.selectedStepFormLabel("Please fill in your full name");
      //   this.isFormReadonly(false);
      // } else {
      //   this.selectedStepFormLabel("");
      //   this.isFormReadonly(true);
      // }
    };

    this.update = (event: CustomEvent) => {
      var train = document.getElementById("lineartrain") as ojTrain;
      let selectedStep = train.getStep(event.detail.value) as ojTrain.Step;
      if (selectedStep != null) {
        this.selectedStepLabel(selectedStep.label);
      }
      for (let i = 0; i <= this.stepArray().length - 1; i++) {
        var previousStepId = event.detail.previousValue;
        var step = this.stepArray()[i];
        if (step.id == selectedStep.id && i < this.stepArray().length - 1) {
          this.stepArray()[i + 1].disabled = false;
          step.messageType = undefined;
        }
        if (step.id == previousStepId) {
          step.messageType = "confirmation";
        }
      }
      if (selectedStep != null) {
        this.selectedStepLabel(selectedStep.label);
      }
      if (selectedStep != null && selectedStep.id == "stp2") {
        this.selectedStepFormLabel("Please fill in your contact information");
        this.isFormReadonly(false);
      } else if (selectedStep != null && selectedStep.id == "stp1") {
        this.selectedStepFormLabel("Please fill in your full name");
        this.isFormReadonly(false);
      } else {
        this.selectedStepFormLabel("");
        this.isFormReadonly(true);
      }

  };
  this.confirm = (event: CustomEvent) => {
    var train = document.getElementById("lineartrain") as ojTrain;
    console.log(train);
    let finalStep = train.getStep("stp3") as ojTrain.Step;
    //The final step will have a confirmation message type icon
    if (finalStep != null) {
      finalStep.messageType = "confirmation";
      train.updateStep(finalStep.id, finalStep);
    }
  };

 

  //  //It is being called by the train to make sure the form is valid before moving on to the next step.
//    this.validate = (event: CustomEvent) => {
//     let nextStep = event.detail.toStep as ojTrain.Step;
//     let previousStep = event.detail.fromStep as ojTrain.Step;

//     var tracker = document.getElementById("tracker") as ojValidationGroup;
//     if (tracker == null) {
//       return;
//     }
//     var train = document.getElementById("train") as ojTrain;
//     if (tracker.valid === "valid") {
//       //The previous step will have a confirmation message type icon
//       previousStep.messageType = "confirmation";
//       train.updateStep(previousStep.id, previousStep);
//       //Now the clicked step could be selected
//       this.selectedStepValue(nextStep.id);
//       return;
//     } else {
//       console.log(train);
      
//       //The ojBeforeSelect can be cancelled by calling event.preventDefault().
//       event.preventDefault();
//       //The previous step will have an error message type icon
//       previousStep.messageType = "error";
//       train.updateStep(previousStep.id, previousStep);
//       // show messages on all the components
//       // that have messages hidden.
//       setTimeout(function () {
//         tracker.showMessages();
//         tracker.focusOn("@firstInvalidShown");
//       }, 0);
//       return;
//     }

    
//   }
}

  // nextStep = (): void => {
  //   const train: any = document.getElementById('lineartrain') as ojTrain;
  //   console.log(train);
  //   const next: string| null = train.getNextSelectableStep();
  //     if (next != null) {
  //       this.selectedStepValue(next);
  //       this.selectedStepLabel(train.getStep(next).label);
  //     }  
  // };
  
  nextStep = (): void => {
    console.log(this.selectedStepValue());
    
    const train: any = document.getElementById('lineartrain') as ojTrain;
    const tracker = document.getElementById("tracker") as ojValidationGroup;
    
    // Check if the tracker is valid
    if (tracker.valid === "valid") {
        const next: string| null = train.getNextSelectableStep();
        if (next != null) {
            this.selectedStepValue(next);
            this.selectedStepLabel(train.getStep(next).label);
        }  
    } else {
        // If validation fails, show error messages
        tracker.showMessages();
        tracker.focusOn("@firstInvalidShown");
    }
};

previousStep = (): void => {
  const train: any= document.getElementById('lineartrain') as ojTrain;
  const prev: string | null = train.getPreviousSelectableStep();
  if (prev != null) {
    this.selectedStepValue(prev);
    this.selectedStepLabel(train.getStep(prev).label);
  }
};


  
  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  connected(): void {
    AccUtils.announce("Customers page loaded.");
    document.title = "Customers";
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

export = CustomersViewModel;
function getCustomers() {
  throw new Error("Function not implemented.");
}

