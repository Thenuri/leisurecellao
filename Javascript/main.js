
// ----------------------------------------------donation page validation----------------------------------------------------------------------------
function inputValidation(){
    var name = document.getElementById("in_name").value;
    var address = document.getElementById("address").value;
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
  if(!address.match(addr_pattern)){
    alert("Please enter a valid address");
    document.getElementById("address").focus();
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
    alert("Please select expiration month of your card");
    document.getElementById("monthInput").focus();
    return;
  }

  if(!pinNumber.match(pin_pattern)){
    alert("Please enter a valid pin number(cvc)");
    document.getElementById("CVC").focus();
    return false;
  }


  alert("Thank you so much for your contribution!")

  clearDonation();
  
}
 
function clearDonation(){
  document.getElementById("donation").reset();

}


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
let formData = {
choice: "",
noOfAdults: "",
noOfChildren: "",
Annualpass: "",
Duration: "",
tokens: ""
}

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
    
    formData.choice = choice;
    formData.noOfAdults = noOfAdults;
    formData.noOfChildren = noOfChildren;
    formData.Annualpass = Annualpass;
    formData.Duration = Duration;
    formData.tokens = tokens;



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
      durationPrice = (noOfAdults + noOfChildren) * fduration_price[parseInt(Duration)];//extra price for duration
      tprice += durationPrice;
      break;
    case 1:
      tprice = ticket_price[2] * noOfAdults + ticket_price[3] * noOfChildren;
      durationPrice = (noOfAdults + noOfChildren) * lduration_price[parseInt(Duration)];//extra price for duration
      tprice += durationPrice;
      break;
    case 2:
      tprice = ticket_price[4] * Annualpass ;
      ticket.af_price = tprice;// calculating the  foreign annual passs ticket cost 
      break;
    case 3:
      tprice = ticket_price[5] * Annualpass;
      ticket.al_price = tprice;// calculating the  foreign annual passs ticket cost 
      break;
      default:  
    }
    

   
    ticket.food_cost = tokens * extras_price[0]
    tprice = tprice + ticket.food_cost;
    document.getElementById("currentcost_Order").innerHTML = tprice.toFixed(2);


    ticket.no_of_adults = noOfAdults
    ticket.no_of_children = noOfChildren
    ticket.af_value = Annualpass 

    console.log(ticket);
  }
  // add to current order into a table 
document.getElementById("AddOrders").onclick = function(){
  if(tprice>0){
      document.getElementById("tableOrder").style = "display: inlineblock;"
    }
    
  var tprice = parseFloat(document.getElementById("currentcost_Order").innerHTML);
  if(tprice === 0){
    alert("you cannot place an order without any items selected.");
    return;
  }
  var Duration = document.getElementById("cmbDuration");
   if ((Duration.value === "") && (Duration.disabled === false)){
    alert("choose your Duration!");
    return;

  }

   var grand_total = parseFloat(document.getElementById("GrandTotal").innerHTML);
   var total_ftokens = parseInt(document.getElementById("Ftokens").innerHTML);
   var grand_token = parseFloat(document.getElementById("pFtokens").innerHTML);
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
  
  var tbody = document.getElementById("mainOrder");
  
 
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
  document.getElementById("Ftokens").innerHTML = total_ftokens.toFixed(2);
  document.getElementById("Ftokens").style = "text-align:center";
 

  grand_token = grand_token + ticket.food_cost;
  document.getElementById("pFtokens").innerHTML = grand_token.toFixed(2);
  document.getElementById("pFtokens").style = "text-align:right";

    

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
  document.getElementById("GrandTotal").innerHTML = grand_total.toFixed(2);
  document.getElementById("GrandTotal").style = "text-align:center";

   
  document.getElementById("currentcost_Order").innerHTML = grand_total.toFixed(2);

  document.getElementById("overalltotal").innerHTML = grand_total.toFixed(2);

  calculateLoyaltyPoints();
  resetPurchaseForm();
  }

function resetPurchaseForm(){
  document.getElementById("book_tickets").reset();
  document.getElementById("currentcost_Order").innerHTML = "0.00";
  }
    //delete entire table values values and reset to blank when user clicks place order button
  document.getElementById("placeOrder").onclick = function(){
    var overallOrder = parseFloat(document.getElementById("overalltotal").innerHTML);
    if(overallOrder != 0){
    var Table = document.getElementById("mainOrder");
    Table.innerHTML="";
    document.getElementById("GrandTotal").innerHTML = "0.00";
    document.getElementById("overalltotal").innerHTML = "0.00";
    document.getElementById("Ftokens").innerHTML = "0";
    document.getElementById("pFtokens").innerHTML = "0.00";
    document.getElementById("alpasses").innerHTML = "0";
    document.getElementById("palpasses").innerHTML = "0.00";
    document.getElementById("afpasses").innerHTML = "0";
    document.getElementById("pafpasses").innerHTML = "0.00";
    ticket.al_price = 0;
    ticket.af_price = 0;
   
    alert("Thank you for your purchase of tickets or additional items. We look forward to seeing you again soon.")
    }
    else{
      alert("You cannot place an order without any items in the overall order. Please add one or more items to continue.")
    }
  }

function calculateLoyaltyPoints() {
  var selectValue = parseInt(document.getElementById("se_activity").value);
  var noOfAdults = parseInt(document.getElementById("no1").value);
  var noOfChildren = parseInt(document.getElementById("no2").value);
  var noAnnualPasses =parseInt(document.getElementById("Annual_Pasee").value);

  if(isNaN(noOfAdults)) {
    noOfAdults = 0;
  }
  if(isNaN(noOfChildren)) {
    noOfChildren = 0;
  }
  if(isNaN(noAnnualPasses)) {
    noAnnualPasses = 0;
  }

  var totalTickets = 0;
  switch(selectValue) {
    case 0:
    case 1:
      totalTickets = noOfAdults + noOfChildren;
      break;
    case 2:
    case 3:
      totalTickets = noAnnualPasses;
    break;
    }

  var noOfLoyaltyPoints = JSON.parse(localStorage.getItem(`loyality`));
  if(noOfLoyaltyPoints == null) {
    noOfLoyaltyPoints = 0;
  }
    
  if(totalTickets > 3) {
    noOfLoyaltyPoints += 20 * totalTickets;
  }

  localStorage.setItem("loyality",noOfLoyaltyPoints);
}


//calculate and store loyalty points and save it in the local storage


var totalLoyaltyPoints = 0;
var totalTickets = 0;
var loyaltyPoints = 0;

/*function calcLoyaltyPoints(){
  var choice = document.getElementById("se_activity").value;
  Annualpass= parseInt(Annualpass);
  choice = parseInt(choice);

  switch(choice){
    case 0:
    case 1:  
      totalTickets = ticket.no_of_adults+ ticket.no_of_children;
      addLoyaltyToLocalStorage();
      break;
    
    case 2:
      totalTickets = foreignap;
    case 3:  
        totalTickets =  localap ;
        addLoyaltyToLocalStorage();
        break;
 
  }
  console.log(totalTickets);
}*/
function addLoyaltyToLocalStorage() {
  if(totalTickets>3){
    loyaltyPoints = 20*totalTickets;
    totalLoyaltyPoints = totalLoyaltyPoints +loyaltyPoints;
    localStorage.setItem("loyality",totalLoyaltyPoints);
    }
}
function showLoyaltyPoints(){
  
  totalLoyaltyPoints = JSON.parse(localStorage.getItem(`loyality`));
 
  if(totalLoyaltyPoints>0){
      alert("Congratulations! You have earned "+  totalLoyaltyPoints + " loyalty points so far");
  }
  else{
      alert("Sorry! You don't have any loyalty points so far");
  }
}


function resetLocalStore() {
  localStorage.setItem("loyality", 0);
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
            no1.classList.remove("hidden");
            no1.disabled = false;
            no2.classList.remove("hidden");
            no2.disabled = false;
            annualPasee.classList.add("hidden");
            annualPasee.disabled = true;
            break;

        case '2':
        case '3':
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
  
// this function will input the values when the addtofavorite is clicked and get the values when the odderfavorite is clicked 

let formElement = document.getElementById("book_tickets");
 function addToFavorite() {
    if(formElement.checkValidity()) {



      localStorage.setItem("favorite", JSON.stringify(formData));
      alert("Your order has been saved as a favorite order")
    } else {
      alert("Fill all fields")
    }
}

function orderFromFav() {
  favoriteOrder =  localStorage.getItem("favorite");
  if (favoriteOrder !== null) {
    formData = JSON.parse(favoriteOrder);

    
      
    document.getElementById("se_activity").value = formData.choice
    document.getElementById("no1").value = formData.noOfAdults
    document.getElementById("no2").value = formData.noOfChildren
    document.getElementById("Annual_Pasee").value = formData.Annualpass
    document.getElementById("cmbDuration").value = formData.Duration
    document.getElementById("Tokens").value = formData.tokens
    calculate();
    alert("Your order has been retrevied")

    
    
  } else {
    alert("There is no favorite order")
  }
}

// adding a top button

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
