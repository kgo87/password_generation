// Assignment Code
var generateBtn = document.querySelector("#generate");

// List of numbers:
var numbers = [0,1,2,3,4,5,6,7,8,9]
// List of lower case letters:
var letters_lower_case = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
// List of upper case letters:
var letters_upper_case = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
// List of special characters:
var chars = ["\'\'","\"\",","+",",","_","`","{","|","}","-",".",":","%",")","@","[","","]","^",";","<","=",">","?","*","!","#","$","&","(","~"]


function generatePassword(){
  // Prompt a user for a password length
  var passwordLength = prompt("Please enter the number of characters for your password. The number should be between 8 and 128.");
  // if passwordLength doesn't match the length range, then alert the user that they need to provide a correct length
  if (!(passwordLength >=8 ||passwordLength <=128)){
    alert("Wrong number of characters. Please try again.")
    return;
  }

  
  // Save user choice for using numbers, letters and characters into variables
  var isUsingNumbers = confirm("Would you like your password to contain numbers?");
  var isUsingLowerCase = confirm("Would you like your password to contain lowercase letters?");
  var isUsingUpperCase = confirm("Would you like your password to contain uppercase letters?");
  var isUsingSpecialChar = confirm("Would you like your password to contain special characters?");
  var choices = [isUsingNumbers,isUsingLowerCase,isUsingUpperCase,isUsingSpecialChar];



  // Count the number of groups of symbols that user has selected and store that value in a variable
  function countUserChoices(){
    var count_choices = 0;
    for (i=0;i<choices.length-1;i++){
      if (choices[i]){
        count_choices+=1;
      }
    }
    return count_choices;
  }
  var numberOfChoices = countUserChoices();

  // Alert the user if they didn't select any group of elements
  if (numberOfChoices === 0){
    alert("Please make a selection");
    return;
  }


  // Calculate the number of elements to be used for a password from each group of symbols
  var numOfElementsFromEachGroup = Math.floor(passwordLength/numberOfChoices);

  // Ramdomly select the elements from each group of symbols
  function getElementFromGroup(arr){
    var selection = [];
    for (i=0;i<numOfElementsFromEachGroup;i++){
      selection[i] = arr[Math.floor(Math.random()*arr.length)];
    }
    console.log(selection);
    return selection.join("");
  }
  
  // Create collection of selections and respective groups of symbols
  var choiceSymbolGroupPair = {
    isUsingNumbers: numbers,
    isUsingLowerCase: letters_lower_case,
    isUsingUpperCase: letters_upper_case,
    isUsingSpecialChar: chars
  };
  
  // For every selected group of symbols, call the function that randomly selects the symbols and append them to a password list.
  // Additionally, add the symbols from the selected group to a global list of symbols
  function createPassword(){
    var password_list = "";
    var globalCombinedListOfElements = [];
    for (const [key, value] of Object.entries(choiceSymbolGroupPair)){
      if (key) {
        password_list+= getElementFromGroup(value);
        globalCombinedListOfElements = [...globalCombinedListOfElements,...value];
      }
    }
    while (password_list.length < passwordLength){
      password_list += globalCombinedListOfElements[Math.floor(Math.random()*globalCombinedListOfElements.length)];
    }
    return password_list
  }
  var createdPassword = createPassword();

   
  // Shuffle the symbols in the final version of the password
  var password = createdPassword.split('').sort(function(){return 0.5-Math.random()}).join('');

  return password;


}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
