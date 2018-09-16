// JavaScript 
var db = firebase.database()
var user_id = "Username";
var availability_ref = db.ref(user_id+"/Availability");
var availability = {};


function init(){
	//window.alert("init");
	availability_ref.on('value', function(snapshot){
		//window.alert("init ref");
		availability = snapshot.val();
		window.alert("val initialised");
		changeBtnStat();
	});
}

function changeBtnStat(){
	var div = document.getElementById("container");
	var loader = document.getElementById("loader");
	var key = "";
	var i = 1;
	for(key in availability){
		var btn_id = key;
		var btn_val = availability[key];
		//window.alert(i);
		var btn = document.getElementById(btn_id);
		if (btn_val == "True"){
			//window.alert(btn_id);
			btn.style.backgroundColor = "none";
		} else if (btn_val == "False") {
			btn.style.backgroundColor = "red";
		}
		i+=1;
	}
	div.style.display = "block";
	loader.style.display = "none";
}

function toggleColor(){
	var btn_id = event.target.id;
	var btn = document.getElementById(btn_id);
	var update = document.getElementById("update-changes");
	var background = btn.style.backgroundColor;
	if (background == ""){
		btn.style.backgroundColor = "red";
		availability[btn_id] = "False";
	} else if (background == "red"){
		btn.style.backgroundColor = "";
		availability[btn_id] = "True";
	}
	update.style.display = "block";
}

function updateChanges(){
	//window.alert(availability["mon-lunch"]);
	var update_btn = document.getElementById("update-changes");
	update_btn.style.backgroundColor = "#B5B5B5";
	var updates = {};
	updates[user_id+"/Availability"] = availability;
	db.ref().update(updates, function(error){
		if(error){
			window.alert("Failed");
		} else {
			//window.alert("Success");
			update_btn.style.display = "none";
			update_btn.style.backgroundColor = "#E2E2E2";
		}
	});
}