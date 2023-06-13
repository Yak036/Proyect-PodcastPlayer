
let validUsername = document.querySelector('.userName');
let validPassword = document.querySelector('.password');
let formulario = document.querySelector('.container');
document.querySelector('.questbtn').addEventListener('click',()=>{
    if(validUsername.value !='' && validPassword.value !=''){
        console.log('muy bien');
        let datos = new FormData(formulario);
        console.log(datos.get('validName'))
        fetch('Assets/js/validar.php',{
            method: 'POST',
            body: datos
        })
            .then(dat=>dat.json())
            .then(data=>{
                console.log(data)
            })
    }
    else{
        console.log(false);
    }
})