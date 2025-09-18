let slidervalue = document.getElementById("sliderValue")
let rare = document.getElementById("rare")
let inner = document.getElementById("inner")
let box = document.getElementById("box")
let box2 = document.getElementById("box2")
let box3 = document.getElementById("box3")
let box4 = document.getElementById("box4")
let gen_pass = document.getElementById("gen_pass")

slidervalue.textContent = rare.value
rare.addEventListener("input", () => {
    slidervalue.textContent = rare.value;
});
gen_pass.addEventListener("click",()=>{
    inner.value = generate();
})
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*"; 

function generate(){
    let genchar = ""
    let allchar = ""

    allchar += box.checked ? lowerChars : ""
    allchar += box2.checked ? upperChars : ""
    allchar += box3.checked ? allNumbers : ""
    allchar += box4.checked ? allSymbols : ""

    if(allchar == "" || allchar.length == 0){
        return genchar;
    }

    let i = 1;
    while(i<=rare.value){
        genchar += allchar.charAt(Math.floor(Math.random() * allchar.length));
        i++
    }
    return genchar;

}