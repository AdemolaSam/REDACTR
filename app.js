const container = document.querySelector(".container");
const resultContainer = document.querySelector(".result-container")
const form = document.querySelector("form")
const textStr = document.querySelector("textarea")
const wordStr = document.querySelector("#word")
const select = document.querySelector("select")
const btn = document.querySelector(".btn")


let res = `<div class="result-container">
                <div class="top">
                    <span>
                        <i class="fas fa-copy"></i>
                        copy text
                    </span>
                </div>
                <div class="result">Results will be shown here</div>
            </div>`


btn.addEventListener('click', () => {
    replaceWord()
    container.style.visibility = 'visible'
})

// This function takes in three arguments: str - the full text, word - the word to be redacted, char - replacement character
function replaceWord(text, word, char){
    text = textStr.value;
    word = wordStr.value;
    char = select.value;
    let replacementStr = ""
    let newText;
   for (var i=0; i<word.length; i++){
        replacementStr+=char
   }
   wordToReplace = new RegExp(word, "gi")
   newText = text.replace(wordToReplace, replacementStr) // replaces the word
   container.innerHTML = res // inserts result container into the container div
   const resultDiv = container.querySelector(".result") // gets the result div
   resultDiv.innerHTML = newText // insert the new text into the result div
   container.style.visibility = 'visible'
   form.style.visibility = 'hidden' // hides the form
   console.log("Replaced Text: " + newText)
//    Copying the result
    const copyBtn = container.querySelector("span")
   copyText(newText, copyBtn) // function call to copy the scrambled text
   
}




function copyText(textStr, btn){
    btn.addEventListener("click", () => {
        if (navigator.clipboard){
            navigator.clipboard.writeText(textStr)
            .then(() => {
                console.log("Text copied to clipboard: " + textStr)
            })
            .catch(err => {
                console.log("Not found: " + err)
            })
        }else {
            console.log("Your browser does not support clipboard")
        }
    })
}