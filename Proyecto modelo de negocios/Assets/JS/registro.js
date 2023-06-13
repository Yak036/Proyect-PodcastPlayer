const expresiones = {
    EnombreApellido: /^[A-Z][a-z]+(\s[A-Z][a-z]+)?$/,
    Eusuario: /^[a-zA-Z0-9_!@#$%^&*()\-+=<>?,.]{4,20}$/,
    Egmail:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,40})$/,
    Econtraseña:/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-zA-Z0-9]).{5,40}$/
}

let quest = document.querySelectorAll('.quest');
let error = document.querySelectorAll('ul')

let nombreApellido = document.querySelector('.nombre'),
    usuario = document.querySelector(".userName"),
    gmail = document.querySelector('.gmail'),
    password = document.querySelector('.password'),
    passwordConf = document.querySelector('.password'+'.confir'),
    boton = document.querySelector('.questbtn')

let confirmacion = 0

for(let i=0;i<quest.length;i++){
    quest[i].addEventListener('blur',()=>{
        if(confirmacion<=-1){
            confirmacion = 0
            
        }
        else if(confirmacion>10){
            confirmacion = 10
        }
        switch(i){
            case 0:
                if(expresiones.EnombreApellido.test(nombreApellido.value)==true){
                    confirmacion +=2
                    quest[i].style.borderBottom= "2px solid #1ee92f",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='none'
                }
                else{
                    confirmacion -= 1; 
                    quest[i].style.borderBottom= "2px solid red",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='list-item'
                };
                break;
            case 1:
                if(expresiones.Eusuario.test(usuario.value)){
                    confirmacion +=2
                    quest[i].style.borderBottom= "2px solid #1ee92f",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='none'

                }
                else{
                    confirmacion -= 1; 
                    quest[i].style.borderBottom= "2px solid red",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='list-item'
                };
                break;
            case 2:
                if(expresiones.Egmail.test(gmail.value)){
                    confirmacion +=2
                    quest[i].style.borderBottom= "2px solid #1ee92f",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='none'
                }
                else{
                    confirmacion -= 1; 
                    quest[i].style.borderBottom= "2px solid red",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='list-item'
                };
                break;
            case 3:
                if(expresiones.Econtraseña.test(password.value)){
                    confirmacion +=2
                    quest[i].style.borderBottom= "2px solid #1ee92f",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='none'
                }
                else{
                    confirmacion -= 1; 
                    quest[i].style.borderBottom= "2px solid red",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='list-item'
                };
                break;
            case 4:
                if(password.value==passwordConf.value && password.value !=''){
                    confirmacion +=2
                    quest[i].style.borderBottom= "2px solid #1ee92f",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='none'
                }
                else{
                    confirmacion -= 1; 
                    quest[i].style.borderBottom= "2px solid red",
                    quest[i].style.transition= '0.5s'
                    error[i].style.display='list-item'
                };
                break;
        }
    })
}
let formulario = document.querySelector('.container')
boton.addEventListener('click',()=>{
    if(confirmacion>=10){
        console.log('me diste click')
        let datos= new FormData(formulario)
        console.log(datos.get('nombreApellido'))
        fetch('Assets/js/post.php',{
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(data=>{
                console.log(data)
            })
    }
})

