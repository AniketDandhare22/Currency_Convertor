console.log("setting up the convetor");
let baseUrl = "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";
let Ans = document.querySelector(".ans");
const Data = async (currency) => {
    let response = await fetch(baseUrl);
    let info = await response.json();
    return info.eur[currency];
}

let fromCurr = document.querySelector("#form");
let toCurr = document.querySelector("#to");

let exlogo= document.querySelector("#exlogo");
exlogo.addEventListener("click",()=>{
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp; 
    let flag1 = fromCurr.parentElement.querySelector("img");
    let flag2 = toCurr.parentElement.querySelector("img");
    let temp2 = flag1.src;
    flag1.src = flag2.src;
    flag2.src = temp2;

})

let dropDown = document.querySelectorAll(".flagin select");
for (let select of dropDown) {
    for (let code in countryList) {
        let newopt = document.createElement("option");
        newopt.innerHTML = code.toUpperCase();
        if (select.name === "from" && code === "usd") {
            newopt.selected = "selected";
        } else if (select.name === "to" && code === "inr") {
            newopt.selected = "selected";
        }

        select.append(newopt);
    }
    select.addEventListener("change", (e) => {
        updateflag(e.target);
    })
}

const updateflag = (element) => {
    let CCode = countryList[element.value.toLowerCase()];
    let newFlag = `https://flagsapi.com/${CCode}/flat/64.png`;
    let newimage = element.parentElement.querySelector("img");
    newimage.src = newFlag;
}

let btn = document.querySelector(".convert");

btn.addEventListener("click", async (eve) => {
    eve.preventDefault();
    let amount = document.querySelector(".inputData");
    let AmVal = amount.value;
    if (AmVal < 1 || AmVal === "") {
        amount.value = "1";
        AmVal = 1;
    }
    console.log(AmVal);
    let FromRate = fromCurr.value;
    let ToRate = toCurr.value;
    let fromRateValue = await Data(FromRate.toLowerCase());
    let toRateValue = await Data(ToRate.toLowerCase());
    Ans.innerHTML = `Converting (${(fromRateValue/fromRateValue*AmVal).toFixed(2)})${FromRate} = (${(toRateValue/fromRateValue*AmVal).toFixed(2)})${ToRate}`;
});

btn.addEventListener("mouseover" , ()=>{
    let BgImg = document.querySelector(".base");
    BgImg.style.filter = "blur(1px)" ;
})

btn.addEventListener("mouseout" , ()=>{
    let BgImg = document.querySelector(".base");
    BgImg.style.filter = "blur(7px)" ;
})