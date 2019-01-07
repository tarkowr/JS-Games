let content = document.getElementsByClassName("gameContent");
let box = document.getElementById("game-info");
let info = document.getElementById("info");
let title = document.getElementById("title");

let blockEasy, blockHard, blockImpossible, blockFlappy, nba, matching = 0;

//
// Foreach hoverable element that displays Game Info
//
Array.prototype.forEach.call(content, function(el) {

    //
    // Add an event listener to each element
    //
    el.addEventListener("click", function(){

        //
        // Get high scores
        //
        blockEasy = GetScoreByName(Scores.BlockEasy);
        blockHard = GetScoreByName(Scores.BlockHard);
        blockImpossible = GetScoreByName(Scores.BlockImpossible);
        blockFlappy = GetScoreByName(Scores.BlockFlappy);
        nba = GetScoreByName(Scores.Nba);
        matching = GetScoreByName(Scores.Matching);

        box.style.display = "inline-block";
        title.style.display = "none";

        SetNullScoresToZero();

        //
        // Display content based on its ID
        //
        switch(el.id){
            case "blockDes":
                info.innerHTML = "Navigate the block between the blue bars to survive as long as you can!";
                break;
            case "blockHS":
                info.innerHTML = "High Score (Easy): " + blockEasy + " <br> " +
                    "High Score (Hard): " + blockHard + "<br>" +
                    "High Score (Impossible): " + blockImpossible + " <br> " +
                    "High Score (Flappy): " + blockFlappy + "<br>";
                break;
            case "nbaDes":
                info.innerHTML = "Move an NBA character across the screen. Player options: LeBron James, Kobe Bryant, and Michael Jordan.";
                break;
            case "nbaHS":
                info.innerHTML = "High Score: " + nba;
                break;
            case "matchingDes":
                info.innerHTML = "Match all of the cards in the lowest number of moves.";
                break;
            case "matchingHS":
                info.innerHTML = "Lowest Number of Moves: " + matching;
                break;
            default:
                box.style.display = "none";
                break;
        }
    });
});

//
// Hide modal if clicked
//
window.onclick = function(event) {
    if (event.target == info) {
        box.style.display = "none";
        title.style.display = "block";
    }
}