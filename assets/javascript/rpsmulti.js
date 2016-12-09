 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDWHNUpaIrT9NRRS31uPoKE0uL-Bet4-mM",
    authDomain: "rps-multiplayer-69540.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-69540.firebaseio.com",
    storageBucket: "rps-multiplayer-69540.appspot.com",
    messagingSenderId: "731262348280"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking
var connectionsRef = database.ref("/connections"); //our object to store list of connections
var connectedRef = database.ref(".info/connected"); //firebase object that listens for connections

// --------------------------------------------------------------
//Firebase syntax code
// Add ourselves to presence list when online.
// When firebase detects a new connection and updates it's special object, run this to update our object
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    var cookieKey = con.getKey();
    localStorage.setItem("rpsKey", cookieKey);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});
// Number of online users is the number of objects in the presence list.
function getCookieValue(rpsPlayer, b) {
    b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

var p1Key;
var p2Key;
var player;


      // When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {
	var key = localStorage.getItem("rpsKey");
	var n=snap.numChildren();
   if(snap.numChildren()===1){
   	//code to display Player 1
   	localStorage.setItem("rpsPlayer", 1);
   	//p1Key = key;
   	//console.log(p1Key);
   	player=1;

   } else if(snap.numChildren()===2 && !player){
   	//code to display Player 2
   	
   	localStorage.setItem("rpsPlayer", 2);
   	// p2Key = key;
   	// console.log(p2Key);
   	player=2;


   } else if(snap.numChildren()>2){
   	//code to display that the game is full
   	
   	localStorage.setItem("rpsPlayer", n);

   };

   if(player==1){
   		console.log("you would be player 1");
   		$("#message").html("Please enter your name to begin.");
   } else if (player==2){
   		console.log("you would be player 2");
   	  	$("#message").html("Waiting on Player 1.");
   } else {
   	console.log("the game is full");
   		$("#message").html("You are player "+(n-2)+"in the queue.");
   };

}, function(errorObject) {

// If any errors are experienced, log them to console.
      console.log("The read failed: " + errorObject.code);
    });


