/* Move the data to a file called data.js and import it into index.js. */
import { catsData } from "./data.js";

// *********************************************

// 1. => Set up a "for of" in getEmotionsArray to iterate over the data.
// function getEmotionsArray(cats) {}
// for (let cat of catsData) {
// 2. => For now, just log out each cat object individually.
//   console.log(cat);
// }
// getEmotionsArray(catsData);
// CONSOLE===>
// {emotionTags: ["moody"], isGif: false, image: "angry.jpeg", alt: "A cat looking moody"}
// ............
// {emotionTags: ["sad"], isGif: true, image: "sad.gif", alt: "A cat looking sad"}
// *********************************************

// function getEmotionsArray(cats) {
//   for (let cat of cats) {
// 1. => Add a nested "for of" to log out just the emotions from the emotionTags array in each object.
//     for (let emotion of cat.emotionTags) {
//       console.log(emotion);
//     }
//   }
// }
// getEmotionsArray(catsData);

// CONSOLE===>
// moody
// moody
// insomniac
// moody
// ...............
// sad
// scared
// sad

// function getEmotionsArray(cats) {
// 1. => Set up a const and initialise it with an empty array.
//   const emotionsArray = [];
//   for (let cat of cats) {
//     for (let emotion of cat.emotionTags) {
// 2. => Instead of logging out each emotion, push each one to the new array.
//       emotionsArray.push(emotion);
//     }
//   }
// 3. => At the end of the function, log out the const holding the new array.
//   console.log(emotionsArray);
// }

// getEmotionsArray(catsData);
// CONSOLE===>
// ›["moody", "moody", "insomniac", "moody", "confused", "sad", "dominant", "moody", "happy", "relaxed", "hungry", "hungry", "insomniac", "insomniac", "relaxed", "scared", "sad", "sad", "moody", "moody", "moody", "confused", "dominant", "happy", "hungry", "sad", "confused", "hungry", "hungry", "insomniac", ...]

/* => Add a nested "for of" to log out just the emotions from the emotionTags array in each object. */
// function getEmotionsArray(cats) {
//   const emotionsArray = [];

//   for (let cat of cats) {
//     for (let emotion of cat.emotionTags) {
//       emotionsArray.push(emotion);
//     }
//   }
//   return emotionsArray;
// }

// console.log(getEmotionsArray(catsData));
// CONSOLE===>
// ["moody", "moody", "insomniac", "moody", "confused", "sad", "dominant", "moody", "happy", "relaxed", "hungry", "hungry", "insomniac", "insomniac", "relaxed", "scared", "sad", "sad", "moody", "moody", "moody", "confused", "dominant", "happy", "hungry", "sad", "confused", "hungry", "hungry", "insomniac", ...]
// *********************************************
// 6. Render out the emotions 1

// 7.1 => Take control of the 'emotion-radios' div.
const emotionRadios = document.getElementById("emotion-radios");

// 15. Get the id of the clicked option
/*
   Challenge:
   1. Add an eventListener to emotionRadios that will listen 
      out for any *change* in our radio buttons. When it detects
      a change, it should log out the id of the element that 
      was selected.
   ⚠️️ ️T️h️is won't work if the eventListener is listening out for a 
      'click'. Google what event to listen for - I've already 
      given you a clue!
   */

// 18. Add color to the selected emotion
// emotionRadios.addEventListener("change", function (e) {
//   console.log(e.target.id);
// });
emotionRadios.addEventListener("change", highlightCheckedOption);

function highlightCheckedOption(e) {
  /*
   Challenge:
   1. highlightCheckedOption should take control 
      of the selected radio input and add the CSS
      class of "highlight" to its classlist
   */
  //  console.log(e.target.id);
  //   document.getElementById(e.target.id).classList.add("highlight");
  /*
   Challenge:
   1. Change the code in line 8 so we add the 
      'highlight' class to the parent of the 
      selected input radio.
   */
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

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

/*
Challenge:
6.1=> Have the new function "renderEmotionsRadios" 
   take in a single parameter. Name that parameter
   "cats". 
6.2 => Inside renderEmotionsRadios, set up a const called 
   "emotions" and set it equals to whatever is returned 
   by calling getEmotionsArray, passing in "cats" as an 
   argument.
3. For now, renderEmotionsRadios should just log out 
   "emotions".
4. Call renderEmotionsRadios passing in catsData.
*/
// 6.1 => Have the new function "renderEmotionsRadios" take in a single parameter. Name that parameter "cats".
// function renderEmotionsRadios(cats) {
//  6.2 => Inside renderEmotionsRadios, set up a const called "emotions" and set it equals to whatever is returned by calling getEmotionsArray, passing in "cats" as an argument.
//   const emotions = getEmotionsArray(cats);
//   console.log(emotions);
// }

// renderEmotionsRadios(catsData);
// CONSOLE===>
// ["moody", "moody", "insomniac", "moody", "confused", "sad", "dominant", "moody", "happy", "relaxed", "hungry", "hungry", "insomniac", "insomniac", "relaxed", "scared", "sad", "sad", "moody", "moody", "moody", "confused", "dominant", "happy", "hungry", "sad", "confused", "hungry", "hungry", "insomniac", ...]
// *********************************************
// 7. Render out emotions 2
/*
Challenge:
7.1=> Take control of the 'emotion-radios' div.
7.2=> In renderEmotionsRadios, set up a let 
   to hold our string of HTML. You can initialise
   it with an empty string.
3. Iterate over "emotions" and put each emotion 
   in a <p> tag and then add them to the let you 
   created in step 2. 
4.=> Render the string to the 'emotion-radios' div.
*/

function renderEmotionsRadios(cats) {
  // 7.2=> In renderEmotionsRadios, set up a let to hold our string of HTML. You can initialise it with an empty string.
  let radioItems = "";
  const emotions = getEmotionsArray(cats);
  // 7.3
  for (let emotion of emotions) {
    // 11. Render the radios inputs
    /*
      Challenge:
      11.1=> Swap out `<p>${emotion}</p>` for HTML
         that will render a radio input for each
         emotion. Remember to use "type", "id", 
         "value", and "name" properties on each radio.
         ("id" and "value" can both be set to the
         "emotion").
      2. Remember to give each radio a label.
         (What property does a label need?)
      3. Enclose each individual radio input in this div:
         <div class="radio">
            **RADIO HERE**
         </div>
    */

    // 11.1=> Swap out `<p>${emotion}</p>` for HTML that will render a radio input for each emotion. Remember to use "type", "id", "value", and "name" properties on each radio.("id" and "value" can both be set to the "emotion").
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

renderEmotionsRadios(catsData);
