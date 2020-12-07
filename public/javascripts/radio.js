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

let mobile = false;

function isMobileTablet() {
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            mobile = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    console.log("isMobile", mobile);
}

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
    console.log(hora)
    if (contador == 3) {
        chequeador = true;
    };
    time = new Date();
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
    isMobileTablet();

    if (mobile) {
        volInicial = 1;
    } else {
        play.classList.add("oculto");
        pausa.classList.remove("oculto");
        volDown.classList.remove("oculto");
        volUp.classList.remove("oculto");
        audio.play();
    }

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