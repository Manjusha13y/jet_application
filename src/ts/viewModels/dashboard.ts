import * as ko from "knockout";
import * as Bootstrap from "ojs/ojbootstrap";
import "ojs/ojknockout";
import "ojs/ojinputtext";
import 'ojs/ojformlayout';
import "ojs/ojselectsingle";
//import "ojs/ojselectcombobox";
import 'oj-c/select-multiple';
import "ojs/ojselectcombobox";
import "oj-c/input-number";



/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import 'ojs/ojvalidationgroup';
import { ojValidationGroup } from "ojs/ojvalidationgroup";
import 'oj-c/input-text';
import { CInputTextElement } from "oj-c/input-text";
import 'ojs/ojaccordion';
import 'ojs/ojradioset';
import 'ojs/ojlabel';
import 'ojs/ojbutton';
import "ojs/ojpopup";
import { ojPopup } from "ojs/ojpopup";
import 'oj-c/message-toast';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import Router = require("ojs/ojrouter");

import CoreRouter = require("ojs/ojcorerouter");
import KnockoutRouterAdapter = require("ojs/ojknockoutrouteradapter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");
// import 'ojs/ojtextarea';
class DashboardViewModel {
  messages: MutableArrayDataProvider<string, Record<string, any>>;
 result=ko.observable();

  readonly closeMessage = (event: CustomEvent) => {
   

    console.log("event trigerred is:",event);
    // let data = this.messages.data.slice();
    console.log(this.result());
    let data=this.result().slice();
    console.log(this.messages);
    const closeMessageKey = event.detail.key.toString();
    console.log(data);
    console.log(closeMessageKey);
    data = data.filter((message: any) => (message as any).id !== closeMessageKey);
    // this.messages.data = data;
    this.result(data);

    // const closeMessageKey = event.detail.key.toString();
    // console.log(closeMessageKey);

    // // Get the current messages array
    // const currentData = this.result() || [];
    // console.log(currentData)

    // // Filter out the message with the matching ID
    // const newData = currentData.filter((message: any) => message.id !== closeMessageKey);

    // // Update the observable with the filtered array
    // this.result(newData);

  };


  private readonly routes = [
    
    { path: "page1", detail: { label: "page1" } }
  
  ];

  // Create ADP with partial array, excluding first redirect route
  readonly dataProvider = new ArrayDataProvider(this.routes.slice(), {
    keyAttributes: "path",
  });

  router = new CoreRouter<Record<string ,any>>(this.routes,{
    urlAdapter: new UrlParamAdapter(),});


     // Create an observable to react to the current router state path
 readonly selection = new KnockoutRouterAdapter(this.router);

 navigateToPage1 = () => {
  this.router.go({ path: "page1"});
};

  
  firstname=ko.observable();
  lastname=ko.observable();
  mobilenumber=ko.observable();
  submit: ko.Observable<string>;
   selectGender = ko.observable();
  readonly selectVal=ko.observable();
  readonly selectStream=ko.observable();
  age=ko.observable();
  email=ko.observable();
  emailPatternValidator: ko.ObservableArray<AsyncRegExpValidator<string>>;
  readonly groupValid: ko.Observable<CInputTextElement<string>['valid']> =
  ko.observable('invalidHidden' as CInputTextElement<string>['valid']);

  
  private readonly Gender=[{value:'female',label:'female'},{value:'male',label:'Male'}];
  readonly browsersDp= new ArrayDataProvider(this.Gender, {keyAttributes:"value"});
  private readonly course= [{value:'java',label:'java'},{value:'python',label:'python'},{value:'react',label:'react'}]
  readonly courses=new ArrayDataProvider(this.course,{keyAttributes:"value"});

  readonly selectValText = ko.computed(() => {
    const selectVal = this.selectVal();
    return selectVal ? Array.from(selectVal).join(', ') : '';
  });
  
  // private readonly evtData = ko.observable('');
  // getEventData = (data: { [x: string]: { id: string; }; }): string => {
  //   let dataStr = '';
  //   for (let d in data) {
  //     if (data[d] && data[d].id) {
  //       dataStr += ' ' + d + ': ' + data[d]?.id;
  //     }
  //   }
  //   return dataStr;
  // };
  
  // appendData(data: string): void {
  //   let ss = this.evtData();
  //   ss = ss ? ss + '\n' : '';
  //   this.evtData(ss + data);
  // }

  readonly name = ko.observable("");
  readonly address = ko.observable("");
 openListener() {
  
    let popup = document.getElementById("popup1") as ojPopup;
    popup.open("#btnGo");
  }

  public cancelListener() {
    let popup = document.getElementById("popup1") as ojPopup;
    popup.close();
  }


  constructor() {
    this.router.sync();
    
    this.submit=ko.observable("not clicked yet");
     this.emailPatternValidator = ko.observableArray([
      new AsyncRegExpValidator({
        pattern:
          "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
        hint: 'enter a valid email format',
        messageDetail: 'Not a valid email format'
      })
    ]);

   // toast message

  

  this.messages = new MutableArrayDataProvider();


  }
//   submitForm(){
//    let firstname:any = this.firstname();
//    let  lastname:any = this.lastname();
//    let mobilenumber:any = this.mobilenumber();
//    let gender:any = this.selectGender();
//    let courses:any = this.selectValText();
//    let stream:any = this.selectStream();
//    let age:any = this.age();
//    let emailId:any = this.email();
//    if(firstname && gender && courses && stream && age && emailId){
//     let formData = {
//       firstname: firstname,
//       lastname:lastname,
//       mobilenumber:mobilenumber,
//       gender: gender,
//       courses:courses,
//       stream:stream,
//       age:age,
//       emailId: emailId
//     };
//     console.log(formData);
//     } else {
//       console.log("Please check your Data");
//   }
// }

editForm(){
    fetch("http://localhost:3000/formdata").then(response=>{
      return response.json();
})
    .then(json => {
      
      // this.formdetails(json);
      console.log(json.data.firstname);
      const details=json.data;
      console.log(details.selectVal)
      console.log(details.firstname);
      this.firstname(details.firstname);
      this.lastname(details.lastname);
      this.age(details.age);
      this.selectGender(details.selectGender);
      this.email(details.email);
      this.mobilenumber(details.mobilenumber);
      this.selectVal(new Set(details.selectVal));
      this.selectStream(details.selectStream);
    })
}


public submitForm = () => {
  //this._compareFieldsAddMessagesCustom(this.email(), this.email2());
  let valid = this._checkValidationGroup();
  if (valid) {
    // submit the form would go here
    // alert('everything is valid; submit the form');
    let firstname:any = this.firstname();
       let  lastname:any = this.lastname();
       let mobilenumber:any = this.mobilenumber();
       let gender:any = this.selectGender();
       let courses:any = this.selectValText();
       let stream:any = this.selectStream();
       let age:any = this.age();
       let emailId:any = this.email();
    let formData = {
            firstname: firstname,
            lastname:lastname,
            mobilenumber:mobilenumber,
            gender: gender,
            courses:courses,
            stream:stream,
            age:age,
            emailId: emailId
  }
  console.log(formData);
  fetch("http://localhost:3000/response", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then((response) => {
               return response.json();
            //   console.log(response);
            //  const responseMessage = response;
            //  this.addMessage( responseMessage);
                }).then(json=>{
                  console.log(json.message);
                  const responseMessage = json.message;
                  this.addMessage( responseMessage);
               
  
                const initialData: any[] | undefined = [];

                this.messages = new MutableArrayDataProvider(initialData, {
                  keyAttributes: 'id'
                });
              })
              
                

}
}
private addMessage(newMessage: Record<string, any>) {
  const currentData = this.messages.data.slice(); // Get a copy of the current data array
  console.log(currentData);
  this.result(currentData);
  const messageId = Date.now().toString(); // Generate a unique ID for the message
    currentData.push({ id: messageId, summary: newMessage }); // Add the new message to the array
  // currentData.push(newMessage); // Add the new message to the array
  this.messages.data = currentData; // Update the data in the MutableArrayDataProvider
}

private _checkValidationGroup() {
  var tracker = document.getElementById('tracker') as ojValidationGroup;
  if (tracker.valid === 'valid') {
    return true;
  } else {
    // show messages on all the components
    // that have messages hidden.
    tracker.showMessages();
    tracker.focusOn('@firstInvalidShown');
    return false;
  }
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
    AccUtils.announce("Dashboard page loaded.");
    document.title = "Dashboard";
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

export = DashboardViewModel;

function editForm() {
  throw new Error("Function not implemented.");
}

