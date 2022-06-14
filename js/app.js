const startStopBtn = document.getElementById('start-stop-btn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

const showFocusBreak = document.getElementById('show-focus-break');

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
let taskList = [];
let i = 0;

const showTasksList = document.getElementById('show-tasks-list');


let ticking = new Audio('../sounds/Timer-clicking-sound.mp3');
let ring = new Audio('../sounds/Alarm-ringtone.mp3');



let minutes = 25;
let seconds = 0;

let drawTimerInterval;

let stint = 0;
let roundCount = 1;

const round = document.getElementById('stint');

function startStopBtnControl(){
    showFocusBreak.innerText = "Focus!";
    startStopBtn.classList.toggle('pause');
    if(startStopBtn.classList.contains('pause')){
        drawTimerInterval = setInterval(drawTimer, 1000);
    }
    if(startStopBtn.classList.contains('pause') == false){
        clearInterval(drawTimerInterval);
        ticking.pause();
        ring.pause();
    }
    
}

function drawTimer(){
    if(seconds == 0){
        minutes--;
        seconds = 60;
    }
    seconds--;
    if(minutes >= 10){
        minutesDisplay.innerText = minutes;
    }else{
        minutesDisplay.innerText = `0${minutes}`; 
    }

    if(seconds >= 10){
        secondsDisplay.innerText = seconds;
    }else{
        secondsDisplay.innerText = `0${seconds}`;
    }

    if(minutes == 0 && seconds == 0){
        stint++;
        if(stint % 2 == 0){
            minutes = 25;
            seconds = 0;
            showFocusBreak.innerText = "Focus!";

            
        }else{
            breakTime();
        }
        
    }

    makeSounds();
    
}

function countDown(){
    startStopBtnControl();
}

function breakTime(){
    if(minutes == 0 && seconds == 0){
        minutes = 5;
        seconds = 0;
        showFocusBreak.innerText = "Break";
        roundCount++;
        round.innerText = roundCount;
    }
}

function makeSounds(){
    if(minutes == 0 && seconds <= 10){
        ticking.play();
        if(minutes == 0 && seconds <= 3){
            ring.play();
        }
    }
    else if(seconds == 0){
        ticking.pause();
        ticking.currentTime = 0;
        ring.pause();
        ring.currentTime = 0;
    }
}



startStopBtn.addEventListener('click', countDown);

function addTask(){

    if(taskInput.value != ""){
        taskList.push(taskInput.value);

        const btnCompleted = document.createElement('button');
        btnCompleted.classList.add('task-completed');
        btnCompleted.setAttribute('id', i);
        const fontCompleted = document.createElement('i');
        fontCompleted.classList.add('fa');
        fontCompleted.classList.add('fa-check');
        fontCompleted.setAttribute('id', i);

        btnCompleted.append(fontCompleted);
        
        const liElement = document.createElement('li');
        liElement.innerText = taskList[i];
        liElement.setAttribute('id', i);
        showTasksList.append(liElement);
        liElement.append(btnCompleted);
        

        btnCompleted.addEventListener('click', completeTask);
        
        i++;
    }
    taskInput.value = "";
    
    
}

function completeTask(e){
    e.target.classList.toggle('completed');

}



addTaskBtn.addEventListener('click', addTask);

{/* <button class="task-completed"><i class="fa fa-check" aria-hidden="true"></i></button> */}