let blockEasy, blockHard, blockImpossible, blockFlappy, nba, matching;

//
// Attach event listener to submit button
//
document.getElementById("submit").addEventListener("click", function(){

    //
    // Get checkbox values
    //
    blockEasy = document.getElementById("block-easy").checked;
    blockHard = document.getElementById("block-hard").checked;
    blockImpossible = document.getElementById("block-impossible").checked;
    blockFlappy = document.getElementById("block-flappy").checked;
    nba = document.getElementById("nba").checked;
    matching = document.getElementById("matching").checked;

    //
    // Reset high scores
    //
    if(blockEasy){
        ResetHighScore(Scores.BlockEasy);
    }
    if(blockHard){
        ResetHighScore(Scores.BlockHard);
    }
    if(blockImpossible){
        ResetHighScore(Scores.BlockImpossible);
    }
    if(blockFlappy){
        ResetHighScore(Scores.BlockFlappy);
    }
    if(nba){
        ResetHighScore(Scores.Nba);
    }
    if(matching){
        ResetHighScore(Scores.Matching);
    }
});