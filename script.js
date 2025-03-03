const sentence = document.querySelector("#sentence")
let sentencetext = "";
const spell = document.querySelector("#status");
const WPM = document.querySelector("#WPM");
const userinput = document.querySelector("#input");
let start = null;
let end = null;
let wpm = null;
let words = null;
let char = 0;
let data;
let display = document.querySelector("#review");
let p = document.createElement("p");
const url = "https://random-word-api.vercel.app/api?words=10"

function getsentence(){
    const xhr = new XMLHttpRequest();
xhr.open("GET",url,true)
xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
        data=JSON.parse(this.responseText)
        sentence.innerHTML = `${data.join(" ")}`
        console.log(data)
        sentencetext = data.join(" ")
    }
}
xhr.send()
}

getsentence()

userinput.addEventListener("input", function (e) {
    if (!start) {
        start = Date.now();
    }

    let input = userinput.value.toLowerCase();

    if (input[char] === sentencetext[char]) {
        char++;
    } else {
        spell.innerHTML = `You entered ${input[char]} instead of ${sentencetext[char]}`;
        return;
    }
    spell.innerHTML = `Correct So Far`;

    if (input === sentencetext) {
        end = Date.now();
        let timeTaken = (end - start) / (1000 * 60);

        if (timeTaken > 0) {
            words = char / 5;
            wpm = Math.round(words / timeTaken);
            WPM.innerHTML = `Your WPM is ${wpm}`;
            endTest();
        } else {
            WPM.innerHTML = `Calculating...`;
        }
    }
});

function endTest() {
    userinput.setAttribute("disabled", "");
    p.id = "button";
    p.innerHTML = `<h2 id="start-again">Test Again</h2>`;
    display.appendChild(p)
    start = null;
    end = null;
    words = null;
    wpm = null;
    char = 0;
    startAgain();
}

function startAgain() {
    const replay = document.querySelector("#button");
    replay.addEventListener("click", function (e) {
        e.preventDefault();
        getsentence()
        userinput.removeAttribute("disabled","")
        userinput.value = ''
        spell.innerHTML = ''
        WPM.innerHTML = `WPM will be displayed here`
        display.removeChild(p);
    });
}
