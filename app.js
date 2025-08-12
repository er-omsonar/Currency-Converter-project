const BASE_URL = "https://api.frankfurter.app/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

// for(code in countryList){
//   console.log(code,countryList[code]);
// }

for(let select of dropdowns){
  for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    } else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });

}
const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>{
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }
   let fromCurr = document.querySelector(".from select").value;
  let toCurr = document.querySelector(".to select").value;

  const URL = `${BASE_URL}?amount=${amtVal}&from=${fromCurr}&to=${toCurr}`;
  let response = await fetch(URL);
  let data = await response.json();
   let rate = data.rates[toCurr];
   let finalAmount = rate
   msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
    
});
