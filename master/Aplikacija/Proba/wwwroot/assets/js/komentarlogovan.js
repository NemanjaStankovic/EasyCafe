document.getElementById("promeniStranicu3").onclick = ev => promeniStranicu2();
document.getElementById("promeniStranicuUnazad3").onclick = ev => promeniStranicuUnazad2();

function promeniStranicu2(){
    console.log("nesto drugo");
    var pom=document.getElementById("brojStranice3");
    pom.innerHTML++;
    console.log(pom.innerHTML);
    console.log(pom);
    var nesto=pom.innerHTML;
    let el = document.getElementById("test5");
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
    console.log("pre:"+pom.innerHTML);
    fetch("https://localhost:5001/Recenzije/PreuzmiRecenzijeBroj")
    .then(p=>{
        p.json().then(broj=>{if(pom.innerHTML>=broj){pom.innerHTML=broj;nesto=pom.innerHTML;console.log(broj);
          fetch("https://localhost:5001/Recenzije/PreuzmiRecenzije/"+broj)
            .then(p=>{
            p.json().then(recenzije=>{
            recenzije.forEach(recenzija=>{
              let r = new Recenzija(recenzija.id, recenzija.ime, recenzija.prezime, recenzija.ocena, recenzija.komentar)
            
              r.crtajRecenziju(el);
            console.log(pom.innerHTML);
            })
  
            })})
          }
        else{
          fetch("https://localhost:5001/Recenzije/PreuzmiRecenzije/"+pom.innerHTML)
            .then(p=>{
            p.json().then(recenzije=>{
            recenzije.forEach(recenzija=>{
              let r = new Recenzija(recenzija.id, recenzija.ime, recenzija.prezime, recenzija.ocena, recenzija.komentar)
            
              r.crtajRecenziju(el);
            console.log(pom.innerHTML);
            })
  
            })})
        }})
      });   
  }
  function promeniStranicuUnazad2(){
    var pom=document.getElementById("brojStranice3");
    pom.innerHTML--;
    if(pom.innerHTML==0)
    {
        pom.innerHTML++;
    }
    let el = document.getElementById("test5");
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
                fetch("https://localhost:5001/Recenzije/PreuzmiRecenzije/"+pom.innerHTML)
                .then(p=>{
                p.json().then(recenzije=>{
                recenzije.forEach(recenzija=>{
                  let r = new Recenzija(recenzija.id, recenzija.ime, recenzija.prezime, recenzija.ocena, recenzija.komentar)
                
                  r.crtajRecenziju(el);
                console.log(pom.innerHTML);
                })
    
                })
                })
  }