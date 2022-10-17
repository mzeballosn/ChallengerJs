import {numbers,symbols,letters} from "./diccionario.js";
import { palabras } from "./palabras.js";
import { mensajes } from "./messages.js";

const paragraphPassword = document.getElementById('password');
const form = document.querySelector("#form");
const copy = document.getElementById("copy");

function getWords(){
  let arrayWords = [];
  for (let i = 0; i <  form.length.value; i++) {
    arrayWords.push(palabras[getRandomNumber(0, palabras.length - 1)].palabra);  
  }
  return arrayWords; 
}

function generatePassword(passwordLength, botonsitos) {
  const arrayOfArrays = [];

  if (botonsitos.letters) {
    arrayOfArrays.push(letters);
  }

  if (botonsitos.numbers) {
    arrayOfArrays.push(numbers);
  }

  if (botonsitos.symbols) {
    arrayOfArrays.push(symbols);
  }

  if(botonsitos.words){
    let data =  getWords();
    arrayOfArrays.push(data);
  }

  
  if(arrayOfArrays.length > 0){
      let strongPassword = [];
      for (let i = 0; i < passwordLength; i++) {
        const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)];
        const randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)];        
        strongPassword.push(randomCharacter);
      }
      strongPassword = strongPassword.join("");
      paragraphPassword.innerText = `${strongPassword}`;
  }else{
    setMessages(mensajes.requireIncluir);    
  }  
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}
 
function setMessages(message){
  let nota = document.createElement('p');
  nota.innerText = message;
  let notas = document.getElementById('notas');
  notas.replaceChildren(nota); 
}

copy.addEventListener("click",(event) => {
  event.preventDefault();
  let pass = document.getElementById("password");
  navigator.clipboard.writeText(pass.innerText)  
});

const words = document.getElementById("words");

words.addEventListener("change",(event)=>{
  event.preventDefault();  
  if(event.target.checked){
    if(form.length.value < 64){
      form.length.value = 64;          
    }    
    document.getElementById("rangeVal").innerHTML = form.length.value;     
  }    
  else{    
    form.length.disabled = false;
    document.getElementById("rangeVal").innerHTML = form.length.value;    
    setMessages('');
  }  

  getWords();
});

form.length.addEventListener("input",(event) => {
  event.preventDefault();  
  if(form.words.checked){
     if(event.target.value < 64){
        document.getElementById("rangeVal").innerHTML = event.target.value = 64; 
        setMessages(mensajes.words);
     }else{
      document.getElementById("rangeVal").innerHTML = event.target.value; 
     }
     
  }else{
     document.getElementById("rangeVal").innerHTML = event.target.value; 
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  paragraphPassword.innerText = `  `;
  
  const formElement = event.target;
  const passwordLength = formElement.length.value;  
  const checks = {
    letters: formElement.letters.checked,
    words: formElement.words.checked,
    numbers: formElement.numbers.checked,
    symbols: formElement.symbols.checked,
  };

  generatePassword(passwordLength, checks);
  
});

window.addEventListener("DOMContentLoaded",() => {
  if(document.readyState == 'loading'){
    if(form.words.checked){
      form.length.disabled=true;
      setMessages(mensajes.words);      
    }else{
      form.length.disabled=false;      
    }
  }
  
   
});