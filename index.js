/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    let countOfgames = 0
    for (let game of games) {
        countOfgames += 1
        
        // create a new div element, which will become the game card
        let newDivElement = document.createElement('div')


        // add the class game-card to the list
        newDivElement.classList.add("game-card")

        // set the inner HTML using a template literal to display some info 
        // about each game
        newDivElement.innerHTML = 
       ` <img class = "game-img" src = ${game.img} ></img>
        <div class = "game-name" ><strong>${game.name}</strong></div>
        <div class = "Game-description">
            ${game.description}
        </div>
        <div class = "game-backers">
           <strong>Backers:</strong> ${game.backers}
        </div>`
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.appendChild(newDivElement)
    }


}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

let contributionAmount = GAMES_JSON.reduce((accumulator, currentValue) => (currentValue.backers + accumulator),0)

let newContributionAmount = contributionAmount.toLocaleString("en-US")

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
<div>${newContributionAmount}</div>
`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let pledgedTotalAmt = GAMES_JSON.reduce((accumulator, currentValue) => (currentValue.pledged + accumulator), 0)

let newPledgedTotalAmt = pledgedTotalAmt.toLocaleString("en-US")
// set inner HTML using template literal
raisedCard.innerHTML = `
<div>$${newPledgedTotalAmt}</div>
`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let countOfGames = 0;
for (let Game in GAMES_JSON)
    countOfGames += 1

gamesCard.innerHTML = `
<div>${countOfGames}</div>
`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unFunded = GAMES_JSON.filter(game => (game.pledged < game.goal));

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unFunded);

}



// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let Funded = GAMES_JSON.filter(game => (game.pledged >= game.goal));
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(Funded);
}



// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", () => filterUnfundedOnly());
fundedBtn.addEventListener("click", () => filterFundedOnly());
allBtn.addEventListener("click", () => showAllGames());

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numOfUnfunded = GAMES_JSON.reduce((accumulator, game) => {
    if (game.goal > game.pledged){
        return accumulator + 1
    } else {
        return accumulator
    }
}, 0);


// create a string that explains the number of unfunded games using the ternary operator
const showString = `A total of ${newPledgedTotalAmt} has been raised for ${countOfGames} games. Currently, ${numOfUnfunded} ${numOfUnfunded > 1 ? "games" : "game"}
remains unfunded. We need your help to fund these amazing games!.`


// create a new DOM element containing the template string and append it to the description container
let p_Element = document.createElement("p");
p_Element.innerHTML = `${showString}`;
descriptionContainer.appendChild(p_Element);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [one, two, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let newPelement = document.createElement("p");
newPelement.innerHTML = `${one.name}`;
firstGameContainer.appendChild(newPelement);

// do the same for the runner up item
let newpElement = document.createElement("p");
newpElement.innerHTML = `${two.name}`;
secondGameContainer.appendChild(newpElement);


