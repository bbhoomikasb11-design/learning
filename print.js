let title = document.querySelector("#title");
let body = document.body;

let btn=document.querySelector(".btn");
let bton=document.querySelector(".bton")
btn.addEventListener("click",()=>{
   title.textContent = "Text Changed!";

});
btn.addEventListener("click", () => {
  title.classList.toggle("highlight");
});

bton.addEventListener("click", () => {
  body.classList.toggle("bg-color");
});
https://t.co/FR0OyhsU94