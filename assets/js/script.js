
new Chart(ctx,config) 
let currentMode = localStorage.getItem('theme')
var btnMode = document.getElementById('mode')

function applyMode(mode){
  if(mode=='dark'){
    btnMode.classList.remove('mode-white')
    btnMode.classList.add('mode-dark')
    document.getElementById('parent').classList.remove('white')
    document.getElementById('parent').classList.add('dark')
    document.getElementById('mode-icon').innerHTML = '🌞'
    localStorage.setItem("theme", 'dark');
    
    
  }else{
    btnMode.classList.remove('mode-dark')
    btnMode.classList.add('mode-white')
    document.getElementById('parent').classList.remove('dark')
    document.getElementById('parent').classList.add('white')
    document.getElementById('mode-icon').innerHTML ='<i id="icon" class="fa-solid fa-moon"></i>'
    localStorage.setItem("theme", 'white');
 
    
  }
}
applyMode(currentMode)
function modeConvert(){
   currentMode=='dark' ? currentMode='white':currentMode='dark'
   applyMode(currentMode)
   
}
    document.querySelector(".form").addEventListener("submit", (e) => {
        e.preventDefault();
      });
      let date = new Date();
      const days = ["Sun", "Mon", "Tus", "Wen", "Thur", "Fri"];
      const months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      document.querySelector(".date").textContent = `Today ${date.getDate()} ${
        months[date.getMonth()]
      }`;
      // get input value
      let input = document.querySelector(".input");
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          document.getElementById("search-btn").click();
        }
      });
      function disableInput() {
        var city = input.value;
      }     
      
      // changing in the mode
     