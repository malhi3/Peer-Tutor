
    var config = {
    apiKey: "AIzaSyAcgOHaFQpjPsTle58G1S4RBhFctczdLIk",
    authDomain: "peer-tutor-2c1c6.firebaseapp.com",
    databaseURL: "https://peer-tutor-2c1c6.firebaseio.com",
    projectId: "peer-tutor-2c1c6",
    storageBucket: "peer-tutor-2c1c6.appspot.com",
    messagingSenderId: "741724293002"
  };
  firebase.initializeApp(config);


document.addEventListener('DOMContentLoaded', () => {
    console.log('Add loaded')

    var DBref = firebase.database().ref()
    var Strref = firebase.storage().ref()
    
    const signInButton = document.getElementById('sign-in-button')
    const signUpButton = document.getElementById('sign-up-button')

    const loginModal = document.getElementById('login-box')
    const registerModal = document.getElementById('register-box')

    const loginModalEmail = document.getElementById('sign-in-email')
    const loginModalPwd = document.getElementById('sign-in-pwd')
	const loginModalType = document.getElementById('signin-tutee-tutor-selection')

    const registerModalName = document.getElementById('sign-up-name')
    const registerModalEmail = document.getElementById('sign-up-email')
    const registerModalPwd = document.getElementById('sign-up-pwd')
	const registerModalType = document.getElementById('signup-tutee-tutor-selection')

    const loginModalSubmit = document.getElementById('sign-in-submit')
    const registerModalSubmit = document.getElementById('sign-up-submit')

    const loginRegisterButton = document.getElementById('login-register-button')
    const registerLoginButton = document.getElementById('register-login-button')

    const loginModalClose = document.getElementById('close-login-modal')
    const registerModalClose = document.getElementById('close-register-modal')

    const heroEmail = document.getElementById('sign-up-field')
    const emailMessage = document.getElementById('email-message')

    const left = document.getElementById('left')
    const right = document.getElementById('right')


    

    loginRegisterButton.onclick = () => {
        loginModal.style.display = 'none'
        registerModal.style.display = 'block'
    }

    registerLoginButton.onclick = () => {
        loginModal.style.display = 'block'
        registerModal.style.display = 'none'
    }

    

    registerModalSubmit.onclick = () => {
        var promise = firebase.auth().createUserWithEmailAndPassword(registerModalEmail.value, registerModalPwd.value)
        promise.catch((err) => {
            console.log(err.message)
        })
        promise.then((user) => {
            var id = user.user.uid
            //var randomID = makeID()
			var tuteeOrTutor = registerModalType.options[registerModalType.selectedIndex].value
			//window.alert(tuteeOrTutor)
			var availability = {
				'mon-lunch': 'True',
				'tue-lunch': 'True',
				'wed-lunch': 'True',
				'thu-lunch': 'True',
				'fri-lunch': 'True',
				'mon-aftsch': 'True',
				'tue-aftsch': 'True',
				'wed-aftsch': 'True',
				'thu-aftsch': 'True',
				'fri-aftsch': 'True'
			}
            DBref.child('Users').child(id).set({
                'name': registerModalName.value,
                'userID': id,
                'email': registerModalEmail.value,
                'pwd': registerModalPwd.value,
				'Availability': availability,
				'userType': tuteeOrTutor
            })
			if (tuteeOrTutor == 'Tutor'){
            	window.location = 'templates/dashboard.html'
			} else if (tuteeOrTutor == 'Tutee'){
				window.location = 'templates/tuteehome.html'
			}
        })
    }

    loginModalSubmit.onclick = () => {
        var promise = firebase.auth().signInWithEmailAndPassword(loginModalEmail.value, loginModalPwd.value)
        promise.catch((err) => {
            console.log(err.message)
        })
        promise.then((user) => {
            console.log(user)
			var tuteeOrTutor = loginModalType.options[loginModalType.selectedIndex].value
			if (tuteeOrTutor == 'Tutor'){
            	window.location = 'templates/dashboard.html'
			} else if (tuteeOrTutor == 'Tutee'){
				window.location = 'templates/tuteehome.html'
			}
        })
    }

    loginModalClose.onclick = () => {
        loginModal.style.display = 'none'
        left.style.opacity = 1
        right.style.opacity = 1
    }

    registerModalClose.onclick = () => {
        registerModal.style.display = 'none'
        left.style.opacity = 1
        right.style.opacity = 1
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function makeID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 16; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

})