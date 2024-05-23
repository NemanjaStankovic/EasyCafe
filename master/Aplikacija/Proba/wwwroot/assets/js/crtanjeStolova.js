class crtanjeStolova {
    constructor(){}
    crtanjeStolova(listaStolova)
    {
        console.log("svakii pocetak je tezak");
        let el = document.getElementById("section-title") 
        
            let div1 = document.createElement("div");

            let se=document.createElement("select");  
            se.className="brojStolica";
            div1.appendChild(se);

			let tekst=document.createElement("input");
            tekst.type="datetime-local"
            tekst.className="brojStolica";
            tekst.id="inputZaVreme";
            div1.appendChild(tekst);
            // div1.childNodes.forEach(element => {
            //     div1.removeChild(element);
                
            // });

            let dugmeNaruci=document.createElement("button");
            dugmeNaruci.className="dodajUKorpuDugme";
            dugmeNaruci.classType="submit";
            dugmeNaruci.innerHTML="Dodaj rezervaciju u korpu";
            dugmeNaruci.onclick=(ev)=>this.dodajUKorpu();

            let op;
            op=document.createElement("option");           
                op.innerHTML="Za poneti";
                op.value="zp";
                se.appendChild(op);
            listaStolova.forEach(stolovi=>{ 
                op=document.createElement("option");           
                op.innerHTML=stolovi.brojStolica;
                op.value=stolovi.brojStolica;
                se.appendChild(op);              
            }) 
      
            el.appendChild(div1);
            div1.append(dugmeNaruci);
    }
    dodajUKorpu()
    {
        var brojStolica=document.querySelector("select");
        var brojStolicaInt= brojStolica.options[ brojStolica.selectedIndex].value;
		var vreme=""+document.getElementById("inputZaVreme").value;	
        // var trenutnoVreme = new Date();
        // trenutnoVreme.
        console.log("Ovo" + vreme);

        
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + 30*60000);
        var mesec = (futureDate.getMonth() + 1);



        console.log(futureDate + "ft");

        if(mesec<10){
            var datetime = futureDate.getFullYear() + "-0"
                    + mesec  + "-" 
                    + futureDate.getDate() + "T0"  
                    + futureDate.getHours() + ":"  
                    + futureDate.getMinutes();
            console.log(datetime+"nesto");

            var datetimeZP = currentDate.getFullYear() + "-0"
                + mesec + "-"
                + currentDate.getDate() + "T"
                + currentDate.getHours() + ":"
                + currentDate.getMinutes();

            console.log(datetimeZP + "neko")
        }
        else{
            var datetime = futureDate.getFullYear() + "-"
                    + mesec  + "-" 
                    + futureDate.getDate() + "T" 
                    + futureDate.getHours() + ":"  
                    + futureDate.getMinutes();
            console.log(datetime+ "sta");

            var datetimeZP = currentDate.getFullYear() + "-"
                + mesec + "-"
                + currentDate.getDate() + "T"
                + currentDate.getHours() + ":"
                + currentDate.getMinutes();

        }

        // if(datetimeZP>vreme){
        //     alert("Datum je nevalidan!");
        //     return;
        // }
        //localStorage.setItem("vreme:",vreme);
		if(vreme!="")
        {
            if (datetime > vreme) {
                var str = datetime.replace('T', ' u ');
                var stoText = document.getElementById("stoText");
                localStorage.setItem("sto", brojStolicaInt);
                var sto = localStorage.getItem("sto");
                localStorage.setItem("vreme:", str);
            }
            else {
                var str = vreme.replace('T', ' u ');
                var stoText = document.getElementById("stoText");
                localStorage.setItem("sto", brojStolicaInt);
                var sto = localStorage.getItem("sto");
                localStorage.setItem("vreme:", str);
            }
            if(sto!=null){
                if(sto!="zp")
                {
                    console.log(sto);
                    stoText.innerHTML="Izabran je sto sa "+sto+" stolica. Rezervacija za: "+str ;
                }
                else
                {
                    stoText.innerHTML="Hrana ce biti spremna za preuzimanje u "+str;

                }
            }
            // pom3.innerHTML="Izabran je sto sa "+brojStolicaInt+" stolica. Rezervacija za: "+str;
            // if(brojStolicaInt!=null)
            //     pom3.innerHTML="Izabran je sto sa "+brojStolicaInt+" stolica. Rezervacija za: "+str;
            // else
            //     pom3.innerHTML="Izabrali ste za poneti. Rezervacija za: "+str;
            //     console.log(pom3.innerHTML);

        }
        else alert("Odaberite vreme!");
    }
    // prikazPoruke()
    // {
    //     var vreme=""+document.getElementById("inputZaVreme").value;		
    //     if(vreme!="")
    //     {
    //         var str=vreme.replace('T', ' u ');
    //         var stoText=document.getElementById("stoText");
    //         var sto=localStorage.getItem("sto");
    //         if(sto!=null){
    //             if(sto!="zp")
    //             {
    //                 console.log(sto);
    //                 stoText.innerHTML="Izabran je sto sa "+sto+" stolica. Rezervacija za: "+str ;
    //             }
    //             else
    //             {
    //                 stoText.innerHTML="Hrana ce biti spremna za preuzimanje u "+str;

    //             }
    //         }
    //         // pom3.innerHTML="Izabran je sto sa "+brojStolicaInt+" stolica. Rezervacija za: "+str;
    //         // if(brojStolicaInt!=null)
    //         //     pom3.innerHTML="Izabran je sto sa "+brojStolicaInt+" stolica. Rezervacija za: "+str;
    //         // else
    //         //     pom3.innerHTML="Izabrali ste za poneti. Rezervacija za: "+str;
    //         //     console.log(pom3.innerHTML);

    //     }
    //     else alert("Odaberite vreme!");
    // }
}