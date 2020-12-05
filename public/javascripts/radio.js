var audio = document.getElementById("audioRadio");
var play = document.getElementById("play");
var pausa = document.getElementById("pausa");
var volDown = document.getElementById("volDown");
var volUp = document.getElementById("volUp");
var volInicial = 0.4;
var infoVivo = document.getElementById("infoVivo")

var time = new Date();
var fecha = time.getDate();
var dia = time.getDay();
var hora = time.getHours();
var chequeador = false;

var cancion = "";
var artista = "";

function tercerLunes() {
    let contador = 0;

    if (dia === 1) {
        contador++;
    };
    if (hora == 16) {
        contador++;
    };
    if (fecha <= 7) {
        contador++;
    };
    if ((fecha >= 15) && (fecha <= 21)) {
        contador++;
    };

    console.log(contador)
    if (contador == 3) {
        chequeador = true;
    };
}

function apiZeno() {
    fetch('https://tools.zenoradio.com/api/stations/8ptnyyc6a5zuv/now_playing/')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Mal!');
            }
        })
        .then(response => {
            console.log(response.artist);
            console.log(response.title);
            // cancion.innerHTML = response.title;
            // if (response.artist != 'Unknown') {
            //     cancion.innerHTML = response.title + ' - ' + response.artist;
            // } else {
            //     cancion.innerHTML = response.title;
            // }
            cancion = response.title;
            artista = response.artist;
        }).catch(error => {
            console.error(error);
        })
}

function enVivo() {
    if ((dia === 1) && (hora >= 9) && (hora < 11)) {
        infoVivo.innerText = "En vivo: Estoy con vos de 9hs a 11hs";
    } else if (chequeador) {
        infoVivo.innerText = "En vivo: Serendipia de 16hs a 17hs";
    } else if ((dia === 1) && (hora == 21)) {
        infoVivo.innerText = "En vivo: Doble Juego de 21hs a 23hs";
        console.log("SIIII")
    } else if ((dia === 3) && (hora >= 10) && (hora < 12)) {
        infoVivo.innerText = "En vivo: Ale por la mañana de 10hs a 12hs";
    } else if ((dia === 5) && (hora >= 9) && (hora < 11)) {
        infoVivo.innerText = "En vivo: Estoy con vos de 9hs a 11hs";
    } else if ((dia === 5) && (hora == 11)) {
        infoVivo.innerText = "En vivo: R&R de 11hs a 12hs";
    } else if ((dia === 5) && (hora >= 18) && (hora < 20)) {
        infoVivo.innerText = "En vivo: Emocionados de 18hs a 20hs";
    } else if ((dia === 5) && (hora == 20)) {
        infoVivo.innerText = "En vivo: Descarga a tierra de 20hs a 21hs";
    } else if ((dia === 6) && (hora >= 10) && (hora < 12)) {
        infoVivo.innerText = "En vivo: Pan y Queso de 10hs a 12hs";
    } else {
        infoVivo.innerText = cancion + " - " + artista;
    }

}




window.addEventListener("load", function() {


    audio.addEventListener("play", () => {
        audio.volume = volInicial;
    })

    pausa.addEventListener("click", () => {
        audio.pause();
        play.classList.remove("oculto");
        pausa.classList.add("oculto");
    })

    play.addEventListener("click", () => {
        audio.play();
        pausa.classList.remove("oculto");
        play.classList.add("oculto");
    })

    volDown.addEventListener("click", () => {
        if (audio.volume >= 0.1) {
            audio.volume -= 0.1;
        }
        volInicial = audio.volume;
    })

    volUp.addEventListener("click", () => {
        if (audio.volume <= 0.9) {
            audio.volume += 0.1;
        }
        volInicial = audio.volume;
    })

    console.log(fecha);
    console.log(dia);
    console.log(hora);


    tercerLunes();
    setInterval(tercerLunes, 10000);

    apiZeno();
    setInterval(apiZeno, 10000);


    enVivo();
    setInterval(enVivo, 10000);




});