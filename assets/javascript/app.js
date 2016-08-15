  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxHS80MJS4lvmGsm6GKZUfd8duIqgrDlw",
    authDomain: "test-4538a.firebaseapp.com",
    databaseURL: "https://test-4538a.firebaseio.com",
    storageBucket: "test-4538a.appspot.com",
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
	var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var date = "";
var month = 0;


// Capture Button Click
$("#addTrain").on("click", function() {

	// Capture User Inputs and store into variables
	var name = $('#nameinput').val().trim(); 
	var dest = $('#destinput').val().trim(); 
	var time = $('#timeinput').val().trim(); 
	var freq = $('#freqinput').val().trim(); 
	// Console log each of the user inputs to confirm you are receiving them
	console.log(name);
	console.log(dest);
	console.log(time);
	console.log(freq);

	database.ref().push({
		name: name,
		dest: dest,
		time: time,
		freq: freq
		// dateAdded: firebase.ServerValue.TIMESTAMP
	});

	// Don't refresh the page!
	return false;
});

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(childSnapshot) {

	// Log everything that's coming out of snapshot
	console.log(childSnapshot.val());
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().dest);
	console.log(childSnapshot.val().time);
	console.log(childSnapshot.val().freq);
		//made reference to table body
	var table = $('.displayTable');
	var dates = Date(childSnapshot.val().date);
	console.log(dates);
	var mom = moment(new Date(dates)).format("DD/MM/YY");
	console.log("mom =" + mom);

	//populating table (will update by itself thanks to firebases .on() function)
	table.append("<tr>" +
					"<td>" + childSnapshot.val().name + "</td>"+
					"<td>" + childSnapshot.val().dest + "</td>" +
				 	"<td>" + childSnapshot.val().freq+ "</td>"+
				 	"<td>N/A</td>"+
				 	"<td>" +childSnapshot.val().time+ "</td>"+
				 "</tr>");


// Handle the errors
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
});