
class izmeniNamernicu {
  constructor(){}

  crtajNamirnice(listaNamirnica, gde){
      console.log("Svaki kraj je tezi od pocetka kraja");
      let se = document.createElement("select");
      se.className = "form-control1";
      se.id = "brojGluposti";
      gde.appendChild(se);

      let op;
      console.log(listaNamirnica);
      listaNamirnica.forEach(namernica => {
          console.log(namernica);
          op = document.createElement("option");
          op.innerHTML = namernica.naziv + " -  Kolicina: " + namernica.kolicina;
          op.value = namernica.naziv;
          console.log(op.value);
          se.appendChild(op);
      });
  }
  
}
document.getElementById("izmeniNamernicu").onclick = ev => promeniKolicinu();

function promeniKolicinu(){

  let namernica = document.getElementById("brojGluposti").value;
  let kolicina = document.getElementById("kolicinaNamernica").value;

  console.log(namernica);
  console.log(kolicina);

  fetch("https://localhost:5001/Namirnice/PromeniKolicinu/" + kolicina + "/" + namernica,
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
            alert("Kolicina je nevalidna!");
            return;
          }
          if(resp.status==200)
          {
            alert("Uspesno promenjena kolicina namirnice!");
            location.reload();
            return;

          }
          else{
            alert("Doslo je do greske!");
          }
        });
  }