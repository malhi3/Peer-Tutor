var lang_tags = [];
var subj_tags = [];
var input_id = "";

function commaSeparation(){
	input_id = event.target.id;
	//window.alert(input_id);
	var input_field = document.getElementById(input_id);
	var input_string = input_field.value;
	var last_char = input_string.charAt(input_string.length-1);

	if (last_char==","){
		var tag_text = input_string.slice(0, input_string.length-1);
		if (input_id == 'language'){
			lang_tags.push(tag_text);
		} else if (input_id == 'subject') {
			subj_tags.push(tag_text);
		}
		addTag(tag_text);
		input_field.value = '';
		//window.alert(tags);
	}
	return;
}

function deleteTag(event){
	var button_id = event.target.id;
	//window.alert(button_id);
	var index = 0;
	if (input_id == 'language'){
		index = lang_tags.indexOf(button_id);
		if (index !== -1){
			lang_tags.splice(index, 1);
		}
	} else if (input_id == 'subject') {
		index = subj_tags.indexOf(button_id);
		if (index !== -1){
			subj_tags.splice(index, 1);
		}
	}
	var element=document.getElementById(button_id);
	var parent = document.getElementById(input_id+"-entered-tags");
	parent.removeChild(element);
}

function addTag(tag_text){
	var parent_div = document.getElementById(input_id+"-entered-tags");
	var new_button = document.createElement("button");
	new_button.innerHTML = tag_text;
	new_button.setAttribute("id", tag_text);
	new_button.setAttribute("class", "btn");
	new_button.setAttribute("onClick", "deleteTag(event)");
	parent_div.appendChild(new_button);
}

function saveChanges(){
	var updates = {};
	for(var i = 0; i<lang_tags.length; i++){
		for (var j = 0; j<subj_tags.length; j++){
			//window.alert(lang_tags[i] + subj_tags[j]);
			var newSubjKey = db.ref().child(lang_tags[i]).child(subj_tags[j]).push().key
			updates['/'+lang_tags[i]+'/'+subj_tags[j]+'/'+newSubjKey] = user_id;
		}
	}
	db.ref().update(updates);
}
