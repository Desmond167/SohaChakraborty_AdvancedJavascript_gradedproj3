var randomParagraph = Math.max(1, Math.floor(Math.random() * 3));
var paragraphSnippet = document.getElementById("paragraphSnippet");
var testStarted = false;
var countDownTimer = document.getElementById("timer");
countDownTimer.innerHTML = "0 Seconds Passed";

fetch('./paragraphs/' + randomParagraph + '.txt')
  .then(response => response.text())
  .then(function(data){
    //   console.log(data);
    paragraphSnippet.innerHTML = data;
})
  .catch(error => console.log(error));

function getErrorCount(str1, str2){ 
let diff= 0;
str2.split('').forEach(function(val, i){
    if (val != str1.charAt(i))
    diff += 1 ;         
});
return diff;
}

function test() {
    testStarted = true;
     var testEndTime = new Date().getTime() + 60000;
     var interval = window.setInterval(function(){
        //  console.log(testEndTime - new Date().getTime());
        if (testEndTime - new Date().getTime() < 0) {

            clearInterval(interval);
            testFinished();
        }
        if (testStarted === true) {
            // console.log("Test Started");
            let distance = testEndTime - new Date().getTime();
            
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countDownTimer.innerHTML = Math.max(0, seconds) + " Seconds Passed";

        }
      }, 1000);
    // testFinished();
}

function testFinished() {
    document.getElementById("checkResult").disabled = false;

    let givenText = paragraphSnippet.innerHTML.replace(/ /g, "");

    let textnippet = document.getElementById("exampleFormControlTextarea1");

    let wordsPerMinute = textnippet.value.split(" ").length;

    let tempText = textnippet.value.replace(/ /g, "");
    let charactersPerMinute = tempText.length;

    let wordsDiv = document.getElementById("wordsPerMinute");
    let characterDiv = document.getElementById("charactersPerMinute");
    let errorCountDiv = document.getElementById("errorCount");
    let accuracyDiv = document.getElementById("accuracy");

    wordsDiv.innerHTML = "Words Per Minute : " + wordsPerMinute;
    characterDiv.innerHTML = "Characters Per Minute : " + charactersPerMinute;
    errorCountDiv.innerHTML = "You have typed " + getErrorCount(givenText, tempText) + " wrong Characters";
    accuracyDiv.innerHTML = "You have achieved an accuracy of " + (100 * (1 - (getErrorCount(givenText, tempText)/tempText.length))).toFixed(2) + "%";

}