//Variables
const formulario = document.querySelector("#formulario");
const listaTweets  = document.querySelector("#lista-tweets");
let tweets = [];

//Event Listeners
eventListeners();
function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit",agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded",()=>{
        tweets = JSON.parse(localStorage.getItem("tweets")) || []; //Si marca null asignalo como arreglo vacio

        console.log(tweets);
        crearHTML();

    })
}


//Funciones
function agregarTweet(e){
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;
    
    //validacion 
    if(tweet ===''){
        mostrarError("Un mensaje no puede ir vacio")
        return; //Evita que se ejecuten mas lineas de codigo
    }
    const tweetObj = {
        id: Date.now(),
        tweet, //Es lo mismo que tuvieramos tweet:tweet (llave:valor)
    }
    //Anadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    //Una ves agregado creamos el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(msj){
    const msjError = document.createElement("P");
    msjError.textContent = msj;
    msjError.classList.add("error");

    //Insertar en el contenido 
    const conetenido = document.querySelector("#contenido");
    conetenido.appendChild(msjError);

    //Elimina la alerta despues de 3 segundos 
    setTimeout(() => {
        msjError.remove();
    }, 3000);
}

//Muestra el listado de los tweets
function crearHTML(){
    limpiarHTML();
    if(tweets.length>0){
        tweets.forEach(tweet =>{
            //Agregar un boton de eliminar
            const btn = document.createElement("a");
            btn.classList.add("borrar-tweet");
            btn.textContent = "X";

            //Anadir la funcion de eliminar
            btn.onclick=()=>{
                borrarTweet(tweet.id);
            }
            //Crear el HTML
            const li = document.createElement("li");
            //Anadir texto
            li.textContent = tweet.tweet;
            //Asignar el boton
            li.appendChild(btn)
            //Insertamos en HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}
//Agrega los Tweets actuales al localStorage
function sincronizarStorage(){
    localStorage.setItem("tweets",JSON.stringify(tweets));
}
//Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet=> tweet.id != id);
    crearHTML();
}
//Limpiar el HTML
function limpiarHTML(){
    while(listaTweets.firstChild)
        listaTweets.removeChild(listaTweets.firstChild);
}