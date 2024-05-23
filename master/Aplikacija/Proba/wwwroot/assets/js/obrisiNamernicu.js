class obrisiNamernicu {
    constructor(){}

    crtajNamernice(listaNamirnica){
        console.log("Svaki kraj je tezi od pocetka kraja");
        let el = document.getElementById("test8");
        let div1 = document.createElement("div");
        div1.className = "divZaNarudzbine";

        let se = document.createElement("select");
        se.className = "brojNarudzbine";
        se.id = "brojNamirnice";
        console.log(se);
        div1.appendChild(se);

        let dugmePrikazi = document.createElement("button");
        dugmePrikazi.className = "prikaziNarudzbine";
        dugmePrikazi.id = "obrisiNamirnicu";
        dugmePrikazi.classType = "submit";
        dugmePrikazi.innerHTML = "Obrisi namirnicu";
        dugmePrikazi.onclick = (ev) => this.obrisi();
        
        let op;
        listaNamirnica.forEach(namernica => {
            console.log(namernica);
            op = document.createElement("option");
            op.innerHTML = namernica.naziv;
            op.value = namernica.naziv;
            console.log(op.value);
            se.appendChild(op);
        });

        div1.append(dugmePrikazi);
        el.appendChild(div1);

    }
    async obrisi(){
        
        let namernica = document.getElementById("brojNamirnice").value;

        await fetch("https://localhost:5001/Namirnice/Obrisi namirnicu/"+namernica, {
            method: "DELETE",
        }).then(p=>
            { 
                if(!p.ok){
                    alert("Neuspelo brisanje !");
                    return;
                }
                else{
                    alert("Uspesno brisanje!");
                    location.reload();
                    return;
                }
            })
    }
}