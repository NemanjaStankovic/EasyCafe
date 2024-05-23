
class izmeniNamerniciCenu {
    constructor(){}
  
    crtajNamirnice(listaNamirnica, gde){
        console.log("Svaki kraj je tezi od pocetka kraja");
        let se = document.createElement("select");
        se.className = "form-control1";
        se.id = "brojGluposti2";
        gde.appendChild(se);
  
        let op;
        console.log(listaNamirnica);
        listaNamirnica.forEach(namernica => {
            console.log(namernica);
            op = document.createElement("option");
            op.innerHTML = namernica.naziv + " -  Cena: " + namernica.cena;
            op.value = namernica.naziv;
            console.log(op.value);
            se.appendChild(op);
        });
    }
    
  }
  document.getElementById("izmeniNamerniciCenu").onclick = ev => promeniCenu();
  
  function promeniCenu(){
  
    let namernica = document.getElementById("brojGluposti2").value;
    let cena = document.getElementById("cenaNamernica").value;
  
    console.log(namernica);
    console.log(cena);
  
    fetch("https://localhost:5001/Namirnice/PromeniCenu/" + cena + "/" + namernica,
        {
            method:"PUT"
        })
        .then((resp) => {
            //resp.text().then((msg) => alert(msg));
            if(resp.status==207)
            {
              alert("Namirnica ne postoji!");
              return;
            }
            if(resp.status==206)
            {
              alert("Cena je nevalidna!");
              return;
            }
            if(resp.status==200)
            {
              alert("Uspesno promenjena cena namirnice!");
              location.reload();
              return;
  
            }
            else{
              alert("Doslo je do greske!");
            }
          });
    }