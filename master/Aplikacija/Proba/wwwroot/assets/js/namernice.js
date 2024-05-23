class Namernice {
    constructor(id, naziv, opis, kolicina, cena,tip){
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.kolicina=kolicina;
        this.cena = cena;
        this.tip=tip;
        this.miniKontejner=null;  // DA PAMTI BROJ NARUCNE ZAJEBANCIJE!
    }

    crtajMeni(){
            let el = document.getElementById("row menu-container");
            let nesto = document.createElement("div");
            this.miniKontejner=nesto;
            if(this.tip=="hrana")
            {
                nesto.className = "col-lg-6 menu-item filter-hrana"
            }
            else{
                nesto.className = "col-lg-6 menu-item filter-pice"
            }
            let div1 = document.createElement("div");
            div1.className = "menu-content";
      
            let ahref = document.createElement("a");
            ahref.href = "#menu";
            ahref.innerHTML = this.naziv;
      
            let spance = document.createElement("span");
            spance.innerHTML = this.cena + "din";
      
            let divrecept = document.createElement("div");
            divrecept.className = "menu-ingredients";
      
            let arecept = document.createElement("div");
            arecept.className = "menu-ingredients";
            
            arecept.innerHTML = this.opis;

            let pomocniDivZaDugme=document.createElement("div");
            pomocniDivZaDugme.className="pomeri-desno";
//DUGMICI
            let dugmePlus=document.createElement("button");
            dugmePlus.innerHTML="+";
            dugmePlus.className="dodajUKorpu";
            let dugmeMinus=document.createElement("button");
            let divZaPrikaz=document.createElement("div");
            divZaPrikaz.className="dodajUKorpuBroj";
            divZaPrikaz.dataset.id=this.id;
            divZaPrikaz.dataset.stanje=this.kolicina;
            divZaPrikaz.innerHTML=1;
            dugmeMinus.innerHTML="-";
            dugmeMinus.className="dodajUKorpu";
            let dugmeNaruci=document.createElement("button");
            dugmeNaruci.className="dodajUKorpuDugme";
            dugmeNaruci.classType="submit";
            dugmeNaruci.innerHTML="Dodaj u korpu";

            spance.appendChild(dugmeNaruci);


            el.appendChild(nesto);
            nesto.appendChild(div1);
            nesto.appendChild(divrecept);
            nesto.appendChild(pomocniDivZaDugme);
            pomocniDivZaDugme.appendChild(dugmeMinus);
            pomocniDivZaDugme.appendChild(divZaPrikaz);
            pomocniDivZaDugme.appendChild(dugmePlus);
            pomocniDivZaDugme.appendChild(dugmeNaruci);
            divrecept.appendChild(arecept);
            div1.appendChild(ahref);
            div1.appendChild(spance);
            div1.appendChild(spance);
            el.appendChild(nesto);
            dugmePlus.onclick=(ev)=>this.povecajStanje();
            dugmeMinus.onclick=(ev)=>this.smanjiStanje();
            dugmeNaruci.onclick=(ev)=>this.dodajUKorpu();
    }

    pribaviMeni(){

        fetch("https://localhost:5001/Namirnice/PreuzmiMeni")
        .then(p=>{
        p.json().then(namernice=>{
        namernice.forEach(namernica=>{
            var n = new Namernice(namernica.id, namernica.naziv, namernica.opis, namernica.cena, namernica.tip);
            n.crtajMeni();
        })

        })
    })

    }
    povecajStanje(){
        var prethodnoStanje=this.miniKontejner.querySelector(".dodajUKorpuBroj");
        var broj=parseInt(prethodnoStanje.innerHTML);
        if(broj+1<=this.kolicina)
        {
            broj++;
            prethodnoStanje.innerHTML=broj;
        }
    }
    smanjiStanje(){
        var prethodnoStanje=this.miniKontejner.querySelector(".dodajUKorpuBroj");
        var broj=parseInt(prethodnoStanje.innerHTML);
        if(broj-1>=1)
        {
            broj--;
            prethodnoStanje.innerHTML=broj;
        }
    }
    dodajUKorpu(){
        var prethodnoStanje=this.miniKontejner.querySelector(".dodajUKorpuBroj");
        this.kolicina=this.kolicina-prethodnoStanje.innerHTML;
		console.log(prethodnoStanje.innerHTML);   
        if(prethodnoStanje.innerHTML!=0)
        {
            Storage.sacuvajNamirnice(this);
            Storage.fja(prethodnoStanje.innerHTML);
            prethodnoStanje.innerHTML=0;
        }
    }



}