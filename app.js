const container = document.querySelector(".container");
const form = document.querySelector("form")
const textStr = document.querySelector("textarea")
const wordStr = document.querySelector("#word")
const replaceMentChar = document.querySelector("#char")
const btn = document.querySelector(".btn")
const pasteBtn = document.querySelector(".paste")
const resetBtn = document.querySelector(".reset")

let res = `<div class="result-container">
                <div class="grid1">
                    <div class="top">
                        <span>
                            <i class="fas fa-copy"></i>
                            copy
                        </span>
                    </div>
                    <div class="result">Results will be shown here</div>
                </div> 

                <div class="stats">
                    <p class="first">STATS:</p>
                    <p class="scan">Total Words scanned: <b class="words"></b></p>
                    <p class="scan">Characters replaced: <b class="char"></b></p>
                    <p class="scan">Time taken: <b class="time"></b></p>
                    <p class="scan">Replaced: <b class="replaced"></b> word(s)</p>    
                </div>
            </div>
            `

pasteText()

resetBtn.addEventListener('click', ()=> {
    location.reload()
})

btn.addEventListener('click', () => {
    replaceWord()
    container.style.visibility = 'visible'
})

// This function takes in three arguments: str - the full text, word - the word to be redacted, char - replacement character
function replaceWord(text, word, char){
    // Start time
    const startTime = Date.now()

    text = textStr.value;
    word = wordStr.value;
    char = replaceMentChar.value;
    let replacementStr = ""
    let newText;
   
/* 
If word passed is more then one 
*/
 
   if (word.includes(" ")){
    // replace the spaces with `|`
    repWord = word.split(" ").join("|")
    wordToReplace = new RegExp(repWord, "gi")
    console.log(word, wordToReplace)
    char.length > 1? replacementStr = char : replacementStr = char.repeat(4)    
   } else {
    wordToReplace = new RegExp(word, "gi")
    // Loops the number of characters in the word to be replaced
    for (var i=0; i<word.length; i++){
        replacementStr+=char
   }
   }
   newText = text.replace(wordToReplace, replacementStr) // replaces the word

   container.innerHTML = res // inserts result container into the container div

   const resultDiv = container.querySelector(".result") // gets the result div

   resultDiv.innerHTML = newText // insert the new text into the result div

   container.style.visibility = 'visible'
   form.style.display = 'none' // hides the form    

    // Copying the result
    const copyBtn = container.querySelector("span")
   copyText(newText, copyBtn) // function call to copy the scrambled text

   // Returning the number of words scrambled and time taken
   displayTimeAndCount(text, wordToReplace, startTime)
}

function displayTimeAndCount(text, reg, startTime) {
    let count = 0
    charCount = 0
    let wordsInText = text.split(" ")
    for(word of wordsInText){
     if(word.match(wordToReplace)){
          count += 1
          charCount += word.length
     }
    }
    noOfWords = text.split(" ").length
    noOfCharReplaced = charCount
    const timeTaken = Date.now() - startTime
    container.querySelector(".words").innerText = noOfWords
    container.querySelector(".time").innerText = timeTaken/1000 + "second(s)"
    container.querySelector(".char").innerText = noOfCharReplaced
    container.querySelector(".replaced").innerText = count
    // console.log(`Replaced ${count} words: in ${timeTaken/1000} seconds, scanned ${noOfCharScanned} characters and ${noOfWords} words`)
}
   

// Function to copy the redactted text
function copyText(textStr, btn){
    btn.addEventListener("click", () => {
        if (navigator.clipboard){
            navigator.clipboard.writeText(textStr)
            .then(() => {
                // console.log("Text copied to clipboard: " + textStr)
                container.querySelector("span").innerHTML = "Copied to clipboard!!"
            })
            .catch(err => {
                console.log("Not found: " + err)
            })
        }else {
            console.log("Your browser does not support clipboard")
        }
    })
}

// Function to paste to textarea
function pasteText(){
    pasteBtn.addEventListener("click", () => {
        if (navigator.clipboard){
            navigator.clipboard.readText()
            .then((text) => {
                textStr.innerText = text; // sets the innertext of the textarea to the copied text
                // console.log("pasted text: " + text)
            })
            .catch((err) => {
                console.log("Failed to paste text: " + err)
            })
        }else {
            console.log("Your browser does not support clipboard functionality")
        }
    })
}
