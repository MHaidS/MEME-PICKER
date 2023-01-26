import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);

// 34.1==> Wire up the X button in the modal so it closes the modal.
memeModalCloseBtn.addEventListener("click", closeModal);

// 30.
// getImageBtn.addEventListener("click", getMatchingCatsArray);
getImageBtn.addEventListener("click", renderCat);

// TURNS THE INPUT RADIO RED(.highlight) WHEN SELECTED & THIS WILL BE REMOVED WHEN A DIFF. ONE IS SELECTED
function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

// RENDERS THE CAT TO THE DOM
// 1. needs to get the cat obj provided by getSingleCatObject()
// 2. needs to create some html string
// 3. needs to render it out to the DOM
function renderCat() {
  // 33.1==> Take the object that is returned by getSingleCatObject and save it to a const
  // called "catObject".
  const catObject = getSingleCatObject();
  // 33.2==> Set memeModalInner’s innerHTML to the HTML string below, remembering to insert the relevant
  // data from catObject to replace the UPPERCASE text.
  memeModalInner.innerHTML = `
    <img 
      class="cat-img"
      src="./images/${catObject.image}"
      alt="${catObject.alt}"
    />
  `;
  // 33.3==> Set memeModal’s display property to "flex"
  memeModal.style.display = "flex";
}

// 30. Introducing 2 important functions
// NARROWS DOWN THE ARRAY OF MATCHING CATS (matchingCatsArray) TO JUST 1 CAT OBJECT
function getSingleCatObject() {
  // console.log(getMatchingCatsArray());
  // CONSOLE ==>
  // [{emotionTags: ["happy", "relaxed"], isGif: false, image: "happy.jpeg", alt: "A cat looking happy"}, {emotionTags: ["happy"], isGif: true, image: "happy.gif", alt: "A cat looking happy"}]

  // 31.1 ==> Inside this function, call getMatchingCatsArray and save whatever it returns to a const called “catsArray”. [to test, call getSingleCatObject() in renderCat()]
  const catsArray = getMatchingCatsArray();
  // console.log(catsArray);

  //  31.2 ==>Set up an if to check if there is only one cat object in the array. If there is, log out that cat object (but not the whole array!) {} Test: "happy", animated GIFS only checked.
  if (catsArray.length === 1) {
    // console.log(catsArray[0]);
    return catsArray[0];
  } else {
    // 32.1==> If catsArray has more than one object, select an object at random and log it out.
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    // console.log(catsArray[randomNumber]);
    return catsArray[randomNumber];
    // CONSOLE ===>
    // {emotionTags: ["moody", "insomniac"], isGif: false, image: "angry2.jpeg", alt: "A cat looking moody"}
  }
}
// ============================================
// SAVES THE VALUE OF THE CHECKED RADIO INPUT TO A CONST & STORES A BOOLEAN WHICH WILL BE SET TO TRUE IF THE "GIFS ONLY" OPTION IS CHECKED AND FALSE IF IT'S NOT
// WILL FILTER OUT CATS BASED ON EMOTION SELECTED VIA RADIO INPUT & IF ANIMATED GIFS ARE PREFERRED, SHD. THERE BE ANY; ELSE, matchingCatsArray WILL JUST FILTER OUT THE CATS BASED ON SELECTED EMOTION
function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;
    // 28.1==> Use the .filter() and .includes() methods to get an array of cats which have the selected emotion in their emotionTags array.
    // 28.2==> Store this array in a const and log it out to check it's working. Think: what would be a good name for the const?
    const matchingCatsArray = catsData.filter(function (cat) {
      // 29.1==> Change the .filter() method's function so it returns an array that only has GIFs if the 'GIFs only' option is checked. If the 'GIFs only' option is not checked, it should return an array of all matches as it does now.
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

// THIS ONLY ALLOWS AN EMOTION TO BE PUSHED TO emotionsArray IF IT IS NOT YET IN THIS ARRAY
// CREATES THE ARRAY
function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

// HTML THAT WILL RENDER A RADIO INPUT FOR EACH EMOTION. THE STRING WILL BE RENDERED OUT TO THE  'emotion-radios' DIV USING DATA FR catsData ARRAY
// RENDERS THE ARRAY OUT
function renderEmotionsRadios(cats) {
  let radioItems = "";
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
