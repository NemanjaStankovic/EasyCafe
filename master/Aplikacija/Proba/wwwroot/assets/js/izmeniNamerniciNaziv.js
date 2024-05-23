
class izmeniNamerniciNaziv {
    constructor(){}
  
    crtajNamirnice(listaNamirnica, gde){
        console.log("Svaki kraj je tezi od pocetka kraja");
        let se = document.createElement("select");
        se.className = "form-control1";
        se.id = "brojGluposti1";
        gde.appendChild(se);
  
        let op;
        console.log(listaNamirnica);
        listaNamirnica.forEach(namernica => {
            console.log(namernica);
            op = document.createElement("option");
            op.innerHTML = namernica.naziv;
            op.value = namernica.naziv;
            console.log(op.value);
            se.appendChild(op);
        });
    }
    
  }
  document.getElementById("izmeniNamerniciNaziv").onclick = ev => promeniNaziv();
  
    function promeniNaziv(){
    
      let namernica = document.getElementById("brojGluposti1").value;
      let naziv = document.getElementById("nazivNamernica").value;
    
      console.log(namernica);
      console.log(naziv);
    
      fetch("https://localhost:5001/Namirnice/PromeniNaziv/" + naziv + "/" + namernica,
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
                alert("Naziv je nevalidan!");
                return;
              }
              if(resp.status==200)
              {
                alert("Uspesno promenjen naziv namirnice!");
                location.reload();
                return;
    
              }
              else{
                alert("Doslo je do greske!");
              }
            });
      }