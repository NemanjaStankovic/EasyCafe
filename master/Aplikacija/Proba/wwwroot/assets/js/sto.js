class Sto {
    constructor(id, brojMesta, brojStolica){
        this.id = id;
        this.brojMesta = brojMesta;
        this.brojStolica = brojStolica;
    }

    crtajStolove(listaStolova){
            let el = document.getElementById("section-title") 
            let nesto = document.createElement("div");
            console.log("EVE OVO GA EVE OVDE"+this.tip);
            nesto.className = "col-lg-6 menu-item filter-specialty"
        
            let div1 = document.createElement("div");
            div1.className = "menu-content";
      
            let ahref = document.createElement("a");
            ahref.href = "#menu";
            ahref.innerHTML = this.brojMesta;

            let se=document.createElement("select");  
            div1.appendChild(se);

            let op;
            listaStolova.forEach(stolovi=>{ 
                op=document.createElement("option");           
                op.innerHTML=stolovi.brojStolica;
                op.value=stolovi.brojStolica;
                se.appendChild(op);              
            })
      
            let spance = document.createElement("span");
            spance.innerHTML = this.brojStolica + "";
      
            let divrecept = document.createElement("div");
            divrecept.className = "menu-ingredients";
      
            let arecept = document.createElement("div");
            arecept.className = "menu-ingredients";
            
            arecept.innerHTML = this.status;
      
            el.appendChild(nesto);
            nesto.appendChild(div1);
            nesto.appendChild(divrecept);
            divrecept.appendChild(arecept);
            div1.appendChild(ahref);
            div1.appendChild(spance);
            div1.appendChild(spance);
            el.appendChild(nesto);
    }
}