const btnMenu = document.querySelector(".fa-bars")
const menu =document.querySelector("#menuDesplegable")
btnMenu.addEventListener('click',()=>{
    menu.classList.toggle("desplegado")
    menu.classList.toggle("guardado")
    btnMenu.classList.toggle('giro')
})

let loading = document.querySelector("#loading")

const musicContainer = document.querySelector('#musicContainer')
let music = document.createElement("div")
APIsearch = async(busqueda)=>{
    
        //con la funcion asyncrona y la etiqueta try
    //se esperara la respuesta de la API
    //try significa si la respuesta tiene exito la llamara
    try{
        //primero se creara un objeto con las caracteristicas de la API
        let data={
            maxResults: 30,
            key: 'AIzaSyDNVV8AOJyXxUGl1KO1HUNWjDL0cjkhiWE',
            part: 'snippet',
            q:      busqueda,
            type: 'video',
            videoCategoryId: '24',
            lenguaje: 'es',
            orden: 'viewCount'
        }
        //await espera, fetch promesa, espera la promesa que traera la api
        //con el link y las caracteristicas del objeto que se creo
        //se le dira a la API que datos traer
        const respuesta = await fetch(`https://www.googleapis.com/youtube/v3/search?viewCount=${data.orden}&relevanceLanguage=${data.lenguaje}&videoCategoryId=${data.videoCategoryId}&part=${data.part}&type=${data.type}&q=${data.q}&maxResults=${data.maxResults}&key=AIzaSyDNVV8AOJyXxUGl1KO1HUNWjDL0cjkhiWE`);
        
        //luego esos datos seran pasado a un formato mas facil de leer el cual es .json
        const datos = await respuesta.json()
        
        for(let i = 0;data.maxResults>i;i++){
            const respuesta2= await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${datos.items[i].id.videoId}&key=${data.key}`)
            const datos2 = await respuesta2.json()
            const musicContainer = document.querySelector('#musicContainer')
            let music = document.createElement("div")
            musicContainer.appendChild(music)
            music.innerHTML=`<div class="musicPreview">
                                <img src="${datos.items[i].snippet.thumbnails.high.url}" alt="">
                                <h3>${datos.items[i].snippet.title}</h3>
                                <p>${datos.items[i].snippet.channelTitle}</p>
                                <p>${datos2.items[0].contentDetails.duration.replace("PT","").replace("M","min ").replace("S","seg")}</p>
                            </div>`
        }

        loading.style.display="none"
        musicContainer.style.display="flex"


        const musicPreview =document.querySelectorAll(".musicPreview")
        let ID
        function obtnURL(){
            for (let i = 0; i < musicPreview.length; i++) {
                musicPreview[i].addEventListener("click",()=>{
                    ID = datos.items[i].id.videoId
                    localStorage.setItem("URL seleccionada:",ID)
                    window.location.href='reproductor.html'
                })
            }
        }
        obtnURL()
     
    }
    catch(error){
        console.log('algo salio mal')

    }
}

APIsearch("Podcast")
const buscador = document.querySelector("#buscador")
const buscadorBtn = document.querySelector(".fa-magnifying-glass")
buscadorBtn.addEventListener("click",()=>{
    loading.style.display="flex"
    musicContainer.style.display="none"
    musicContainer.innerHTML=""
    APIsearch(buscador.value)
})
