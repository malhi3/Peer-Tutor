// JavaScript Document
function uploadFile(){
	var profileImg = document.getElementById("profile-img-upload").files[0];
	var imgRef = usersRef.child(user_id);
	window.alert(profileImg.name);
	imgRef.put(profileImg).then(function(snapshot){
		window.alert("Uploaded");
	});
}

function toggleProfileUploadVis(){
	var uploadDiv = document.getElementById("profile-upload");
	if (uploadDiv.style.display == "none"){
		uploadDiv.style.display = "block";
	} else if (uploadDiv.style.display == "block") {
		uploadDiv.style.display = "none";
	}
}