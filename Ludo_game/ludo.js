gameOn = () => {
    const player1 = Math.floor(Math.random()*6) + 1;
    const player1dice = `dice${player1}.webp`;
    document.getElementById('check1').setAttribute('src', player1dice);

    const player2 = Math.floor(Math.random()*6) + 1;
    const player2dice = `dice${player2}.webp`;
    document.getElementById('check2').setAttribute('src', player2dice);

    if(player1 > player2){
        document.querySelector('h1').innerHTML = 'Player 1 Won !!';
    }else if(player1 < player2){
        document.querySelector('h1').innerHTML = 'Player 2 Won !!';
    }else{
        document.querySelector('h1').innerHTML = 'DRAW !!';
    }
}