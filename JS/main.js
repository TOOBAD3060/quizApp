// getting all required elements
const startBtn=document.querySelector(".startBtn button");
const infoBox=document.querySelector(".infoBox");
const quitBtn=document.querySelector(".buttons .quit");
const continueBtn=document.querySelector(".buttons .restart");
const quizBox=document.querySelector(".quiz_box")
const optionList=document.querySelector(".option_list");
const timeCount=document.querySelector(".timer .timer_sec")
const timeLine=quizBox.querySelector("header .time_line")
const timeOff=quizBox.querySelector("header .time_text")



// event listeners
startBtn.addEventListener("click",()=>{
    infoBox.classList.add("activeInfo") ; //show d info box  
})

quitBtn.addEventListener("click",()=>{
    infoBox.classList.remove("activeInfo")   //hide d info box
})





let rand= Math.floor(Math.random()*quesAndAns.length);


continueBtn.addEventListener("click",()=>{
    infoBox.classList.remove("activeInfo")   //hide d info box
    quizBox.classList.add("active_quizBox")   //show d quiz box
     
  let rand= Math.floor(Math.random()*quesAndAns.length);
    showQuestions(0);
    quesCounter(1);
    startTimer(timeValue);
    startTimerLine(0)
})


let que_count=0;
let queNumb=1;
let counter;
let counterLine;
let timeValue=12;
let widthValue=0;
let userScore=0;



const nextBtn= quizBox.querySelector(".next_btn")
const resultBox=document.querySelector(".result_box")
const restartQuiz=resultBox.querySelector(".buttons .restart")
const quitQuiz= resultBox.querySelector(".buttons .quit")


restartQuiz.addEventListener("click",()=>{
    quizBox.classList.add("active_quizBox")
    resultBox.classList.remove("activeResult");
 let nextrand= Math.floor(Math.random()*quesAndAns.length);
do{
 nextrand= Math.floor(Math.random()*quesAndAns.length);
}
 while(nextrand==rand)

 rand=nextrand

     que_count=0;
     queNumb=1;
     timeValue=12;
     widthValue=0;
     userScore=0;

    showQuestions(que_count);
    quesCounter(queNumb);

    clearInterval(counter);
    startTimer(timeValue);   

    clearInterval(counterLine);
    startTimerLine(widthValue);

    nextBtn.style.display="none"
   
    timeLine.classList.remove("timeUp")
 
})

quitQuiz.addEventListener("click",()=>{
    window.location.reload();
})

nextBtn.addEventListener("click",()=>{
    if(que_count < quesAndAns[rand].length-1){
        que_count++;
        queNumb++;
    showQuestions(que_count);
    quesCounter(queNumb);

    clearInterval(counter);
    startTimer(timeValue);

    clearInterval(counterLine);
    startTimerLine(widthValue);

    nextBtn.style.display="none"

    timeLine.classList.remove("timeUp")
    
    timeCount.classList.remove("bounce")
      
timeOff.textContent="Time Left :"

    
    }
    else{
        console.log("completed")
        showResultBox();
    }
})

// getting questions and options from array
function showQuestions(index){
    const queText= document.querySelector(".ques_text");

    let queTag= `<span>`+ quesAndAns[rand][index].numb + "." + quesAndAns[rand][index].question +`</span>`;
     let optionTag=`<div class="option"><span>`+quesAndAns[rand][index].option[0]+`</span></div>`
                   +`<div class="option"><span>`+quesAndAns[rand][index].option[1]+`</span></div>`
                   +`<div class="option"><span>`+quesAndAns[rand][index].option[2]+`</span></div>`
                  +`<div class="option"><span>`+quesAndAns[rand][index].option[3]+`</span></div>`; 

    queText.innerHTML=queTag;
    optionList.innerHTML=optionTag;
    
    const options=optionList.querySelectorAll(".option");
    for (let i = 0; i<options.length; i++) {
        
       options[i].setAttribute("onclick","optionSelected(this)")
        
    }
}

let tickIcon= `<img class="icon tick" src="images/check-markE.jpg" width="30px">`
let crossIcon= `<img class="icon cross" src="images/x-buttonE.jpg" width="30px">`



function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns= answer.textContent;
    let correctAns= quesAndAns[rand][que_count].answer;
    let alloptions= optionList.children.length;
   
    timeCount.classList.remove("bounce")

    if(userAns===correctAns){
        userScore+=1;
        console.log(userScore);
        answer.classList.add("correct");

        answer.insertAdjacentHTML("beforeend",tickIcon)
    }
    else{
        answer.classList.add("incorrect")
        
        answer.insertAdjacentHTML("beforeend",crossIcon)

        //   if answer is incorrect automatically select the correct one
        
        for (let i = 0; i < alloptions; i++) {
        
            if (optionList.children[i].textContent===correctAns) {
                optionList.children[i].setAttribute("class","option correct")

        optionList.children[i].insertAdjacentHTML("beforeend",tickIcon)

            }
            
        }

    }
    // /once user selected, disabled all options
    for (let i = 0; i < alloptions; i++) {
        optionList.children[i].classList.add("disabled")
        
    }
    nextBtn.style.display="block";
}

function showResultBox() {
    
    
    infoBox.classList.remove("activeInfo")   //hide d info box
    quizBox.classList.remove("active_quizBox")   //show d quiz box
    resultBox.classList.add("activeResult")
    const scoreText=resultBox.querySelector(".score_text")

    if (userScore==7) {
        let scoreTag=`<span>and Tuale!, You got <p>${userScore}</p> out of <p>${quesAndAns[rand].length}</p> </span>`
        scoreText.innerHTML=scoreTag;
    }
    else if(userScore>4){
        let scoreTag=`<span>and congrats!, You got <p>${userScore}</p> out of <p>${quesAndAns[rand].length}</p> </span>`
           scoreText.innerHTML=scoreTag;  
        }
        else if(userScore==4){
            let scoreTag=`<span>and 50% !, You got <p>${userScore}</p> out of <p>${quesAndAns[rand].length}</p> </span>`
            scoreText.innerHTML=scoreTag;  
    
        }
        else if(userScore>2){
            let scoreTag=`<span>and fair, You got only <p>${userScore}</p> out of <p>${quesAndAns[rand].length}</p> </span>`
               scoreText.innerHTML=scoreTag;  
            } 
        else{
                let scoreTag=`<span>and sorry, You got only <p>${userScore}</p> out of <p>${quesAndAns[rand].length}</p> </span>`
                   scoreText.innerHTML=scoreTag;  
                }
}


function quesCounter(index){
const bottomQuesCounter= quizBox.querySelector(".total_que");

let totalQuesCountTag= `<span><p>`+ index +`</p>of <p>`+ quesAndAns[rand].length+ `</p> Questions </span>`;
bottomQuesCounter.innerHTML=totalQuesCountTag;
}






function startTimer(time) {
   counter=setInterval(timer,1000)
    
    function timer(){
        timeCount.textContent=time;
        time--;
        if (time < 9) {
            timeCount.textContent= `0${time}`
            
        }
        if(time<5){
       timeCount.classList.add("bounce")

        }
        if (time < 0) {
            clearInterval(counter)
            timeCount.textContent= "00";
           timeCount.classList.remove("bounce")
            
           timeOff.textContent="Time Off :"
           
            let correctAns= quesAndAns[rand][que_count].answer;
            let alloptions= optionList.children.length;
 
            for (let i = 0; i < alloptions; i++) {
        
                if (optionList.children[i].textContent===correctAns) {
                    optionList.children[i].setAttribute("class","option correct")

                    optionList.children[i].insertAdjacentHTML("beforeend",tickIcon)

                   }
                }
                 // once time is up, disabled all options
    for (let i = 0; i < alloptions; i++) {
        optionList.children[i].classList.add("disabled")
        
    }
    nextBtn.style.display="block";
        }
    }
}


function startTimerLine(time) {
    counterLine = setInterval(timer,30)
    function timer() {
        time += 1;
        timeLine.style.width= time + "px"
      
        if (time > 400) {
            clearInterval(counterLine);
            timeLine.classList.add("timeUp")
        }
    }
    
}