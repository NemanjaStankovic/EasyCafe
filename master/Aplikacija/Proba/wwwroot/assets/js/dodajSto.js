document.getElementById("dodajSto").onclick = ev => dodajSto();

function dodajSto(){

    let brStolica = document.getElementById("brStolica").value;
    let brStolova = document.getElementById("brStolova").value;
    if(brStolica<2 || brStolica>8)
    {
        alert("Broj stolica mora da bude u opsegu 2 - 8");
        return;
    }
    if(brStolova>20 || brStolova<0)
    {
        alert("Broj stolova mora da bude u opsegu 0 - 20");
        return;
    }

    fetch("https://localhost:5001/Sto/DodajSto/" + brStolica + "/" + brStolova,
        {
            method:"POST"
        })
        .then((resp) => {
            //resp.text().then((msg) => alert(msg));
            if(resp.status==200)
            {
              alert("Uspesno odradjena funkcija!");
              location.reload();
              return;

            }
            else {
                alert("Doslo je greske pri dodavanju stola!");
                return;

            }
          });
}