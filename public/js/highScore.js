const Scores = { "BlockEasy":"BlockEasy",
                "BlockHard":"BlockHard",
                "BlockImpossible":"BlockImpossible",
                "BlockFlappy":"BlockFlappy",
                "Nba":"Nba",
                "Matching":"Matching" }

const ScoreType = {"HIGH":"HIGH", "LOW":"LOW"}

//
// Return a high score by name
//
function GetScoreByName(name){
    switch(name){
        case Scores.BlockEasy:
            return localStorage.blockEasy;
        case Scores.BlockHard:
            return localStorage.blockHard;
        case Scores.BlockImpossible:
            return localStorage.blockImpossible;
        case Scores.BlockFlappy:
            return localStorage.blockFlappy;
        case Scores.Matching:
            return localStorage.Matching;
        case Scores.Nba:
            return localStorage.Nba;
        default:
            return;
    }
}

//
// Set a new high score by name
//
function SetScoreByName(name, value){
    switch(name){
        case Scores.BlockEasy:
            localStorage.blockEasy = value;
            break;
        case Scores.BlockHard:
            localStorage.blockHard = value;
            break;
        case Scores.BlockImpossible:
            localStorage.blockImpossible = value;
            break;
        case Scores.BlockFlappy:
            localStorage.blockFlappy = value;
            break;
        case Scores.Matching:
            localStorage.Matching = value;
            break;
        case Scores.Nba:
            localStorage.Nba = value;
        default:
            break;
    }
}

//
// Set all null or undefined scores to zero
//
function SetNullScoresToZero(){
    for(let key in Scores){
        let score = GetScoreByName(key);
        if(score === null || score === undefined){
            SetScoreByName(key, 0);
        }
    }
}

//
// Reset a high score to zero
//
function ResetHighScore(name){
    SetScoreByName(name, 0);
}

//
// Check if player score is a high score
//
function IsHighScore(playerHighScore, playerScore){
    if(playerHighScore == 0 || playerHighScore < playerScore){
        return true;
    }
    return false;
}

//
// Check if player score is a high score (low)
//
function IsLowScore(playerHighScore, playerScore){
    if(playerHighScore == 0 || playerHighScore > playerScore){
        return true;
    }
    return false;
}

//
//Set a new high score if it is better than the player's current high score
//
function CheckForNewHighScore(name, scoreValue, type = ScoreType.HIGH){
    if(type === ScoreType.HIGH){
        if(IsHighScore(GetScoreByName(name), scoreValue)){
            SetScoreByName(name, scoreValue);
        }
    }
    else{
        if(IsLowScore(GetScoreByName(name), scoreValue)){
            SetScoreByName(name, scoreValue);
        }
    }
}
