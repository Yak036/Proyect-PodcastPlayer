//Constante inicio vinculado al boton superior en el documento HTML
const inicio = document.querySelector('.inicio');
// Evento de click: cuando se hace click en el boton de la barra superior llamado INICIO
// Automaticamente la pagina sube hasta arriba
inicio.addEventListener('click',()=>{ 
    document.querySelector('body').animate({
        scollTop: '0px'
    }, 300) 
});
// constante VerMas vinculada al texto 'vermas' en el HTML
const verMas = document.querySelector('.texEye');
//Constante ojitosaltarin vinculada literalmente al unico ojo de la pagina
const ojitoSaltarin =document.querySelector('#eye');
//Event listener para que cada vez que se coloque el raton encima del
// texto Ver Mas cambiara de color el y el ojito
verMas.addEventListener('mouseout',()=>{
    const verMas = document.querySelector('.texEye');
    const ojitoSaltarin =document.querySelector('#eye');
    verMas.style.color='black';
    verMas.style.transition= '0.5s';
    ojitoSaltarin.style.backgroundColor= 'transparent';
    ojitoSaltarin.style.borderRadius= '100%';
    ojitoSaltarin.style.transition= '0.5s';
})
//event listener para devolver el color natural de las dos constantes
verMas.addEventListener('mouseover',()=>{
    const verMas = document.querySelector('.texEye');
    const ojitoSaltarin =document.querySelector('#eye');
    verMas.style.color='#1ee92f';
    verMas.style.transition= '0.5s';
    ojitoSaltarin.style.backgroundColor= '#1ee92f';
    ojitoSaltarin.style.borderRadius= '100%';
    ojitoSaltarin.style.transition= '0.5s';
})

class music{
    constructor(id,nombre,artista,nombreDelArchivo){
        this.id = id;
        this.nombre = nombre;
        this.artista = artista;
        this.cancion = new Audio(`Assets/Audio/Music/${nombreDelArchivo}`);
        
    }
}

//Funcion que genera el Titulo, artista y duracion de la cancion
function crearCancion(cancion,num){
    //Query selector para buscar y suplantar el lugar donde estara el nombre de la cancion
    document.querySelector(`.cancion${num}`).className +=` ${cancion.id}`;
    document.querySelector(`.${cancion.id}`).innerHTML =`${cancion.nombre}`;
    //Query selector para buscar y suplantar el lugar donde estara el artista
    document.querySelector(`.artista${num}`).className +=` artista${cancion.id}`;
    document.querySelector(`.artista${cancion.id}`).innerHTML =`${cancion.artista}`;
    //De aqui para abajo solo vincula los botones de pause play y los inputs de range
    document.querySelector(`.progreso${num}`).className+=` de${cancion.id}`;
    const range = document.querySelector(`.de${cancion.id}`)
    
    //Importante cargar los metadatos de un archivo para poder acceder a su duracion maxima
    //esta funcion de flecha calcula su duracion en minutos y segundos para enviarlos al documento
    //HTML
    cancion.cancion.onloadedmetadata= ()=>{
        let min = Math.trunc(cancion.cancion.duration/60)
        let seg = Math.trunc(cancion.cancion.duration-(60*min))
        document.querySelector(`.end${num}`).className +=` end${cancion.id}`
        if(min<10 && seg>=10){
            document.querySelector(`.end${cancion.id}`).innerHTML = `${min}:${seg}`
        }
        else if(min<10 && seg>=10){
            document.querySelector(`.end${cancion.id}`).innerHTML = `0${min}:${seg}`
        }
        else if(seg<10 && min<10){
            document.querySelector(`.end${cancion.id}`).innerHTML = `0${min}:0${seg}`
        }
        

        //Esto solo marca que tan largo sera el input tipe range
        range.max=`${cancion.cancion.duration}`
    }   

    //Event listener para que cada vez que el tiempo de la cancion transcurra el rango aumente
    range.addEventListener('change',()=>{
        cancion.cancion.currentTime = range.value
    })
    //este seria el contador de la musica, va aumentando segun en donde vaya la musica
    setInterval(()=>{
        range.value = cancion.cancion.currentTime
        if(cancion.cancion.currentTime<10){
            document.querySelector(`.start${num}`).innerHTML = `00:0${Math.trunc(cancion.cancion.currentTime)}`                
        }
        else if(cancion.cancion.currentTime>=10 && cancion.cancion.currentTime<60){
            document.querySelector(`.start${num}`).innerHTML = `00:${Math.trunc(cancion.cancion.currentTime)}`
        }
        else if(cancion.cancion.currentTime>=60){
            document.querySelector(`.start${num}`).innerHTML = `0${Math.trunc(cancion.cancion.currentTime/60)}:${Math.trunc((cancion.cancion.currentTime-(Math.trunc(cancion.cancion.currentTime/60))*60))}`
            if(cancion.cancion.currentTime-(Math.trunc(cancion.cancion.currentTime/60))*60<10){
                document.querySelector(`.start${num}`).innerHTML = `0${Math.trunc(cancion.cancion.currentTime/60)}:0${Math.trunc((cancion.cancion.currentTime-(Math.trunc(cancion.cancion.currentTime/60))*60))}`
            }
        }
    },1000)
    //Boton play pause
    const playpause = document.querySelector(`#playPause${num}`)
    playpause.addEventListener('click',()=>{
        if(cancion.cancion.paused==true){
            cancion.cancion.play()
        }
        else if(cancion.cancion.paused==false){
            cancion.cancion.pause()
        }
    })
}
const HotGirl = new music("HotGirl","Hot Girl Speed Up",'black bear',"hot girl bummer - blackbear (Sped up).mp3");
crearCancion(HotGirl,1)

const hourseOfMemories = new music('hourseOfMemories','hourse of memories','Panic! At The Disco','house of memories  panic at the disco (español).mp3')
crearCancion(hourseOfMemories,2)

const maryOnACross = new music('MaryOnACross','mary on a cross','Ghost','Ghost - Mary On A Cross.mp3')
crearCancion(maryOnACross,3)

