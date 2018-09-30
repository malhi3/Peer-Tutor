// JavaScript Document

var storageRef = firebase.storage().ref();
var usersRef = storageRef.child('users');

function uploadFile(){
	var profileImg = document.getElementById("profile-img-upload").files[0];
	var imgRef = usersRef.child(user_id);
	window.alert(profileImg.name);
	imgRef.put(profileImg).then(function(snapshot){
		window.alert("Uploaded");
	});
}