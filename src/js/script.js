//BOUTON POUR REMONTER EN HAUT DE LA PAGE

document.addEventListener("DOMContentLoaded", function(event){

    //script pour la fleche qui remonte
    document.querySelector('#remonte').addEventListener("click", fscroll);

    function fscroll(e){

        window.scroll({
            top:0,
            left:0,
            behavior:'smooth'
        })
    }
    //Script pour la transition smooth vers la section contact dans le footer
    var destination;

    var boutondeux =document.querySelector('#cont');

    boutondeux.addEventListener("click", fscrolll);

    function fscrolll(pEvt){
        var cible = pEvt.currentTarget.getAttribute("id");

        if(cible == "cont") {
            destination = document.querySelector('#contacts').offsetTop;
        }

        window.scroll({
            top: destination,
            left: 0,
            behavior: 'smooth'
        });
    }
});

///////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function(){

    let connexion = new MovieDB();

    connexion.requeteDernierFilm();

})

class MovieDB{

    constructor() {

        this.APIkey = "2ed19bb8abf51968b90eb9a455fdc344";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3"

        this.imgPath = "https://image.tmdb.org/t/p/";

        this.totalFilm = 9;

    }

    requeteDernierFilm(){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loaded", this.retourRequeteDernierFilm.bind(this));

        requete.open("GET", this.baseURL + "movie/now_playing?page=1&language=" + this.lang + "&&api_key" + this.APIkey);

        requete.send();

    }

    //https://web.microsoftstream.com/video/e305022a-c0ad-4e07-b433-2814bdc309c4?list=user&userId=a9537877-fe51-44f4-9a14-520d6a15864c 9min20

    retourRequeteDernierFilm(e){

        console.log("Retour dernier Film")

        let target = e.currentTarget;
        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;

        console.log(data);

        this.afficheDernierFilm(data);

    }

    afficheDernierFilm(data){

        for (let i = 0; i < data.lenght; i++) {
            console.log(data[i].title);
        }

    }

}