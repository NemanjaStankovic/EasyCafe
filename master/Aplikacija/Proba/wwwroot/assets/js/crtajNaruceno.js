class crtajNaruceno {
    constructor (naziv, opis, tip, kolicina, cena){
        this.naziv = naziv;
        this.opis = opis;
        this.tip = tip;
        this.kolicina = kolicina;
        this.cena = cena;
        this.ukupnaCena = 0;
    }

    crtajNarudzbine(){

        this.ukupnaCena = this.cena*this.kolicina;

        let el = document.getElementById("munem");
        let zaBrisanje = document.createElement("div");
        zaBrisanje.id = "zaBrisanje";
        zaBrisanje.style = "text-align: center";
        let nesto = document.createElement("div");
        let div1 = document.createElement("div");
        div1.className = "menu-content";
  
        let ahref = document.createElement("a");
        ahref.href = "#menu";
        ahref.innerHTML = this.naziv + "(" + this.kolicina +"x" + " " + this.cena + "din)" + "......................................................";
        //"(kolicina: " + this.kolicina + ")"
  
        let spance = document.createElement("span");
        spance.innerHTML = this.ukupnaCena + "din";
  
        let divrecept = document.createElement("div");
        divrecept.className = "menu-ingredients";
  
        // let arecept = document.createElement("div");
        // arecept.className = "menu-ingredients";
        // arecept.style = "text-align: center";
        // arecept.innerHTML = "Opis: " + this.opis;

        // el.appendChild(nesto);
        el.appendChild(zaBrisanje);
        zaBrisanje.appendChild(nesto);

        nesto.appendChild(div1);
        nesto.appendChild(divrecept);
        // divrecept.appendChild(arecept);
        div1.appendChild(ahref);
        div1.appendChild(spance);
        div1.appendChild(spance);
    }
}