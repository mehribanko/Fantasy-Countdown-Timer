const inputContainer=document.getElementById('input-container');
const dateEle=document.getElementById('date-picker');
const countdownForm=document.getElementById('countdownForm');

const countdownEl=document.getElementById('countdown');
const inputTitle=document.getElementById('countdown-title');
const countdownButton=document.getElementById('countdown-button');
const timeElements=document.querySelectorAll('span');


const completeEl=document.getElementById('complete');
const completeInfo=document.getElementById('complete-info');
const completeButton=document.getElementById('complete-button');

let countdownTitle='';
let countdownDate='';
let countdownValue=Date;
let savedCountdown;

const second=1000;
const minute=1000*60;
const hour=minute*60;
const day=hour*24;

let countdownActive;

// Set a minimum date

const today=new Date().toISOString().split("T")[0];
dateEle.setAttribute('min', today);

// Functions
// Update DOM

function updateDom(){
    countdownActive=setInterval(()=>{
        const now=new Date().getTime();
    let distance=countdownValue-now;
    const days=Math.floor(distance/day);
    const hours=Math.floor((distance%day)/hour);
    const minutes=Math.floor((distance%hour)/minute);
    const seconds=Math.floor((distance%minute)/second);

    inputContainer.hidden=true;
    

    // If countdown ended, update complete

    if(distance<0){
        countdownEl.hidden=true;
        clearInterval(countdownActive);
        completeInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden=false;
    }else{
    inputTitle.textContent=`${countdownTitle}`;
    timeElements[0].textContent=`${days}`;
    timeElements[1].textContent=`${hours}`;
    timeElements[2].textContent=`${minutes}`;
    timeElements[3].textContent=`${seconds}`;
    completeEl.hidden=true;
    countdownEl.hidden=false;
  }
}, 1000);
    
}



function startCountdown(e){
    e.preventDefault();
    countdownTitle=e.srcElement[0].value;
    countdownDate=e.srcElement[1].value;
    savedCountdown={
        title: countdownTitle,
        date: countdownDate,
    };

    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    if(countdownDate===''){
        alert('Please, select a proper date for the countdown.');
    }else{
        // Get number value of input date
        countdownValue=new Date(countdownDate).getTime();
        updateDom();
    }
}



function reset(){
    countdownEl.hidden=true;
    inputContainer.hidden=false;
    clearInterval(countdownActive);
    countdownTitle='';
    countdownDate='';
    localStorage.removeItem('countdown');

}


function newCountdown(){
    completeEl.hidden=true;
    inputContainer.hidden=false;
    clearInterval(countdownActive);
    countdownTitle='';
    countdownDate='';
    localStorage.removeItem('countdown');

}



function restoreLocalStorage(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        savedCountdown=JSON.parse(localStorage.getItem('countdown'));
        countdownTitle=savedCountdown.title;
        countdownDate=savedCountdown.date;
        countdownValue=new Date(countdownDate).getTime();
        updateDom();
     }
}


// Event listeners

countdownForm.addEventListener('submit', startCountdown);
countdownButton.addEventListener('click', reset);
completeButton.addEventListener('click', newCountdown);

// On load, check local storage
restoreLocalStorage();