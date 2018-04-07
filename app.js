var trains = [];
var config = {
    apiKey: "AIzaSyDdHJ8PBVcImJaOri-BHI5dyagwGERp9JA",
    authDomain: "unc-coding-bootcamp-hw-7.firebaseapp.com",
    databaseURL: "https://unc-coding-bootcamp-hw-7.firebaseio.com",
    projectId: "unc-coding-bootcamp-hw-7",
    storageBucket: "",
    messagingSenderId: "641751974467"
};
firebase.initializeApp(config);
var database = firebase.database().ref();
database.on("value", function(snapshot) {
	trains = JSON.parse(snapshot.val().trains);
	updateSchedule;
});
$("#submit-button").on("click", function() {
	event.preventDefault();
	var trainName = $("#train-name").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrainTime = moment($("#first-train-time").val().trim(), "hh:mm").subtract(1, "years");
	var frequency = parseInt($("#frequency").val().trim());
	var difference = moment().diff(moment(firstTrainTime), "minutes");
	var remainder = difference % frequency;
	var minutesTill = frequency - remainder;
	var nextTrain = moment().add(minutesTill, "minutes");
	var train = {
		trainName: trainName,
		destination: destination,
		frequency: frequency,
		nextArrival: moment(nextTrain).format("h:mm A"),
		minutesAway: minutesTill
	};
	trains.push(train);
	$("#train-name").val("");
	$("#destination").val("");
	$("#first-train-time").val("");
	$("#frequency").val("");
	updateSchedule();
	database.set({trains: trains})
})
function updateSchedule() {
	$(".listing").remove();
	for (let i = 0; i < trains.length; i++) {
		var tr = $("<tr>");
		tr.addClass("listing");
		tr.append("<td>" + trains[i].trainName + "</td>");
		tr.append("<td>" + trains[i].destination + "</td>");
		tr.append("<td>" + trains[i].frequency + "</td>");
		tr.append("<td>" + trains[i].nextArrival + "</td>");
		tr.append("<td>" + trains[i].minutesAway + "</td>");
		$("#schedule").append(tr);
	}
}