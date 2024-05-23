const cartBtn = document.querySelector(".cart-btn");
const closeCart = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartTotal= document.querySelector(".cart-total");
const cartContent= document.querySelector(".cart-content");
const dugmeZaNarucivanje=document.getElementById("dugmeZaNarucivanje");

class Storage{
    static  sacuvajNamirnice(namirnice){
        localStorage.setItem("namirnice",JSON.stringify(namirnice));
    }
    static saveCart(cart) {
        //console.log("Changing cart"+JSON.stringify(cart));
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    static getProduct(id) {
        let namirnice = JSON.parse(localStorage.getItem("namirnice"));
        return namirnice.find(namirnice => namirnice.id == id);
    }
    static preuzmiSto(){
      if(localStorage.getItem("sto")==null)
        return null;
      if(localStorage.getItem("sto")!="zp"){
        return parseInt(localStorage.getItem("sto"));
      }
      else{
        return 0;
      }
    }
    static preuzmiKorisnika(){
      return localStorage.getItem("korisnikUsername");//  ??????
    }
	static preuzmiVreme(){
      console.log("vreme"+localStorage.getItem("vreme:"));
      return localStorage.getItem("vreme:");//  ??????
    } 
    static fja(broj){
        let cartItem={...JSON.parse(localStorage.getItem("namirnice")), amount: broj }
        let tempItem=cart.find(item=>item.id==cartItem.id);
        if(tempItem!=null)
        {
          console.log(parseInt(tempItem.amount)+"-"+parseInt(broj))
          let pom=parseInt(tempItem.amount);
          tempItem.amount=pom+parseInt(broj);
          let zabrisanje=document.querySelectorAll(".remove-item");
          cartItem=tempItem;
          zabrisanje.forEach(p=>{if(p.dataset.id==cartItem.id)p.parentNode.parentNode.parentNode.removeChild(p.parentNode.parentNode)})
        }
        else{
          cart=[...cart, cartItem];
        }
        Storage.saveCart(cart);
        Storage.setCartValues(cart);
        Storage.addCartItem(cartItem);
    }
    static setCartValues(cart) {
        let tempTotal = 0;
        //let itemsTotal = 0;
        cart.map(item => {
          tempTotal += item.cena * item.amount;
          console.log("Nova cena je "+tempTotal);
          //itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    }
    static getCart() {
        return localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [];
    }
    static addCartItem(item){
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML =`<div>
          <h3>${item.naziv}</h3>
          <h5>${item.cena} RSD</h5>
          <span class="remove-item" data-id=${item.id}>Ukloni namirnicu</span>
        </div>
        <div>
          <p class="item-amount">${item.amount}</p>
        </div>`;
      cartContent.appendChild(div);
    }
}

let cart = [];

class Korpa{
}
function getJelovnik(){
  return [...document.querySelectorAll(".dodajUKorpuBroj")];
}
function populateCart(cart) {
    cart.forEach(item => Storage.addCartItem(item));
  }
function setupAPP(){
    cart = Storage.getCart();
    Storage.setCartValues(cart);
    populateCart(cart);
}
function showCart(){
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
}    
function hideCart(){
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
}
function cartLogic(){
  this.clearCart();
  cartContent.addEventListener('click',event=>{
    if(event.target.classList.contains("remove-item"))
    {
      let removeItem=event.target;
      console.log(removeItem);
    };

  })
}
function clearCart(){
  console.log("NEsto se desvasava");
  let cartItems=cart.map(item=>item.id);
  cartItems.forEach(id=>this.removeItem(id))
  while(cartContent.children.length>0){
    cartContent.removeChild(cartContent.children[0])
  }
  localStorage.removeItem("cart");
  localStorage.removeItem("sto");
  localStorage.removeItem("vreme:");

  cartTotal.innerHTML=0;
  Storage.getCart();
  location.reload();
}
function removeItem(id){
  console.log(cart);
  cart=cart.filter(item=>item.id !=id);
  console.log(cart);
  Storage.setCartValues(cart);
  Storage.saveCart(cart);
  let button=this.getSingleBotton(id);
  console.log(button);
}
function getSingleBotton(id){
  jelovnik=getJelovnik();
  return jelovnik.find(podaci=>podaci.dataset.id==id);
}

clearCartBtn.addEventListener("click", ()=>{
  this.clearCart();
});
cartBtn.addEventListener("click", this.showCart);
closeCart.addEventListener("click", this.hideCart);
document.addEventListener("DOMContentLoaded", () => {
    setupAPP();
})
cartContent.addEventListener('click',event=>{
  if(event.target.classList.contains("remove-item"))
  {
    let removeItem=event.target;
    let id=removeItem.dataset.id;
    cartContent.removeChild(removeItem.parentElement.parentElement);
    this.removeItem(id);
  }
})
document.getElementById("izaberiSto").onclick=(ev)=>stoIzaberi();
function stoIzaberi(){
  window.location.href='#specials';
  hideCart();
}
dugmeZaNarucivanje.onclick=(ev)=>this.naruci();
function naruci(){//https://localhost:5001/Narudzbina/Naruci/draganche%40gmail.com/1?idnamirnica=1&idnamirnica=1&kolicina=1&kolicina=1 ovako treba
                  //https://localhost:5001/Narudzbina/Naruci/draganche@gmail.com/0?idnamirnica=1&idnamirnica=3&kolicina=2&kolicina=2   ovako izgleda
  var pomNamirnice="?";
  console.log(Storage.preuzmiSto());
  var pomKolicina="&";
  if(cart==""){
    alert("Korpa je prazna");
    return;
  }
  if(Storage.preuzmiSto()==null){
    alert("Izaberite sto ili opciju za poneti");
    return;
  }
  cart.forEach(el=>{pomNamirnice+="idnamirnica="+el.id+"&";pomKolicina+="kolicina="+el.amount+"&"})
  var stringZaUpit=pomNamirnice.slice(0,-1);
  stringZaUpit+=pomKolicina.slice(0,-1);
  fetch("https://localhost:5001/Narudzbina/Naruci/"+Storage.preuzmiSto()+"/"+
  Storage.preuzmiVreme()+"/"+ cartTotal.innerHTML+stringZaUpit,															   
        {
            method:"POST"
        }).then(s=>{
            if(s.status==200){
              alert("Uspesno poslata narudzbina!");
              this.clearCart();
            }
            else{
               if(s.status==204){
                alert("Nema vise stolova sa datim brojem stolica! Osvezite stranicu za prikaz preostalih stolova!");
               }
               else{
                 if(s.status==205){
                  alert("Nema vise namirnice na stanju! Osvezite stranicu za prikaz preostalih namirnica!");
                 }
               }
            }
        })
}