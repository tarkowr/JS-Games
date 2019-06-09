let box = document.getElementById("game-info");
let info = document.getElementById("info");
let title = document.getElementById("title");

let blockEasy, blockHard, blockImpossible, blockFlappy, nba, matching = 0;
let htmlString = "";

SetNullScoresToZero();

blockEasy = GetScoreByName(Scores.BlockEasy);
blockHard = GetScoreByName(Scores.BlockHard);
blockImpossible = GetScoreByName(Scores.BlockImpossible);
blockFlappy = GetScoreByName(Scores.BlockFlappy);
nba = GetScoreByName(Scores.Nba);
matching = GetScoreByName(Scores.Matching);

htmlString = GetHighScoreHtml();

info.innerHTML = htmlString;

Initialize();

function Initialize(){
    title.addEventListener("click", function(){
        box.style.display = "block";
        title.style.display = "none";
    });
    
    box.addEventListener("click", function(){
        box.style.display = "none";
        title.style.display = "block";
    });
}

function GetHighScoreHtml(){
    return "Block (Easy): " + blockEasy + "<br />" +
        "Block (Hard): " + blockHard + "<br />" +
        "Block (Impossible): " + blockImpossible + "<br />" +
        "Block (Flappy): " + blockFlappy + "<br />" + 
        "NBA Chase: " + nba + "<br />" +
        "Matching: " + matching + "<br />"; 
}