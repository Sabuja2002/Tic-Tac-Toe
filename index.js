const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector('.btn');
const anupam_para=document.querySelector("[win-Anupam]");
const sabuja_para=document.querySelector("[win-Sabuja]");
let currPlayer;
let gameGrid;
localStorage.setItem("Anupam",0);
localStorage.setItem("Sabuja",0);
const winningPosition=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function initGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];
    // empty also in UI
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        // remove green color
        // box.classList.remove("win");
        box.classList=`box box${index+1}`;
    });
    // newGameBtn.classList.remove("active");
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player- ${currPlayer}`;
}

initGame();

boxes.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

function handleClick(index){
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currPlayer;
        gameGrid[index]=currPlayer;
        boxes[index].style.pointerEvents="none";
        // swap player
        swapPlayer();
        // check for winning
        checkGameOver();
    }
}

function swapPlayer(){
    if(currPlayer==="X")
    {
        currPlayer="O";
    }
    else{
        currPlayer="X";
    }
    gameInfo.innerText=`Current Player- ${currPlayer}`;
}

newGameBtn.addEventListener("click",initGame);

function checkGameOver(){
    let answer="";
    winningPosition.forEach((position)=>{
        // all boxes are non-empty and same player
        if((gameGrid[position[0]] == gameGrid[position[1]] && 
            gameGrid[position[1]] == gameGrid[position[2]]) && gameGrid[position[0]]!== "")
            {
                if(gameGrid[position[0]] == "X")
                {
                    answer="X";
                    let anu_wins=parseInt(localStorage.getItem("Anupam"));   
                    anu_wins+=1;
                    localStorage.setItem("Anupam",anu_wins);
                    anupam_para.innerText=`Wins:- ${anu_wins}`;
                }
                else{
                    answer="O";
                }
                boxes.forEach((box)=>{
                    // box.innerText="";
                    box.style.pointerEvents="none";
                });
                // add green to winning boxes
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
        
    });
    if(answer!="")
    {
        gameInfo.innerText=`Winner Player - ${answer}`;
        // let winner=localStorage.getItem
        newGameBtn.classList.add("active");
        return;
    }

    // check for game tie
    let filledBoxes=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
        {
            filledBoxes++;
        }
    })
    // all the boxes are non empty
    if(filledBoxes==9){
        gameInfo.innerText=`Game Tied !`;
        newGameBtn.classList.add("active");
    }
}