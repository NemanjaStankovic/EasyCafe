

class Recenzija {
    constructor(id, ime, prezime, ocena, komentar){
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.ocena = ocena;
        this.komentar = komentar;
    }


    crtajRecenziju(gde){
        // let el = document.getElementById("test3");

        // let divKontejner = document.createElement("div");
        // divKontejner.className = "container position-relative";
        // el.appendChild(divKontejner);

        // let divSwiper = document.createElement("div");
        // divSwiper.className = "testimonials-slider swiper";
        
        // divKontejner.appendChild(divSwiper);
        

        // let divWrapper = document.createElement("div");
        // divWrapper.className = "swiper-wrapper";
        // divSwiper.appendChild(divWrapper);
        

        let divSlide = document.createElement("div");
        divSlide.className = "swiper-slider";
        gde.appendChild(divSlide);
        // divWrapper.appendChild(divSlide);

        let divItem = document.createElement("div");
        divItem.className = "testimonial-itemm";
        divSlide.appendChild(divItem);
        

        //OVDE TREBA PROVERA POLA
        // let slika = document.createElement("img");
        // slika.src = "assets/img/testimonials/testimonials-1.jpg";
        // slika.className = "testimonial-img";
        // slika.alt = "";
        // divItem.appendChild(slika);

        let imeprezime = document.createElement("h3");
        imeprezime.innerHTML = this.ime + " " + this.prezime;
        divItem.appendChild(imeprezime);

        let divZvezde = document.createElement("div");
        divZvezde.className = "stars";
        divItem.appendChild(divZvezde);

        for(let i=0; i<this.ocena; i++){
            let zvezdica = document.createElement("i");
            zvezdica.className = "bi bi-star-fill";
            divZvezde.appendChild(zvezdica);
        }

        let paragraf = document.createElement("p");
        divItem.appendChild(paragraf);

        let leviApostrof = document.createElement("i");
        leviApostrof.className = "bx bxs-quote-alt-left quote-icon-left";
        paragraf.appendChild(leviApostrof);

        let komentarcic = document.createElement("a");
        komentarcic.innerHTML = this.komentar;
        paragraf.appendChild(komentarcic);

        let desniApostrof = document.createElement("i");
        desniApostrof.className = "bx bxs-quote-alt-right quote-icon-right";
        paragraf.appendChild(desniApostrof);



    }

crtajRecenzijuSaDugmetom(gde){		
        let divSlide = document.createElement("div");
        divSlide.className = "swiper-slider";
        gde.appendChild(divSlide);
        // divWrapper.appendChild(divSlide);

        let divItem = document.createElement("div");
        divItem.className = "testimonial-itemm";
        divSlide.appendChild(divItem);
        

        //OVDE TREBA PROVERA POLA
        // let slika = document.createElement("img");
        // slika.src = "assets/img/testimonials/testimonials-1.jpg";
        // slika.className = "testimonial-img";
        // slika.alt = "";
        // divItem.appendChild(slika);

        let imeprezime = document.createElement("h3");
        imeprezime.innerHTML = this.ime + " " + this.prezime;
        divItem.appendChild(imeprezime);

        let divZvezde = document.createElement("div");
        divZvezde.className = "stars";
        divItem.appendChild(divZvezde);

        for(let i=0; i<this.ocena; i++){
            let zvezdica = document.createElement("i");
            zvezdica.className = "bi bi-star-fill";
            divZvezde.appendChild(zvezdica);
        }

        let paragraf = document.createElement("p");
        divItem.appendChild(paragraf);

        let leviApostrof = document.createElement("i");
        leviApostrof.className = "bx bxs-quote-alt-left quote-icon-left";
        paragraf.appendChild(leviApostrof);

        let komentarcic = document.createElement("a");
        komentarcic.innerHTML = this.komentar;
        paragraf.appendChild(komentarcic);

        let desniApostrof = document.createElement("i");
        desniApostrof.className = "bx bxs-quote-alt-right quote-icon-right";
        paragraf.appendChild(desniApostrof);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.className = "obrisiKomentar";
        dugmeObrisi.innerText = "Obrisi komentar"
        divSlide.appendChild(dugmeObrisi);
        dugmeObrisi.onclick=(el=>
            {
                this.obrisiRecenziju();
                location.reload();
            })
    }

    obrisiRecenziju(){
        fetch("https://localhost:5001/Recenzije/ObrisiRecenziju/"+this.id, {
            method: "DELETE",
        }).then(p=>
            { 
                if(!p.ok)
                    alert("Neuspelo brisanje !");
            })
    }
}