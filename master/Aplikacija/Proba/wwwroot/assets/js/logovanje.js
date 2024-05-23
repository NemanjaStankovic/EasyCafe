

let x = document.getElementById("login");
let y = document.getElementById("register");
let z = document.getElementById("btn");

document.getElementById("loginKorisnika").onclick = ev => loginKorisnika();
document.getElementById("registracijaKorisnika").onclick = ev => registrujKorisnika();
document.getElementById("odjavise").onclick = ev => odjava();

function register() {
    x.style.left = "-470px";
    y.style.left = "50px";
    z.style.left = "125px";
}

function registrujKorisnika(){
  let username = document.getElementById("usernameR").value;
  let password = document.getElementById("passwordR").value;
  let ime = document.getElementById("imeR").value;
  let prezime = document.getElementById("prezimeR").value;
  let email = document.getElementById("emailR").value;
  let broj = document.getElementById("brojR").value;
  if(username=="" || password=="" || ime=="" || prezime=="" || email=="" || broj=="" || username=="")
  {
    alert("Neophodno je popuniti sva polja!");
    return
  }

  if (!(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email)))
  {
    alert("Nevalidna email adresa!")
    return;
  }
  if (broj<99999999 || broj>999999999)
  {
    alert("Nevalidan broj telefona!")
    return;
  }

  ///Korisnik/Registruj se/{username}/{ime}/{prezime}/{email}/{password}/{brojtelefona}

  fetch("https://localhost:5001/Korisnik/Registruj se/" + username + "/" + ime + "/" + prezime + "/" + email + "/" + password + "/" + broj,
        {
            method:"POST"
        })
        .then((resp) => {
            //resp.text().then((msg) => alert(msg));
            if(resp.status==203)
            {
              alert("Username je vec u upotrebi!");
              return;

            }
            if(resp.status==204)
            {
              alert("Email je vec u upotrebi!");
              return;
            }
            if(resp.status==200)
            {
              alert("Uspesna registracija novog profila!");
              location.reload();
              return;
            }
          });
}

function loginKorisnika(){
  let username = document.getElementById("usernameL").value;
  let password = document.getElementById("passwordL").value;
  if(password=="" || username=="")
  {
    alert("Popunite sva polja!");
    return;
  }
  //let isAdmin = document.getElementById("admin").value;
  // alert("NESTOOOOO");
  //if()
  // if (username === "admin@easycaffe.com" && password === "admin123"){
  //   window.location.href = 'index-admin.html';
  //   return;
  // }

  fetch("https://localhost:5001/Korisnik/Preuzmi korisnika/" + username + "/" + password, { method:"GET"})
  .then(p=>{
    if(p.status==206)
    {
      alert("Nalog sa datim mailom ne postoji!");
      return;
    }
    else if(p.status==207)
    {
      alert("Pogresili ste sifru!");
      return;
    }
    p.json().then(korisnik=>{
      if(p.status == 200){
        console.log(korisnik);
        if(korisnik.isAdmin==1)
        {
          window.location.href = 'index-admin.html';

          return;
        }
        localStorage.setItem("korisnikUsername", username);
        window.location.href = 'logovan-index.html';
        return;
      }
    })
  }) 
}
function odjava(){
  localStorage.removeItem("korisnikUsername");
  window.location.href = 'inner-page.html';
}

function login() {
    x.style.left = "50px";
    y.style.left = "470px";
    z.style.left = "0px";
}

const updateButton = document.getElementById('dugmence');
const favDialog = document.getElementById('favDialog');
const outputBox = document.querySelector('output');
// const selectEl = favDialog.querySelector('select');
// const confirmBtn = favDialog.querySelector('#confirmBtn');

// If a browser doesn't support the dialog, then hide the
// dialog contents by default.
// if ( typeof favDialog.showModal !== 'function' ) {
//   favDialog.hidden = true;
  /* a fallback script to allow this dialog/form to function
     for legacy browsers that do not support <dialog>
     could be provided here.
  */
//}
// "Update details" button opens the <dialog> modally
updateButton.addEventListener('click', function onOpen() {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    outputBox.value = "Sorry, the <dialog> API is not supported by this browser.";
  }
});
// "Favorite animal" input sets the value of the submit button
// selectEl.addEventListener('change', function onSelect(e) {
//   confirmBtn.value = selectEl.value;
// });
// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
// favDialog.addEventListener('close', function onClose() {
//   outputBox.value = favDialog.returnValue + " button clicked - " + (new Date()).toString();
// });