const cena = document.getElementById("neMunem");
class crtajNarudzbine {
    constructor(){}

    crtanjeNarudzbina(listaNarudzbina){
        console.log("Svaki kraj je tezi od pocetka kraja");
        let el = document.getElementById("Sekcija-Titlova");
        let div1 = document.createElement("div");
        div1.className = "divZaNarudzbine";

        let se = document.createElement("select");
        se.className = "brojNarudzbine";
        se.id = "brojNarudzbine";
        console.log(se);
        div1.appendChild(se);

        let dugmePrikazi = document.createElement("button");
        dugmePrikazi.className = "prikaziNarudzbine";
        dugmePrikazi.id = "prikaziNarudzbine";
        dugmePrikazi.classType = "submit";
        dugmePrikazi.innerHTML = "Prikazi Narudzbinu";
        dugmePrikazi.onclick = (ev) => this.radi();
        
        let op;
        listaNarudzbina.forEach(narudzbina => {
            op = document.createElement("option");
            op.innerHTML = narudzbina.username + " -  " + narudzbina.narudzbinaID;
            op.value = narudzbina.narudzbinaID;
            se.appendChild(op);
            
        });

        el.appendChild(div1);
        div1.append(dugmePrikazi);
    }

    async radi(){
        var sveUkupno = 0;
        

        var deoZaVozila= document.getElementById("munem");
        var deoZaVozila2= document.getElementById("munem2");
                // deoZaVozila.innerHTML = "";
                // console.log(deoZaVozila.childNodes);
                // deoZaVozila.childNodes.forEach(element => {  
                //     console.log(element.childNodes);      
                //     deoZaVozila.removeChild(element);
    
                // });

                // let nesto = document.createElement("div");
                // nesto.innerHTML = "NESTO";

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.className = "dugmeObrisi";
        dugmeObrisi.id = "dugmeObrisi";
        dugmeObrisi.classType = "submit";
        dugmeObrisi.innerHTML = "Isplati";
        dugmeObrisi.onclick = (ev) => this.isplata();

                while (deoZaVozila.firstChild) {
                    deoZaVozila.removeChild(deoZaVozila.firstChild);
                }

                while (deoZaVozila2.firstChild) {
                    deoZaVozila2.removeChild(deoZaVozila2.firstChild);
                }
                while(cena.firstChild) {
                    cena.removeChild(cena.firstChild);
                }

                // let brojN = document.getElementById("brojNarudzbine").value;
                let optionEl = document.getElementById("brojNarudzbine");
                console.log(optionEl);
                var brojN = optionEl.options[optionEl.selectedIndex].value;
                  var sveUkupno;
                await fetch("https://localhost:5001/Narudzbina/Preuzmi narudzbinu/" + brojN)
                    .then(p=>{
                    p.json().then(namernice=>{
                        console.log(namernice);
                    namernice.forEach(namernica=>{
                        console.log(namernica);
                        var info=document.createElement("div");
                        info.classList.add("row");
                        info.classList.add("custom-row");
                        var nesto=document.createElement("span");
                        nesto.style="color:#ffb03b";
                        nesto.innerHTML="Broj stolica: "
                        cena.appendChild(info);
                        //info.classList.add("cart-item");
                        if(namernica.brojStola!=null)
                        {
                            info.innerHTML =`
                            <div class="col-sm-4">
                            <div style="color:#ffb03b">Broj stolica: </div>
                                <div>${namernica.brojStola.brojStolica}</div>
                                </div>
                                <div class="col-sm-4">
                                <span style="color:#ffb03b">Vreme: </span>
                                <h5>${namernica.vreme} </h5>
                                </div>
                                <div class="col-sm-4">
                                <span style="color:#ffb03b">Ukupna cena: </span>
                                <h5>${namernica.cena} RSD</h5>
                                </div>
                                </div>`;
                        }
                        else{
                            info.innerHTML =`
                            <div class="col-sm-4">
                            <div style="color:#ffb03b">Broj stolica: </div>
                                <div> / </div>
                                </div>
                                <div class="col-sm-4">
                                <span style="color:#ffb03b">Vreme: </span>
                                <h5> ${namernica.vreme} </h5>
                                </div>
                                <div class="col-sm-4">
                                <span style="color:#ffb03b">Ukupna cena: </span>
                                <h5>${namernica.cena} RSD</h5>
                                </div>
                                </div>`;
                        }
                    //   console.log(namernica.hrana);
                      namernica.hrana.forEach(el =>{
                        var n = new crtajNaruceno(el.naziv, el.opis, el.tip, el.kolicina, el.cena);
                        n.crtajNarudzbine();
                        sveUkupno += n.ukupnaCena;
                        console.log(sveUkupno);
                        
                        
                      })
                    
                  })
                  })
                  });

                  deoZaVozila2.appendChild(dugmeObrisi);
                  // ukupna cena fetch funkcija da vrati samo 
                  // dugme Isplati
    }

    async isplata(){
        let optionEl = document.getElementById("brojNarudzbine");
        var brojN = optionEl.options[optionEl.selectedIndex].value;

        await fetch('https://localhost:5001/Narudzbina/IzbrisiNarudzbinu/' + brojN, {
        method: 'DELETE',
        })
        .then(res => alert("Uspesna isplata!!!")) // or res.json()

        location.reload();

    }
    
}