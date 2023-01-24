/* Move the data to a file called data.js and import it into index.js. */
import { catsData } from "./data.js";

// *********************************************

// 7.1 => Take control of the 'emotion-radios' div.
const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
// 25.1. Take control of the gifs only option checkbox.
const gifsOnlyOption = document.getElementById("gifs-only-option");

emotionRadios.addEventListener("change", highlightCheckedOption);
// 22.1=> Set up an eventlistener which calls a new function called "getMatchingCatsArray" when the "Get Image" button is clicked.
getImageBtn.addEventListener("click", getMatchingCatsArray);
function highlightCheckedOption(e) {
  //  console.log(e.target.id);
  // ==>  highlightCheckedOption should take control of the selected radio input and add the CSS class of "highlight" to its classlist
  //  document.getElementById(e.target.id).classList.add("highlight");

  // 20.1=> Create an array of all items that have the "radio" class.
  const radios = document.getElementsByClassName("radio");
  // 20.2=> Iterate over the array and remove the "highlight" class from each one.
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }

  // ==>Change the code so we add the 'highlight' class to the parent of the selected input radio.
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

// 22.2=> getMatchingCatsArray should save the value of the checked radio input to a const and log out that const.
function getMatchingCatsArray(e) {
  // 25.2. Set up a const in getMatchingCatsArray to store a boolean which will be set to true if the "gifs only" option is checked and false if it's not. (Think what a good name for this const would be.)
  const isGif = gifsOnlyOption.checked;
  // 25.3. Log it out to check it's working
  console.log(isGif);

  // 23.1 ==> Add code to getMatchingCatsArray so that the two existing lines of code only run if an emotion has been selected. This will run 'if' a radio btn has been checked. No err mess anymore when only the "Get Image" btn in clicked.
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotiom = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    console.log(selectedEmotiom);
  }
}
// CONSOLE ===> select radio button for 'happy' then click "Get Image" button
// happy
// ! if only the "Get Image" button is clicked, this is the err mess --->
// TypeError: Cannot read properties of null (reading 'value')

function getEmotionsArray(cats) {
  const emotionsArray = [];

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      // 13.1 => Refactor this nested for of so that an emotion is only pushed to emotionsArray if it is not already in emotionsArray. Extra kudos if you use the "logical not" operator - feel free to google it!
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}
// 6.1 => Have the new function "renderEmotionsRadios" take in a single parameter. Name that parameter "cats".
// function renderEmotionsRadios(cats) {
// 6.2 => Inside renderEmotionsRadios, set up a const called "emotions" and set it equals to whatever is returned by calling getEmotionsArray, passing in "cats" as an argument.
//   const emotions = getEmotionsArray(cats);
// 6.3 => For now, renderEmotionsRadios should just log out
// "emotions".
//   console.log(emotions);
// }
//  6.4 => Call renderEmotionsRadios passing in catsData.
// renderEmotionsRadios(catsData);
// CONSOLE===>
// ["moody", "moody", "insomniac", "moody", "confused", "sad", "dominant", "moody", "happy", "relaxed", "hungry", "hungry", "insomniac", "insomniac", "relaxed", "scared", "sad", "sad", "moody", "moody", "moody", "confused", "dominant", "happy", "hungry", "sad", "confused", "hungry", "hungry", "insomniac", ...]
// *********************************************
function renderEmotionsRadios(cats) {
  // 7.2=> In renderEmotionsRadios, set up a let to hold our string of HTML. You can initialise it with an empty string.
  let radioItems = "";
  const emotions = getEmotionsArray(cats);
  // 7.3=> Iterate over "emotions" and put each emotion in a <p> tag and then add them to the let you created in step 2.
  for (let emotion of emotions) {
    // 11.1=> Swap out `<p>${emotion}</p>` for HTML that will render a radio input for each emotion. Remember to use "type", "id", "value", and "name" properties on each radio.("id" and "value" can both be set to the "emotion").
    // 11.2=> Remember to give each radio a label.
    // 11.3=> Enclose each individual radio input in this div:
    //    <div class="radio">
    //       **RADIO HERE**
    //    </div>

    //  radioItems += `<p>${emotion}</p>`;
    radioItems += `<div class='radio'>
            <label for='${emotion}'>${emotion}</label>
            <input
                type='radio'
                id='${emotion}'
                value='${emotion}'
                name='emotions'
            />
      </div>`;
  }
  // 7.4 => Render the string to the 'emotion-radios' div.
  emotionRadios.innerHTML = radioItems;
}
// 7.4=> Render the string to the 'emotion-radios' div.
renderEmotionsRadios(catsData);
