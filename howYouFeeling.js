// [Mr. S] I moved your java script all to one file and reformatted to make it simpler and easier to understand.

// [Mr. S] It's common practice to declare variables at the top of one's code
// especially variables that are used throughout the code, in different functions, etc.
// these are often called "global variables"

// *****************************************************************
// Declare our global variables
// *****************************************************************

//the feelings
var emotion = null;
var quotetext = "Hello World!";
var data = null;
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oDx2S91aoR9lW8vdyHjfUxGptrDZzxWHZ0hdbOAPVxo/edit?usp=sharing';

// *****************************************************************
// Declare/define all our event handlers and other functions
// *****************************************************************

function doTransition_HowAreYouFeeling() {
    keepWaiting = 1;
	while (!data && keepWaiting) {
		keepWaiting = confirm("Data not yet loaded.  Please wait a few seconds...");
	}
	emotion = this.text;
	randQuote2();
}

function doTransition_GotChallenge() {
	callChallenge();
	// this function transitions from the function above to the one below it
}

function callChallenge() {
	var challenges = [
		"Talk to someone new.",
		"Smile to everyone you see for the rest of the day.",
		"Encourage someone who is having a bad day.",
		"Write down what you are grateful for everyday for one week.",
		"Give someone a compliment.",
		"Help a teacher.",
		"Stand up for someone who is being bullied.",
		"Eat lunch with someone who is sitting alone.",
		"Invite someone to sit at your table during lunch.",
		"Say 'hello' to someone you don't know."
	];

	// the different challenges, the list can be added to
	var random = Math.floor(Math.random() * challenges.length);

	$("#challengeDescription").text(challenges[random]);
	// randomizes the challenges in the array above.
	// this function calls the random challenge
}

// https://github.com/jsoma/tabletop

function initTabletop() {
	Tabletop.init({
		key: publicSpreadsheetUrl,
		callback: showInfo,
		simpleSheet: true
	})
}

// [Mr. S] I commented out this second "tabletop" parameter since it is not needed
function showInfo(data2 /*, tabletop*/) {
	//alert("Database loaded.");
	data = data2;
}

// [Mr. S] Erica, this randQuote2 algorithm bucketizes the quotes
// and then picks a quote at random from the appropriate bucket.
// The code has some bugs, but with some more effort, this randQuote2 algorithm will work.
function randQuote2() {

	//alert("Picking a random quote for someone who is " + emotion);

	var emote = [];

	for (var v = 0; v < data.length; v++) {
		var str = data[v].Emotion.toUpperCase();
		if (str.includes(emotion.toUpperCase())) {
		    
		    var quoteObj = {
		        quote: data[v].Quote,
		        author: data[v]["Author of Quote"]
		    };
		     
		     emote.push(quoteObj);
		     
		   // emote.push(data[v].Quote);
		   // emote.push(data[v]["Author of Quote"]);
		    $("<p>").text(emote.length).appendTo("#erica");
		    
		}
	}

	// [Mr. S] Erica, you don't need this loop and if-else ladder.  Just one line of code added to the loop above.

	// [Mr. S] HINT: use the modulus operator "%" to scale a big random integer to the size of the emote array.
	var random = Math.floor(Math.random() * 1000 % emote.length);
	//alert("Chose random number " + random);
	var ran_quote = emote[random].quote;
	var ran_author = emote[random].author;

	/*
	var random = Math.floor(Math.random() * data.length);
	var ran_quote = data[random].Quote;
	var ran_author = data[random]["Author of Quote"];
	 */
	$("#data").text('"' + ran_quote + '"');
	$("#quoteDescription").text("-" + ran_author);
	$("#received").text("You recieved a quote!");
}

// *********************************************************************************
// [Mr. S] Now that our functions and global variables have been
// declared/defined, we can execute some "startup code".
// *********************************************************************************

initTabletop();

// This is a good example of "unobtrusive JavaScript".  You have created
// a layer of separation between the HTML and the JS.  One could register event handlers
// directly in each HTML tag.  For example:
//
//    <input type="text" name="date" onchange="validateDate()" />
//
//  Instead, here you register the event handlers in code!
//  For more info, read https://en.wikipedia.org/wiki/Unobtrusive_JavaScript
//
$(document).ready(function () {

	// Mr. S says: Erica, I've helped you out a little here by rewriting a bit of your code.
	// When I pulled all these event handler registrations into one place, it became clear that
	// you were registering two handlers for every emotion button:
	//
	//   $("#J1").click(doTransition_HowAreYouFeeling);
	//   $("#S2").click(doTransition_HowAreYouFeeling);
	//   ...
	//   $("#J1").click(function() { emotion = "joy"; });
	//   $("#S2").click(function() { emotion = "sad"; });
	//
	// At one time, the doTransition_HowAreYouFeeling function used the "emotion" variable without setting it,
	// meaning the second event handler code needed to always execute first.  This was fragile
	// because not all web browsers will execute the registered handlers in the same order.
	// To fix this, Erica changed doTransition_HowAreYouFeeling to get the emotion directly from
	// the link/button text and store it in the "emotion" variable.  I've deleted the second set of handlers because they are now
	// unnecessary.

	$("#J1").click(doTransition_HowAreYouFeeling);
	$("#S2").click(doTransition_HowAreYouFeeling);
	$("#Ang3").click(doTransition_HowAreYouFeeling);
	$("#C4").click(doTransition_HowAreYouFeeling);
	$("#F5").click(doTransition_HowAreYouFeeling);
	$("#Anx6").click(doTransition_HowAreYouFeeling);
	$("#D7").click(doTransition_HowAreYouFeeling);
	$("#E8").click(doTransition_HowAreYouFeeling);
	$("#P9").click(doTransition_HowAreYouFeeling);

	$("#challengelanding").click(doTransition_GotChallenge);

	//$("#doneChallengebutton").click(doneChallenge_alert);
});
