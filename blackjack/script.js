let sum=0;
let cards=[];
let car=document.getElementById("c");
let su=document.getElementById("s");
let r= document.getElementById("result");
let player={
    naam:"Balance",
    money:100
}
let isalive=false;
let win=false;
let havecredit=true;
let pl=document.getElementById("score");
pl.textContent=player.naam +" :$ "+player.money;
function startGame(){
    if(player.money>0){
    player.money-=10;
    cards.length=0;
    win=false;
    isalive=true;
    firstCard=getRandomNumber();
    secondCard=getRandomNumber();
    sum=firstCard+secondCard;
    pl.textContent=player.naam +" :$ "+player.money;
    if(firstCard===11){
        firstCard="J";
    }
    if(firstCard===12){
        firstCard="Q";
    }
    if(firstCard===13){
        firstCard="K";
    }
    if(secondCard===11){
        secondCard="J";
    }
    if(secondCard===12){
        secondCard="Q";
    }
    if(secondCard===13){
        secondCard="K";
    }
    if(firstCard===1){
        firstCard="A";
    }
    if(secondCard===1){
        secondCard="A";
    }
    cards=[firstCard,secondCard];
    renderGame();
    if(player.money===0){
        alert("last chance");
    }
    }
    else{
        r.textContent="ALL CREDITS OVER";
        // document.getElementById("bt").innerHTML=<button id="bt1" disabled onclick="startGame()">New Game</button>;
        isalive=false;
        havecredit=false;
    }
}
function renderGame(){
    su.textContent="Sum :"+" "+sum;
    car.textContent="Cards : "
    for(let i=0;i<cards.length;i++){
        car.textContent+=cards[i]+" "; 
    }
    if(sum<21){
        r.textContent="Draw a new card!";
    }
    else if(sum === 21){
        r.textContent="Blackjack";
        player.money+=30;
        isalive=false;
        win=true;
        pl.textContent=player.naam +" :$ "+player.money;
    }
    else{
        r.textContent="Game Over";
        isalive=false;
        pl.textContent=player.naam +" :$ "+player.money;
    }
}
function getRandomNumber(){
    let a=Math.random();
    a=a*13;
    a=Math.floor(a);
    a+=1;
    return a;
}
function newCard(){
    if(havecredit){
    if(isalive && (!win)){
    let newc=getRandomNumber();
    sum= sum+newc;
    if(newc===11){
        newc="J";
    }
    if(newc===12){
        newc="Q";
    }
    if(newc===13){
        newc="K";
    }
    if(newc===1){
        newc="A";
    }
    cards.push(newc);
    renderGame();
    }
    else if((!isalive) && (win)){
        r.textContent="Already won";
    }
    else{
        r.textContent="Already out of game , cant draw ";
    }
}
else{
    r.textContent="ALL CREDITS OVER";
}
}