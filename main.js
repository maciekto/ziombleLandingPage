// select items
let btnLogin = document.querySelector('.loginBtn');
const btnRegistration = document.querySelector('.registrationBtn');
const btnRegistration2 = document.querySelector('.registrationLink');
const backArrowL = document.querySelector('.backBtnHiddenL');
const backArrowR = document.querySelector('.backBtnHiddenR');
// add event listeners
btnLogin.addEventListener('click',loginPanel);
btnRegistration.addEventListener('click',registrationPanel);
btnRegistration2.addEventListener('click',registrationPanel);
backArrowL.addEventListener('click', backToMain);
backArrowR.addEventListener('click', backToMain);
// show login panel function
function loginPanel(){
// remove front layout
    const loginBtn = document.querySelector('.loginBtn');
    const registrationBtn = document.querySelector('.registrationBtn');
    const panels = document.querySelector('.panels');
    panels.removeChild(loginBtn);
    panels.removeChild(registrationBtn);
// select loginBox and add class with style
    const loginBox = document.querySelector('.loginBoxHidden');
    loginBox.className = 'loginBox';
// create form 
    const form = document.createElement('form');
    form.id = 'loginForm';
    loginBox.appendChild(form);
// create inputs in form
// login input
    const inputLogin = document.createElement('input');
    inputLogin.type = 'text';
    inputLogin.placeholder = 'Twój nick';
    inputLogin.className = 'login';
    inputLogin.id = 'login';
    form.appendChild(inputLogin);
// password input
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = "Hasło";
    inputPassword.className = 'haslo';
    inputLogin.id = 'haslo';
    form.appendChild(inputPassword);
// submit button
    const formBtn = document.createElement('input');
    formBtn.type = 'submit';
    formBtn.value = 'Zaloguj';
    formBtn.className = 'formBtn';
    formBtn.id = 'formBtn'
    form.appendChild(formBtn);
// back to front panel button 
    const backBtn = document.querySelector('.backBtnHiddenL');
    backBtn.classList.add('backBtn');
    backBtn.innerHTML = '&#8672;';
// click on button function to send data and event listener
    formBtn.addEventListener('click', login);
    function login(e){
// prevent to reload page after click submit button
        e.preventDefault();
// create objects with values of inputs
        const loginObject = {
            login: inputLogin.value,
            password: inputPassword.value
        };
// sending data to php file by JSON
        fetch('php/loginData.php',{
            method: 'post',
            body: JSON.stringify(loginObject),
            headers:{
                'Content-Type': 'application/json'
            }
        })
// catch response
        .then((res)=> res.json())
// checking if info from php is that everything is okay or not
        .then((data) => {
// condition that checking message from PHP
            if(data[0] == true){
// just write hello and user's nickname
                panels.removeChild(loginBox);
                const loginCorrect = document.createElement('div');
                const textCorrect = document.createTextNode('Witaj: '+data[1]);
                loginCorrect.appendChild(textCorrect);
                panels.appendChild(loginCorrect);
// if he write wrong password or nickname console log 
            }else{
                console.log(data);
            }
        })
// catching error while he wrote wrong data 
        .catch((error) => {
            panels.removeChild(loginBox);
            const loginCorrect = document.createElement('div');
            const textCorrect = document.createTextNode('Niepoprawny login lub hasło');
            loginCorrect.appendChild(textCorrect);
            panels.appendChild(loginCorrect); 
        })
// reset form after everything
        form.reset();
    }
}
function registrationPanel(){
// deleting front panel
    console.log('working');
    const loginBtn = document.querySelector('.loginBtn');
    const registrationBtn = document.querySelector('.registrationBtn');
    const panels = document.querySelector('.panels');
    panels.removeChild(loginBtn);
    panels.removeChild(registrationBtn);
// box and adding style
    const registrationBox = document.querySelector('.registrationBoxHidden');
    registrationBox.className = 'registrationBox';
// create form
    const form = document.createElement('form');
    form.id = "registrationForm";
    registrationBox.appendChild(form);
// login input
    const inputLogin = document.createElement('input');
    inputLogin.type = 'text';
    inputLogin.id = 'login';
    inputLogin.placeholder = 'Nick';
    inputLogin.className = 'login';
    form.appendChild(inputLogin);
// error login when nick already exists
    function loginError(){
        if(document.querySelector('.inputErrorL') == null){
            const loginError = document.createElement('div');
            const text = document.createTextNode('Nick juz istnieje');
            loginError.classList.add('errorLogin');
            loginError.appendChild(text);
            form.appendChild(loginError);
            inputLogin.classList.add('inputErrorL');
            setTimeout(function(){
                inputLogin.classList.remove('inputErrorL');
                form.removeChild(loginError);
            },2000);
        }
    }

// email input
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'Wpisz swój e-mail';
    inputEmail.className = 'email';
    form.appendChild(inputEmail);
// confirm e-mail
    const inputEmailC = document.createElement('input');
    inputEmailC.type = 'email';
    inputEmailC.placeholder = 'Powtórz e-mail';
    inputEmailC.className = 'emailC';
    form.appendChild(inputEmailC);
// password input
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = "Wpisz swoje hasło";
    inputPassword.className = 'haslo';
    form.appendChild(inputPassword);
// password confirm
    const inputPasswordC = document.createElement('input');
    inputPasswordC.type = 'password';
    inputPasswordC.placeholder = "Potwierdź hasło";
    inputPasswordC.className = 'hasloC';
    form.appendChild(inputPasswordC);
// error password, when passwords are different
    function passwordError(){
        if(document.querySelector('.inputErrorP') == null){
            const passwordError = document.createElement('div');
            const text = document.createTextNode('Hasła muszą sie zgadzac');
            passwordError.classList.add('errorPassword');
            passwordError.appendChild(text);
            form.appendChild(passwordError);
            inputPassword.className = 'inputErrorP';
            inputPasswordC.className = 'inputErrorP';
            setTimeout(function(){
                inputPassword.classList.remove('inputErrorP');
                inputPasswordC.classList.remove('inputErrorP');
                form.removeChild(passwordError);
            },2000);
        }
    }
// button input
    const formBtn = document.createElement('input');
    formBtn.type = 'submit';
    formBtn.value = 'Zarejestruj';
    formBtn.className = 'formBtn';
    formBtn.id = 'formBtn'
    form.appendChild(formBtn);
// back button
    const backBtn = document.querySelector('.backBtnHiddenR');
    backBtn.classList.add('backBtn');
    backBtn.innerHTML = '&#8672;';
    registrationBox.appendChild(backBtn);
// submit event listener
    formBtn.addEventListener('click', submit);
// submit function
    function submit (e){
// prevent form from refreshing
        e.preventDefault();
// data to object
        let registrationData = {
            login: inputLogin.value,
            email: inputEmail.value,
            emailC: inputEmailC.value,
            password: inputPassword.value,
            passwordC: inputPasswordC.value
        }
// check if data is correct conditional
        if(registrationData.email == registrationData.emailC && registrationData.password == registrationData.passwordC &&
             registrationData.email != "" &&
             registrationData.emailC != "" &&
             registrationData.password != "" &&
             registrationData.passwordC != "" &&
             registrationData.email.includes("@") === true
            ){
// sending data to PHP to check if nickname is availible
            fetch('php/loginCheck.php',{
                method: 'post',
                body: JSON.stringify(registrationData),
                headers:{'Content-Type': 'application/json'}
            })
// response
            .then((res) => res.text())
// response in text
            .then((text) => {
// checking if response is true and nickname is availible
                if(text === "true"){
                    loginError();
                }else{
// sending all data to PHP file when it goes to database
                    fetch('php/registrationData.php',{
                        method: 'post',
                        body: JSON.stringify(registrationData),
                        headers:{'Content-Type': 'application/json'}
                    })
// response
                    .then(function(res){
                        return res.text();
                    })
// console log for check
                    .then(function(text){
                        console.log(text);
                    });
// reaload page user can log in
                    location.reload();
                }
            })
// catching error
            .catch((err) => console.log(err));
// if inputs values are wrong call functions
        }else if(registrationData.email != registrationData.emailC){
            emailError("Emaile muszą sie zgadzać");
        }else if(registrationData.password != registrationData.passwordC){
            passwordError();
        }else if(registrationData.email.includes("@") === false){
            emailError("Emaile musza miec w sobie @");
        }
    }
}
function backToMain(){
// reload for back to main panel front page
    window.location.reload();
}

