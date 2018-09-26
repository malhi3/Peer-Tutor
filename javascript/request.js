// JavaScript Document
window.alert("User id:" + user_id);
function submit(){
	var subject = document.getElementById("subject").value;
	var language = document.getElementById("language").value;
	var studentobj = {};
	var teacher = "";
	db.ref(language).on('value', function(snapshot){
		studentobj = snapshot.val();
		for(studentkey in studentobj){
			window.alert(studentobj[studentkey][subject]);
			if(studentobj[studentkey][subject]){
				window.alert("Teacher Found");
				teacher = studentkey;
				db.ref('Users/'+teacher).child('Availability').on('value', function(snapshot){
					for(timekey in snapshot.val()){
						var tutee_time = document.getElementById(timekey);
						var tutee_availability = window.getComputedStyle(tutee_time).getPropertyValue('background-color');
						//window.alert(tutee_availability);
						if (tutee_availability != 'rgb(255, 0, 0)' && snapshot.val()[timekey] == "True"){
							window.alert(teacher);
							break;
						}
					}
				});
			}
		}
	});
}

function updateTeacher(teacherid){
	
}