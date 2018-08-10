 // Initialize Firebase
var config = {
    apiKey: "AIzaSyDboCQrnQ8A6Me56I3kpz-i9tR6wDR6R7A",
    authDomain: "first-project-b815a.firebaseapp.com",
    databaseURL: "https://first-project-b815a.firebaseio.com",
    projectId: "first-project-b815a",
    storageBucket: "first-project-b815a.appspot.com",
    messagingSenderId: "697230572231"
};

firebase.initializeApp(config);


var database = firebase.database();

function updateTime() {
    $(".masterClock").text(moment().format("HH:mm:ss"));
    setInterval(updateTime, 1000);
}
updateTime();


// 2. Button for adding Employees
$(".btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainNameInput = $("#trainName").val().trim().toUpperCase();
    var destinationInput = $("#destination").val().trim().toUpperCase();
    var firstTrainTimeInput = $("#firstTrainTime").val().trim();
    var frequencyInput = $("#frequency").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        trainName: trainNameInput,
        destination: destinationInput,
        firstTrainTime: firstTrainTimeInput,
        frequency: frequencyInput
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // // Logs everything to console
    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrainTime);
    // console.log(newTrain.frequency);

    alert("New Train successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainNameInput = childSnapshot.val().trainName;
    var destinationInput = childSnapshot.val().destination;
    var firstTrainTimeInput = childSnapshot.val().firstTrainTime;
    var frequencyInput = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainNameInput);
    console.log(destinationInput);
    console.log(firstTrainTimeInput);
    console.log(frequencyInput);

    // time calculations
    var currentTime = moment().format("HH:mm");
    startTime = moment(firstTrainTime);
    var timeDifference = moment()-moment(firstTrainTimeInput, "HH:mm");
    var minutesDifference = ((timeDifference/1000)/60);
    var remainder = (minutesDifference%frequencyInput);
    var minutesTil = (frequencyInput-remainder);
    
    console.log("Current time is: " + currentTime);
    console.log("Start time was: " + firstTrainTimeInput);
    console.log("Time Difference in minutes: " + minutesDifference);
    console.log("Minutes until: " + minutesTil);

    


    // train arrival calculation
    var trainArrival = moment().add(minutesTil, "m").format("HH:mm");
    console.log("Next train arrives at " + trainArrival)
    
    // time until next train arrives
    var remainderMinutes = (Math.round(minutesTil));
    console.log("Remainder: " + remainderMinutes);
    

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainNameInput),
    $("<td>").text(destinationInput),
    $("<td id='onTime'>").text("ON TIME"),
    $("<td>").text(trainArrival),
    $("<td>").text(remainderMinutes),
    $("<td>").text(frequencyInput)
  );

  // Append the new row to the table
  $(".table > tbody").append(newRow);

})