
const APIplay = async()=>{
    
    try{
        //primero se creara un objeto con las caracteristicas de la API
        let data={
            maxResults: 1,
            key: 'AIzaSyDNVV8AOJyXxUGl1KO1HUNWjDL0cjkhiWE',
            part: 'snippet',
            q:      '0',
            type: 'video',
        }
        const respuesta= await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${localStorage.getItem('URL seleccionada:')}&key=${data.key}`)
        const datos = await respuesta.json()
        console.log(datos)

        const musicContainer = document.querySelector('.box-container')
        let music = document.createElement("div")
        musicContainer.appendChild(music)
        document.querySelector('title').innerHTML=`Reproduciendo - ${datos.items[0].snippet.localized.title}`
        music.innerHTML=`<div class="box">
        <h3 class="cancion1" id="cancion"></h3>
        <p class="artista1" id="artista"></p>
        <div class="caratulaContainer">
            <h2>${datos.items[0].snippet.localized.title}</h2>
            <p>${datos.items[0].snippet.channelTitle}</p>
            <img class="caratula" src="${datos.items[0].snippet.thumbnails.high.url}" alt="">
        </div>
        <div class="audioDuration">
            <div class="start1" id="start">00:00</div>
            <div class="end1" id="end">00:00</div>
        </div>
        <input type="range" min="0" max="100" step="0.1" class="progreso1" value="0"id="progreso">
        <i class="fa-sharp fa-solid fa-bars"></i>
        <i class="fa-sharp fa-solid fa-play desaparecer waos" id="playPause1"></i>
        <i class="fa-solid fa-pause aparecer waos"></i>
        <i class="fa-solid fa-forward-step"></i>
        <input type="range" min="0" max="100" step="0.1" class="volumen" value="100"id="progreso">
    </div>`
        const btnPlay= document.querySelector('.fa-play')
        const btnPause= document.querySelector(".fa-pause")
        const btnGeneral= document.querySelectorAll(".waos")
        btnPause.addEventListener("click",()=>{
            if(player.playVideo()){
                player.pauseVideo()
            }
        })
        btnPlay.addEventListener('click',()=>{
            if(player.pauseVideo()){
                player.playVideo()
            }
        })
        for (let i=0;i<2;i++){
            btnGeneral[i].addEventListener("click",()=>{
                btnPlay.classList.toggle('aparecer')
                btnPlay.classList.toggle('desaparecer')
                btnPause.classList.toggle('aparecer')
                btnPause.classList.toggle('desaparecer')
            })
        
        }
        const btnMenu = document.querySelector(".fa-bars")
        const menu =document.querySelector("#menuDesplegable")
        btnMenu.addEventListener('click',()=>{
            menu.classList.toggle("desplegado")
            menu.classList.toggle("guardado")
            btnMenu.classList.toggle('giro')
        })

        const resRecomended = await fetch(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${localStorage.getItem('URL seleccionada:')}&part=snippet&type=video&key=${data.key}&maxResults=5`)
        const dataRecomended = await resRecomended.json()
        console.log(dataRecomended.items)

        const imgRecomended = document.querySelectorAll('.d-block'),
        titleRecomended = document.querySelectorAll('.titulorecomendado'),
        autoRecomended=document.querySelectorAll('.autorrecomendado')

        let count = 0
        imgRecomended.forEach(imagen => {
            imagen.src = dataRecomended.items[count].snippet.thumbnails.high.url
            titleRecomended[count].innerHTML = `<h5>${dataRecomended.items[count].snippet.title}</h5>`
            autoRecomended[count].innerHTML = `<p>${dataRecomended.items[count].snippet.channelTitle}</p>`
            count +=1
        });
        function obtnURL(){
            for(let i = 0; i<5;i++){
                imgRecomended[i].addEventListener('click',()=>{
                    const ID = dataRecomended.items[i].id.videoId
                    localStorage.setItem("URL seleccionada:",ID)
                    alert('waos')
                    
                })
            }
        }

        obtnURL()
    }
    catch (error){
        console.log("Algo salio mal")
    }
}
APIplay()

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: `${localStorage.getItem('URL seleccionada:')}`,
        playerVars: {
            'autoplay': 1,
            'controls': 1,
            'loop': 1
        },
    events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    let duracion = player.getDuration()    
    setInterval(function(){
        const rango = document.querySelector("#progreso")
        rango.value= player.getCurrentTime()
        rango.max = duracion
        rango.addEventListener('click',()=>{
            player.seekTo(rango.value)
        })
        const end = document.querySelector('#end')
        let hrs = Math.trunc(duracion/60**2)
        let min = Math.trunc(duracion/60-(hrs*60))
        let seg = Math.trunc(duracion-(hrs*3600)-min*60)
        if(seg>=1 && seg<10){
            if(min>=1 && min<10){
                end.innerHTML=`0${min}:0${seg}`
                if(hrs>=1 && hrs<10){
                    end.innerHTML=`0${hrs}:0${min}:0${seg}`
                }
                else if(hrs>10){
                    end.innerHTML=`${hrs}:0${min}:0${seg}`
                }
            }
            else if(min>10){
                end.innerHTML=`${min}:0${seg}`
                if(hrs>=1 && hrs<10){
                    end.innerHTML=`0${hrs}:${min}:0${seg}`
                }
                else if(hrs>10){
                    end.innerHTML=`${hrs}:${min}:0${seg}`
                }
            }
        }
        if(seg>10){
            if(min>=1 && min<10){
                end.innerHTML=`0${min}:${seg}`
                if(hrs>=1 && hrs<10){
                    end.innerHTML=`0${hrs}:0${min}:${seg}`
                }
                else if(hrs>10){
                    end.innerHTML=`${hrs}:0${min}:${seg}`
                }
            }
            else if(min>10){
                end.innerHTML=`${min}:${seg}`
                if(hrs>=1 && hrs<10){
                    end.innerHTML=`0${hrs}:${min}:${seg}`
                }
                else if(hrs>10){
                    end.innerHTML=`${hrs}:${min}:${seg}`
                }
            }
        }
        const start = document.querySelector("#start")
        
        let startHrs = Math.trunc(rango.value/3600) 
        let startMin = Math.trunc((rango.value/60)-(startHrs*60)) 
        let startSeg = Math.trunc(rango.value-(startMin*60)-(startHrs*3600))
        if(startSeg<10){
            start.innerHTML=`0${startMin}:0${startSeg}`
            if(startMin>10 && startMin<=60){
                start.innerHTML=`${startMin}:0${Math.trunc(startSeg)}`
                if(startHrs>=1 && startHrs<10){
                    start.innerHTML=`0${startHrs}:${startMin}:0${startSeg}`
                }
            }
            else if(startHrs>=1 && startHrs<10){
                start.innerHTML=`0${startHrs}:0${startMin}:0${startSeg}`
            }
            
        }
        else if(startSeg>=10 && startSeg<60){
            start.innerHTML=`0${startMin}:${startSeg}`
            if(startMin>10 && startMin<=60){
                start.innerHTML=`${startMin}:${startSeg}`
                if(startHrs>=1 && startHrs<10){
                    start.innerHTML=`0${startHrs}:${startMin}:${startSeg}`
                }
            }
            else if(startHrs>=1 && startHrs<10){
                start.innerHTML=`0${startHrs}:0${startMin}:${startSeg}`
            }
        }
        
    },1000)
    
    let volumen = document.querySelector(".volumen")
    function volumenControl(){
        player.setVolume(volumen.value)
    }
    volumen.addEventListener("click",volumenControl)  

}


