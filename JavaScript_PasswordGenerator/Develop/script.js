// Assignment Code
let generateBtn = document.querySelector("#generate");

function passwordSet(){

    let password_config_array = [
        {q: "Do you want LOWER case in your password", a: '', type : 'abcdefghijklmnopqrstuvwxyz'  },
        {q: "Do you want UPPER case in your password",a: '', type : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'   },
        {q: "Do you want NUMERIC NUMBERS case in your password",a: '', type : '1234567890'  },
        {q: "Do you want SPECIAL CHARACTERS in your password", a: '',type : '!"#$%&\'()*+,-./:;<=>?@[]^_\`{|}~"'  }

    ]

    let passLen = prompt(
        'enter password length', 8
    );

    let true_counter = 0;

    console.log(parseInt(passLen))

    while (isNaN(parseInt(passLen))  || parseInt(passLen) < 8 || parseInt(passLen) >  128 ) {

        passLen = prompt(
            're-enter \n not valid inputs \n ' +
            'password length must be longer than 8 \n' +
            'and can not be NaN'
        )

    }

    let passConfig_questions = [
        {q: "Do you want LOWER case in your password",  a: true, b:false},
        {q: "Do you want UPPER case in your password",  a: true, b:false},
        {q: "Do you want NUMERIC NUMBERS case in your password",  a: true, b:false},
        {q: "Do you want SPECIAL CHARACTERS in your password",  a: true, b:false}

    ]



    let askQuestionsLoop = function (){
        let index = 0;
        for (let question of passConfig_questions){
            const userChoice = confirm(question.q)
            if (userChoice === question.a){
                password_config_array[index].a = question.a;
                index++
            }else{
                password_config_array[index].a = question.b;
                index++
            }

        }
        console.log(password_config_array)
    }

    askQuestionsLoop()

    for (let element of password_config_array){
        if ((element.a) === true){
            true_counter +=1;
        }


        
    }


    let myPassword = '';
    while (myPassword.length < passLen){
        for (let element of password_config_array){

            if (element.a === true){
                let random = Math.floor(Math.random() * element.type.length)
                myPassword += element.type[random]
                console.log(myPassword)
                console.log(myPassword.length)
            }
        }

    }

    // https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
    String.prototype.shuffle = function () {
        var a = this.split(""),
            n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }

    myPassword = myPassword.shuffle()
    console.log(myPassword)

return myPassword;

}




// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}





function generatePassword(){
    password = passwordSet();
    return password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);





//