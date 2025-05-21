//! Open and Back Feature...
function OpenBack() {
    var allElem = document.querySelectorAll(".elem");
    var fullElemPage = document.querySelectorAll(".fullElem");
    var fullElemPageBack = document.querySelectorAll(".fullElem .back");

    //! For Open the Page

    allElem.forEach(function (elem) {
        elem.addEventListener('click', function () {

            fullElemPage[elem.id].style.display = 'block';
        })
    })

    //! For Back

    fullElemPageBack.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none';
        })

    })
}
OpenBack()

//! To Do List Completed...
function ToDoList() {


    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }

    function renderTask() {
        var allTask = document.querySelector(".allTask");
        sum = ''
        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
            <button id=${idx}>Mark as Completed</button>
                </div>`
        })
        allTask.innerHTML = sum

        //! akhn e dhukanor karon hoche amk ektadlt korar por abr to button eracess pete hobe tai mne 1ta dlt thik aceh then abr sob dislay te render houar sathe sathe abr acess paor jonno
        var markCompleted = document.querySelectorAll('.task button');
        markCompleted.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1);
                localStorage.setItem("currentTask", JSON.stringify(currentTask));
                // console.log(currentTask);
                renderTask();
            })
        })
    }
    renderTask()

    var form = document.querySelector(".addTask form");
    var taskInput = document.querySelector(".addTask form input");
    var taskDetails = document.querySelector(".addTask form textarea");
    var taskCheckBox = document.querySelector(".addTask form #mark");


    form.addEventListener('submit', function (dets) {
        dets.preventDefault();
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetails.value,
                imp: taskCheckBox.checked
            }
        )
        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        renderTask();
        taskInput.value = '';
        taskDetails.value = '';
        taskCheckBox.checked = false;
    })
}
ToDoList();

//! Daily Planner...
function DailyPlanner() {
    var dailyPlanner = document.querySelector(".day-planner");

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hour = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDay = ''


    hour.forEach((elem, idx) => {

        var saved = dayPlanData[idx] || ''

        wholeDay = wholeDay + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${saved}>
                </div>`;
    })


    dailyPlanner.innerHTML = wholeDay;


    var dayPlannerInput = document.querySelectorAll(".day-planner input");

    dayPlannerInput.forEach((elem) => {
        elem.addEventListener('input', () => {
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
        })
    })
}
DailyPlanner();


//! Motivational Quote...
function Motivational() {
    var motivationQuote = document.querySelector(".motivation-2 h1");
    var motivationAuthor = document.querySelector(".motivation-3 h3");
    // window.location.reload();
    async function fetchQuote() {
        let response = await fetch("https://api.quotable.io/random")
        let data = await response.json();
        motivationQuote.innerHTML = `" ${data.content} "`;
        motivationAuthor.innerHTML = `- ${data.author}`
    }

    fetchQuote();
    let motiBack = document.querySelector(".motiback");
    motiBack.addEventListener("click", () => {
        window.location.reload();
    })
}
Motivational()


//! Pomodoro Timer....
function Pomodoro()
{
    var startBtn = document.querySelector(".start");
    var pauseBtn = document.querySelector(".pause");
    var resetBtn = document.querySelector(".reset");
    var time = document.querySelector(".time-main");

    var reach = true;
    var totalTime = 25 * 60;
    timerInterval = null;

    function updateTimer() {
        var min = Math.floor(totalTime / 60);
        var sec = totalTime % 60;
        time.innerHTML = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }

    function start() {
        clearInterval(timerInterval)
        if (reach) {
            totalTime = 25 * 60;
            timerInterval = setInterval(() => {
                if (totalTime > 0) {
                    totalTime--;
                    updateTimer();
                }
                else {
                    reach = false;
                    clearInterval(timerInterval);
                    time.innerHTML = `05:00`
                }
            }, 10);
        }
        else {
            totalTime = 5 * 60;
            timerInterval = setInterval(() => {
                if (totalTime > 0) {
                    totalTime--;
                    updateTimer();
                }
                else {
                    reach = true;
                    clearInterval(timerInterval);
                    time.innerHTML = `25:00`
                }
            }, 10);
        }
    }

    startBtn.addEventListener("click", start);

    function stop() {
        clearInterval(timerInterval)
    }
    pauseBtn.addEventListener("click", stop);

    function reset() {
        clearInterval(timerInterval);
        totalTime = 25 * 60;
        updateTimer();
    }

    resetBtn.addEventListener("click", reset);
}
Pomodoro();