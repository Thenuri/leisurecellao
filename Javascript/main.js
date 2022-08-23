
// ----------------------------------------------donation page validation----------------------------------------------------------------------------
function inputValidation(){
    var name = document.getElementById("in_name").value;
    var email = document.getElementById("email").value;
    var cardNumber = document.getElementById("cardNum").value;
    var pinNumber = document.getElementById("CVC").value;
    var cardholderName = document.getElementById("cardHolder").value;
    var mothInput = document.getElementById("monthInput").value;
    
    var fixedDonatons = document.getElementById("fixedDonatons").value;
    
    var email_pattern = /^[A-Za-z\d\.\_]+\@[A-Za-z\d\.\-]+\.[A-Za-z]{2,5}$/;
    var name_pattern = /^\b(?!.*\.{2})[a-zA-Z.]+(?:\s[a-zA-Z.]+)\b$/;
    var addr_pattern = /^[A-Za-z\d\.\-\/\#\,\s]+$/;
    var card_pattern = /^[0-9]{16,16}$/;
    var pin_pattern = /^[0-9]{3,3}$/;
    var holder_pattern = /^\b(?!.*\.{2})[a-zA-Z.]+(?:\s[a-zA-Z.]+)\b$/; 

  if(!name.match(name_pattern)){
     
     alert("Please enter a valid name");
     document.getElementById("in_name").focus();
    return false;
  }
  if(fixedDonatons == ""){
    alert("Please select the donation amout");
    return;
  }

  if(!email.match(email_pattern)){
      alert("Please enter a valid email");
      document.getElementById("email").focus();
      return false;
  }
  if(!cardholderName.match(holder_pattern)){
      
    alert("Please enter a valid cardholder name");
    document.getElementById("cardHolder").focus();
    return false;
  }

  if(!cardNumber.match(card_pattern)){
      alert("Please enter a valid cardnumber");
      document.getElementById("cardNum").focus();
      return false;
  }

  if(mothInput == ""){
    alert("Please select expiration month of your credit/debit card");
    document.getElementById("monthInput").focus();
    return;
  }

  if(!pinNumber.match(pin_pattern)){
    alert("Please enter a valid pin number(cvc)");
    document.getElementById("CVC").focus();
    return false;
  }


  alert("Thank you so much for your contribution! The receipt will be sent to your email address.")

  clearDonatiom();
  
}
 
function clearDonatiom(){
  document.getElementById("donation_form").reset();

}

// fixed donation amounts that are customized and multi-selectable.
class CustomSelect {
    constructor(originalSelect) {
      this.originalSelect = originalSelect;
      this.customSelect = document.createElement("div");
      this.customSelect.classList.add("select");
  
      this.originalSelect.querySelectorAll("option").forEach((optionElement) => {
        const itemElement = document.createElement("div");
  
        itemElement.classList.add("select__item");
        itemElement.textContent = optionElement.textContent;
        this.customSelect.appendChild(itemElement);
  
        if (optionElement.selected) {
          this._select(itemElement);
        }
  
        itemElement.addEventListener("click", () => {
          if (
            this.originalSelect.multiple &&
            itemElement.classList.contains("select__item--selected")
          ) {
            this._deselect(itemElement);
          } else {
            this._select(itemElement);
          }
        });
      });
  
      this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
      this.originalSelect.style.display = "none";
    }
  
    _select(itemElement) {
      const index = Array.from(this.customSelect.children).indexOf(itemElement);
  
      if (!this.originalSelect.multiple) {
        this.customSelect.querySelectorAll(".select__item").forEach((el) => {
          el.classList.remove("select__item--selected");
        });
      }
  
      this.originalSelect.querySelectorAll("option")[index].selected = true;
      itemElement.classList.add("select__item--selected");
    }
  
    _deselect(itemElement) {
      const index = Array.from(this.customSelect.children).indexOf(itemElement);
  
      this.originalSelect.querySelectorAll("option")[index].selected = false;
      itemElement.classList.remove("select__item--selected");
    }
  }
  
  document.querySelectorAll(".custom-select").forEach((selectElement) => {
    new CustomSelect(selectElement);
  });


  //------------------------------------------------------------booking page -----------------------------------------------------------------------------------------------



  //price for tickets and for food tokens ()
  let tickets={
    price:[5000,2500,1000,500,15000,4500],
    lduration:[0,250,500,1000],
    fduration:[0,500,1000,2000],
    extra:[500]
  }

//global scope variables for the  price calculations
  var ticket = {
    tcost : 0,
    food_cost : 0,  // food token cost
    no_of_adults : 0,
    no_of_children :0,
    spCost :0,
    af_value:0,
    al_value:0,
    al_price:0,
    af_price:0,

  
};

  function calculate(){
    var ticket_price = tickets["price"];
    var lduration_price =tickets["lduration"];
    var fduration_price = tickets["fduration"];
    var extras_price = tickets["extra"];

    var tprice = 0;
   
  
    var choice = document.getElementById("se_activity").value;
    var noOfAdults = document.getElementById("no1").value;
    var noOfChildren = document.getElementById("no2").value;
    var Annualpass = document.getElementById("Annual_Pasee").value;
    var Duration = document.getElementById("cmbDuration").value;
    var tokens = document.getElementById("Tokens").value;



      if(choice == ""){
        alert("Please select your choice first ");
        document.getElementById("se_activity").focus();
        return;
      }
      if(Duration == "") {
        Duration = "0";
      }
      if(noOfAdults == ""){
        noOfAdults = 0;
        
      }
      else{
        
        noOfAdults = parseInt(noOfAdults);
    
      }
      if(noOfChildren == "" ){
        noOfChildren = 0;
      }
      else{
        noOfChildren = parseInt(noOfChildren);
    
      }
      if(tokens == ""){
        tokens = 0;
        
      }
      else{
        tokens = parseInt(tokens);
    
      }
    
    choice = parseInt(choice);
    //calculating the ticket price  for foreign ,local and annual passes(AND THE DURATION CALCULATION IS ALSO HAS BEEN DONE IN THE228,229,232,233 LINES)
    let durationPrice;
    switch(choice){
      case 0:
        tprice = ticket_price[0] * noOfAdults + ticket_price[1] * noOfChildren;
        durationPrice = (noOfAdults + noOfChildren) * fduration_price[parseInt(Duration)];
        tprice += durationPrice;
        break;
      case 1:
        tprice = ticket_price[2] * noOfAdults + ticket_price[3] * noOfChildren;
        durationPrice = (noOfAdults + noOfChildren) * lduration_price[parseInt(Duration)];
        tprice += durationPrice;
        break;
      case 2:
        tprice = ticket_price[4] * Annualpass ;
        ticket.af_price = tprice;
        break;
      case 3:
        tprice = ticket_price[5] * Annualpass;
        ticket.al_price = tprice;
        break;
      default:  
    }
    

    //add extra price if tokens has been selected
    ticket.food_cost = tokens * extras_price[0]
    tprice = tprice + ticket.food_cost;
    document.getElementById("currentcost_Order").innerHTML = tprice.toFixed(2);


    ticket.no_of_adults = noOfAdults
    ticket.no_of_children = noOfChildren
  }
  // add to current order into a table 
  document.getElementById("AddOrders").onclick = function(){

    if(tprice>0){
      document.getElementById("tbl_order").style = "display: inlineblock;"
    }
    
    var tprice = parseFloat(document.getElementById("currentcost_Order").innerHTML);
    if(tprice == 0){
      alert("you cannot place an order without any items selected.");
      return;
    }
  var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
  var total_ftokens = parseInt(document.getElementById("thFtokens").innerHTML);
  var grand_token = parseFloat(document.getElementById("pthFtokens").innerHTML);
  var total_fapasses = parseInt(document.getElementById("afpasses").innerHTML);
  var grand_fpasses = parseFloat(document.getElementById("pafpasses").innerHTML);
  var total_lapasses = parseInt(document.getElementById("alpasses").innerHTML);
  var grand_lpasses = parseFloat(document.getElementById("palpasses").innerHTML);
  var choice = parseInt(document.getElementById("se_activity").value);

  var foreignap =0;
  var localap =0;


  switch(choice){
    case 2:
      foreignap = parseInt(document.getElementById("Annual_Pasee").value);
      break;
    case 3:
      localap = parseInt(document.getElementById("Annual_Pasee").value);
      break;
    default:  
  }
  var foodtokens = document.getElementById("Tokens").value;

  if(foodtokens == ""){
    foodtokens = 0;
    
  }
  else{
    foodtokens= parseInt(foodtokens);

  }
  var ctrl_choice = document.getElementById("se_activity");
  var choice_txt = ctrl_choice.options[ctrl_choice.selectedIndex].text;

  var ctrl_duration = document.getElementById("cmbDuration");
  var duration_txt = ctrl_duration.options[ctrl_duration.selectedIndex].text; 


  var total = tprice;
  
  var tbody = document.getElementById("tbody_order");
  
 
  if(ticket.no_of_adults>0 || ticket.no_of_children>0){

    var trow = tbody.insertRow(-1)

    td1 = trow.insertCell(0);
    td1.innerHTML = choice_txt;
   
    td2 = trow.insertCell(1);
    td2.innerHTML=document.getElementById("no1").value;
    td2.style = "text-align:center";

    td3 = trow.insertCell(2);
    td3.innerHTML=document.getElementById("no2").value;
    td3.style = "text-align:center";

    
    td4 = trow.insertCell(3);
    td4.innerHTML = duration_txt;
    td4.style = "text-align:center";
    

    td5 = trow.insertCell(4);
    td5.innerHTML=total.toFixed(2);
    td5.style = "text-align:right";

    td6 = trow.insertCell(5);
    td6.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'>  </a>";
   
  }
  total_ftokens = total_ftokens + foodtokens;
  document.getElementById("thFtokens").innerHTML = total_ftokens.toFixed(2);
  document.getElementById("thFtokens").style = "text-align:center";
 

  grand_token = grand_token + ticket.food_cost;
  document.getElementById("pthFtokens").innerHTML = grand_token.toFixed(2);
  document.getElementById("pthFtokens").style = "text-align:right";

    

  total_lapasses = total_lapasses + localap;
  document.getElementById("alpasses").innerHTML = total_lapasses.toFixed(2);
  document.getElementById("alpasses").style = "text-align:center";
  
  grand_lpasses = grand_lpasses + ticket.al_price;
  document.getElementById("palpasses").innerHTML = grand_lpasses.toFixed(2);
  document.getElementById("palpasses").style = "text-align:right";
  
  total_fapasses = total_fapasses + foreignap;
  document.getElementById("afpasses").innerHTML = total_fapasses.toFixed(2);
  document.getElementById("afpasses").style = "text-align:center";
  
  grand_fpasses = grand_fpasses + ticket.af_price;
  document.getElementById("pafpasses").innerHTML = grand_fpasses.toFixed(2);
  document.getElementById("pafpasses").style = "text-align:right";
  
  grand_total = grand_total + tprice;
  document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
  document.getElementById("thGrandTot").style = "text-align:center";

   
  document.getElementById("currentcost_Order").innerHTML = grand_total.toFixed(2);

  document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);


  resetPurchaseForm();
  calcLoyaltyPoints();
  }
  function resetPurchaseForm(){
    document.getElementById("book_tickets").reset();
    document.getElementById("currentcost_Order").innerHTML = "0.00";
  }
  // when the X button is clicked it will clear the recode
  
  function removeRecord(item){
    var result = confirm("Do you want to remove this record?");
    
    if(result == true){
        var table = document.getElementById("tbl_order");
        var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
        var total = parseFloat(item.parentElement.cells[5].innerHTML);
        grand_total = grand_total - total;
        document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
        document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
        table.deleteRow(item.parentElement.rowIndex);
    }
  }
  //delete entire table values values and reset to blank when user clicks place order button
document.getElementById("placeOrder").onclick = function(){
  var overallOrder = parseFloat(document.getElementById("overallGtotal").innerHTML);
  if(overallOrder != 0){
  var Table = document.getElementById("tbody_order");
  document.getElementById("thGrandTot").innerHTML = "0.00";
  document.getElementById("overallGtotal").innerHTML = "0.00";
  document.getElementById("thFtokens").innerHTML = "0";
  document.getElementById("pthFtokens").innerHTML = "0.00";
  document.getElementById("alpasses").innerHTML = "0";
  document.getElementById("palpasses").innerHTML = "0.00";
  document.getElementById("afpasses").innerHTML = "0";
  document.getElementById("pafpasses").innerHTML = "0.00";
  Table.innerHTML = "";
  alert("Thank you for your purchase of tickets or additional items. We look forward to seeing you again soon.")
  }
  else{
    alert("You cannot place an order without any items in the overall order. Please add one or more items to continue.")
  }
}
//calculate and store loyalty points and save it in the local storage

var grand_loyaltyPoints = 0;
var loyaltyPoints =0;
var totalTicket = 0;

function calcLoyaltyPoints(){
 
  
  totalTicket = totalTicket +  ticket.no_of_adults  + ticket.no_of_children;
  if(totalTicket > 3){
      loyaltyPoints = 20 * totalTicket;
      grand_loyaltyPoints = grand_loyaltyPoints + loyaltyPoints; 
      localStorage.setItem("loyality",grand_loyaltyPoints);
  }
}

/*when user clicks on the "Check loyalty points" button,
it shows total loyalty points that have earned by the user so far based on the overall order*/
function showLoyaltyPoints(){
  
  grand_loyaltyPoints = JSON.parse(localStorage.getItem(`loyality`));
 
  if(grand_loyaltyPoints>0){
      alert("Congratulations! You have earned "+  grand_loyaltyPoints + " loyalty points so far");
  }
  else{
      alert("Sorry! You don't have any loyalty points so far");
  }
} 
  //show hide input  field for number of adults and number of children when the local/foreign annual passes has been selected
  function displayControl() {
    let testSelect = document.getElementById("se_activity");
    let no1 = document.getElementById("no1");
    let no2 = document.getElementById("no2");
    let annualPasee = document.getElementById("Annual_Pasee");
    let selectedValue = testSelect.options[testSelect.selectedIndex].value;
    switch(selectedValue) {
        case '0':
        case '1':
            console.log("Called 1");
            no1.classList.remove("hidden");
            no1.disabled = false;
            no2.classList.remove("hidden");
            no2.disabled = false;
            annualPasee.classList.add("hidden");
            annualPasee.disabled = true;
            break;

        case '2':
        case '3':
              console.log("Called 2");
              annualPasee.classList.remove("hidden");
              annualPasee.disabled = false;
              no1.classList.add("hidden");
              no1.disabled = true;
              no2.classList.add("hidden");
              no2.disabled = true;
              break;
    }
}


// hide the duration and the food token input when the user select foreign/local annual passes
 
function Control() {
  let testSelect = document.getElementById("se_activity");
  let duration = document.getElementById("cmbDuration");
  let token = document.getElementById("Tokens");
  let selectedValue = testSelect.options[testSelect.selectedIndex].value;
  switch(selectedValue) {

      case '2':
      case '3':
            duration.classList.add("hidden");
            duration.disabled = true;
            token.classList.add("hidden");
            token.disabled = true;
            break;
      
      case '0':
      case '1':
            duration.classList.remove("hidden");
            duration.disabled = false;
            token.classList.remove("hidden");
            token.disabled = false;
            break;      
  }
}
  

// Local storage functions to save form data and refil when user click the add to favourite button


const formId = "book_tickets"; // ID of the form
const formDetector = `${formId}`; // Identifier used to identify the form
const saveButton = document.querySelector("#addFavourite"); // select save button
const retrieveButton = document.querySelector("#orderFavourite"); // selectretrieve button
const alertBox = document.querySelector(".alert"); // select alert display div
let form = document.querySelector(`#${formId}`); // select form
let formElements = form.elements; // get the elements in the form

/**
 * This function gets the values in the form
 * and returns them as an object with the
 * [formDetector] as the object key
 * 
 */
 const getFormData = () => {
  let data = { [formDetector]: {} }; // create an empty object with the formDetector as the key and an empty object as its value
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formDetector][element.name] = element.value;
    }
  }
  return data;
};

saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formDetector, JSON.stringify(data[formDetector]));
  const message = "Your order has been saved as a favorite . Thank you.";
  displayAlert(message);
};

/**
 * This function displays a message
 * on the page for 2 seconds
 *
 * 
 */
const displayAlert = message => {
  alertBox.innerText = message; // add the message into the alert box
  alertBox.style.display = "block"; // make the alert box visible
  setTimeout(function() {
    alertBox.style.display = "none"; // hide the alert box after 2 second
  }, 2000);
};


/**
 * This function refill the favourte order when user clicks order favourite button
 * with data from localStorage
 *
 */
 const formautoRefill = () => {
  if (localStorage.key(formDetector)) {
    const savedData = JSON.parse(localStorage.getItem(formDetector)); // get and parse the saved data from localStorage
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    const message = "Form has been refilled with saved data!";
    displayAlert(message);
    
  }
};


// auto refill the form when the retreive favourite button is clicked
retrieveButton.onclick = function(){
    formautoRefill(); 
    calculate();

}


 
 