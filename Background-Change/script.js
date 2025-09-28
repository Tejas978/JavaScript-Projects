let body = document.querySelector("body")
let buttons = document.querySelectorAll(".boxes")
buttons.forEach((boxes)=>{
    boxes.addEventListener('click', (e)=>{
        if(e.target.id == "red"){
            body.style.backgroundColor = e.target.id
        }
        if(e.target.id == "blue"){
            body.style.backgroundColor = e.target.id
        }
        if(e.target.id == "green"){
            body.style.backgroundColor = e.target.id
        }
        if(e.target.id == "yellow"){
            body.style.backgroundColor = e.target.id
        }
      
    })
  })