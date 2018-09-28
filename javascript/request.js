// JavaScript Document
var teacherid = "";
var session = "";
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
				availability_ref = db.ref('Users/'+teacher).child('Availability');
				availability_ref.on('value', function(snapshot){
					for(var timekey in snapshot.val()){
						var tutee_time = document.getElementById(timekey);
						var tutee_availability = window.getComputedStyle(tutee_time).getPropertyValue('background-color');
						//window.alert(tutee_availability);
						if (tutee_availability != 'rgb(255, 0, 0)' && snapshot.val()[timekey] == "True"){
							window.alert("Teacher: "+teacher+" Time: "+timekey);
							//updateTeacher(teacher, timekey);
							availability_ref.child(timekey);
							break;
						}
					}
				});
			}
		}
	});
}