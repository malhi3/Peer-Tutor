// JavaScript Document
var db = firebase.database();
var session = "";

document.addEventListener('DOMContentLoaded', function(){
	db.ref().on('value', function(snapshot){
		var langsubj = snapshot.val();
		delete langsubj.Users;
		var languages = document.createElement("select");
		var subjects = document.createElement("select");
		languages.setAttribute("id", "language-dropdown");
		languages.setAttribute("onChange", "langSubjMatch()")
		subjects.setAttribute("id", "subject-dropdown");
		for (var language in langsubj){
			var option = document.createElement("option");
			option.setAttribute("id", language);
			option.setAttribute("value", language);
			option.innerHTML = language;
			languages.appendChild(option);
			console.log(langsubj[language]);
			for (var subject in langsubj[language]){
				// check if it exists
				if (document.getElementById(subject) == null){
					var subjopt = document.createElement("option");
					subjopt.setAttribute("id", subject);
					subjopt.setAttribute("value", subject);
					subjopt.setAttribute("class", language);
					subjopt.style.display = "none";
					subjopt.innerHTML = subject;
					subjects.appendChild(subjopt);
					var subj_div = document.getElementById("subject-selection");
					subj_div.appendChild(subjects);
				}
				var element = document.getElementById(subject);
				element.classList.add(language);
				console.log("Class added: "+language+" to subject: "+subject);

			}
		}
		var lang_div = document.getElementById("language-selection");
		lang_div.appendChild(languages);
		langSubjMatch();
	});
});

function langSubjMatch(){
	const language_dropdown = document.getElementById("language-dropdown");
	var allsubjects = document.getElementById("subject-dropdown").childNodes;
	for (var i=0; i<allsubjects.length; i++){
		allsubjects[i].style.display = "none";
	}
	var subjects = document.getElementsByClassName(language_dropdown.options[language_dropdown.selectedIndex].text);
	for (var j=0; j<subjects.length; j++){
		console.log(subjects);
		subjects[j].style.display="block";
	}
}

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
				//window.alert(snapshot.val()+" Teacher: "+tutorsInSubject[index]);
				if(snapshot.val() == "True"){
					window.alert("Session: "+session+" Teacher:"+tutorsInSubject[index]);
					window.alert(user_id);
					sessionref.set(user_id);
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

