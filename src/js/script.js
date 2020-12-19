//BOUTON POUR REMONTER EN HAUT DE LA PAGE

document.addEventListener("DOMContentLoaded", function(event){

    document.querySelector('#remonte').addEventListener("click", fscroll);

    function fscroll(e){

        window.scroll({
            top:0,
            left:0,
            behavior:'smooth'
        })
    }

    var destination;

    var boutondeux =document.querySelector('#cont');

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

class Carousel{
    constructor(element, options = {}) {
        
    }
}

document.addEventListener('DOMContentLoaded', function (){

    new Carousel(document.querySelector('#carousel'), {
        slidesToScroll: 1,
        slidesVisible: 3
    })

})

//////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function(){

    let connexion = new MovieDB();

    if(document.location.pathname.search("fiche-film.html") > 0){
        let params = ( new URL(document.location) ).searchParams;

        //console.log(params);
        connexion.requeteInfosFilm( params.get("id") );
    }else{
        connexion.requeteDernierFilm();
    }

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

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this) );

        requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=2ed19bb8abf51968b90eb9a455fdc344&language=fr-Ca&page=1");

        //requete.open("GET", this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" +this.lang + "&page=1");

        requete.send();

    }

    retourRequeteDernierFilm(e){

        console.log("retour dernier film");

        let target = e.currentTarget;

        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;

        console.log(data);

        this.afficheDernierFilm(data);

    }

    afficheDernierFilm(data){

        for (let i = 0; i < this.totalFilm; i++) {

            let unArticle = document.querySelector(".template>article.film").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = data[i].title;

            unArticle.querySelector("p.description").innerHTML = data[i].overview || "Pas de description disponnible";

            let src = this.imgPath + "w185" + data[i].poster_path;

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);

            document.querySelector(".liste-films").appendChild(unArticle);


        }

    }

    requeteInfosFilm(movieId){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteInfosFilm.bind(this) );

        requete.open("GET", this.baseURL + "/movie/" + movieId + "?api_key=" + this.APIkey + "&language=" + this.lang);

        requete.send();

    }

    retourRequeteInfosFilm(e){

        console.log("retour dernier film");

        let target = e.currentTarget;

        let data;

        data = JSON.parse(target.responseText);

        console.log(data);

        this.afficheInfosFilm(data);

    }

    afficheInfosFilm(data) {

        document.querySelector("h2").innerHTML = data.title;

        document.querySelector("img").innerHTML = data.logo_path;

        document.querySelector("p").innerHTML = data[i].overview || "Pas de description disponnible";

        // for (let i = 0; i < this.totalFilm; i++) {
        //
        //     let unArticle = document.querySelector(".template>article.film").cloneNode(true);
        //
        //     unArticle.querySelector("h2").innerHTML = data[i].title;
        //
        //     unArticle.querySelector("p.description").innerHTML = data[i].overview || "Pas de description disponnible";
        //
        //     let src = this.imgPath + "w185" + data[i].poster_path;
        //
        //     let uneImage = unArticle.querySelector("img");
        //     uneImage.setAttribute("src", src);
        //     uneImage.setAttribute("alt", data[i].title);
        //
        //     document.querySelector(".liste-films").appendChild(unArticle);
        //
        //
        // }
    }

}