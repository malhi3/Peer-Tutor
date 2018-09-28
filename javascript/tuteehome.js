// JavaScript Document
var db = firebase.database();
var userid = "";
var userAvailabilityRef;
var session = "";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	 userid = user.uid;
	 userAvailabilityRef = db.ref('Users/').child(userid).child('Availability');
  } else {
    window.alert("Not initialised");
  }
});

function togglePopUp(){
	var popUp = document.getElementById("popup-form");
	if (popUp.style.display == "none"){
		session = event.target.id;
		popUp.style.display = "block";
	} else if(popUp.style.display=="block"){
		popUp.style.display = "none";
	}
}

function findTutor(){
	window.alert(session);
	var subject = document.getElementById("subject").value;
	var language = document.getElementById("language").value;
	db.ref(language).child(subject).on('value', function(snapshot){
		var tutorsInSubject = snapshot.val();
		var flag = true;
		for(var index in tutorsInSubject){
			var sessionref = db.ref('Users').child(tutorsInSubject[index]).child('Availability').child(session);
			sessionref.on('value', function(snapshot){
				if(snapshot.val() == "True"){
					window.alert("Session: "+session+" Teacher:"+tutorsInSubject[index]);
					sessionref.set(userid);
					userAvailabilityRef.child(session).set(tutorsInSubject[index]);
					flag = false;
				}
			});
			if(flag==false){
				break;
			}
		}
	});
	//db.ref('Users').orderByChild('Availability/'+session);
}