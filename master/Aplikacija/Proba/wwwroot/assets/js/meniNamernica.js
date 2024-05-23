document.getElementById("dodajMeni").onclick = ev => dodajNamernicu();

function dodajNamernicu(){
    //"Content-Type: application/json" -d "{\"id\":0,\"naziv\":\"palacinka\",\"opis\":\"slatko lepo ubavo\",\"kolicina\":10,\"cena\":300,\"tip\":\"hrana\",\"spojevi\":null}"
    let nazivMeni = document.getElementById("nazivMeni").value;
    let cenaMeni = document.getElementById("cenaMeni").value;
    let kolicinaMeni = document.getElementById("kolicinaMeni").value;
    let opisMeni = document.getElementById("opisMeni").value;

    let optionEl = document.getElementById("tipMeni");
    var tipMeni = optionEl.options[optionEl.selectedIndex].value;

    console.log(nazivMeni);
    console.log(cenaMeni);
    console.log(kolicinaMeni);
    console.log(opisMeni);
    console.log(tipMeni);
    if(cenaMeni>3000 || cenaMeni<10)
        return alert("Cena mora da bude u opsegu 10-3000 RSD");
    if(kolicinaMeni>300 || kolicinaMeni<0)
        return alert("Kolicina ne sme da bude veca od 300");
    fetch("https://localhost:5001/Namirnice/DodajNamirnicu", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "id": 0,
                            "naziv": nazivMeni,
                            "opis": opisMeni,
                            "kolicina": kolicinaMeni,
                            "cena": cenaMeni,
                            "tip": tipMeni,
                            "spojevi": null
                        })
                    }).then(p => {
                        console.log(p);
                        if(p.status == 200) {
                            alert("uspesno ste dodali u meni!");
                            location.reload();
                        }
                        else{
                            alert("Doslo je do greske!");
                        }
                    });

    

}