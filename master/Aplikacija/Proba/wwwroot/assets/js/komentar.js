document.getElementById("dodajkomentar").onclick = ev => dodajkomentar();

function dodajkomentar(){

    let optionEl = document.getElementById("ocena");
    var ocena = optionEl.options[optionEl.selectedIndex].value;
    let poruka = document.getElementById("porukica").value;
    let korisnik = localStorage.getItem("korisnikUsername");
    console.log(poruka);
    console.log(ocena);
    console.log(korisnik);
    

    fetch("https://localhost:5001/Recenzije/DodajRecenziju/" + ocena + "/" + poruka,
        {
            method:"POST"
        })
        .then((resp) => {
            //resp.text().then((msg) => alert(msg));
            if(resp.status==201)
            {
              alert("Korisnik je vec dao svoju recenziju!");
              return;

            }
            if(resp.status==200)
            {
              alert("Uspesno dodat komentar!");
              return;

            }
          });
}