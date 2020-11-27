document.addEventListener("DOMContentLoaded", function(){

let connexion = new MovieDB();

connexion.requeteDernierFilm();

})

class MovieDB{

    constructor() {

        console.log("Constructeur")

        this.APIkey = "2ed19bb8abf51968b90eb9a455fdc344";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3"

        this.imgPath = "https://image.tmdb.org/t/p/";

        this.totalFilm = 8;

    }

    requeteDernierFilm(){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loaded", this.retourRequeteDernierFilm.bind(this));

        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=2ed19bb8abf51968b90eb9a455fdc344&language=fr-CA&page=1")

        requete.open("GET", this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1")

        requete.send();

    }

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