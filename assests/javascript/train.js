// Initialize Firebase
var config = {
     apiKey: "AIzaSyCyGNw1mbFloNA8zwL2txjENxnpQjYlkXc",
    authDomain: "train-c0734.firebaseapp.com",
    databaseURL: "https://train-c0734.firebaseio.com",
    projectId: "train-c0734",
    storageBucket: "train-c0734.appspot.com",
    messagingSenderId: "360595771675",
    appId: "1:360595771675:web:e3c837455e1470cd"
  };

firebase.initializeApp(config);

var database = firebase.database();

//  Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = $("#first-input").val().trim(); 
  var trainFre = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newtrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFre,
  };

  // Uploads employee data to the database
  database.ref().push(newtrain);

  // Logs everything to console
  console.log(newtrain.name);
  console.log(newtrain.dest);
  console.log(newtrain.first);
  console.log(newtrain.freq);

  //alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFirst = childSnapshot.val().first;
  var trainFre = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFre);

   // First Time (pushed back 1 year to make sure it comes before current time)
   var startTimeConverted = moment(trainFirst, "hh:mm").subtract(1, "years");

   // Current Time
   var currentTime = moment();

   // Difference between the times
   var diffTime = moment().diff(moment(startTimeConverted), "minutes");

   // Time apart (remainder)
   var tRemainder = diffTime % trainFre;

   // Minute(s) Until Train
   var tMinutesTillTrain = trainFre - tRemainder;

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   var catchTrain = moment(nextTrain).format("HH:mm");


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFre),
    $("<td>").text(catchTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

