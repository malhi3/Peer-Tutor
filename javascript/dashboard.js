// JavaScript 
var db = firebase.database()
var user_id = "";
var availability = {};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	init();
  } else {
    window.alert("Not initialised");
  }
});



function init(){
	//window.alert("init");
	var user = firebase.auth().currentUser;
	if (user!=null){
		user_id = user.uid;
		var user_ref = db.ref('Users/'+user_id);
	}
	
	var availability_ref = user_ref.child('Availability');
	
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
	//window.alert(user_id);
	updates['Users/'+user_id+"/Availability"] = availability;
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