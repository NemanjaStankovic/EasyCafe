using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proba.Models;
namespace WEBPROJEKAT.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class NarudzbinaController: ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public NarudzbinaController(ContextKlasa context)
        {
            Context=context;
        }

        [Route("Preuzimi sve narudzbine")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSveNarudzbine()
        {
             var nardz = await Context.Narudzbine
                                                .Include(p=>p.Korisnik)
                                                .Include(p=>p.Sto)
                                                .Select(p=>new{
                                                    Username=p.Korisnik.Username,
                                                    Narudzbina=p.ID,
                                                    Cena=p.UkupnaCena,
                                                    // Sto=p.Sto
                                                    //Sto=p.Sto.BrojStolica
                                                })
                                                .ToListAsync();
             try{
                if(nardz.Count==0)
                {
                    return StatusCode(203,"Nema narudzbina");
                }
                return Ok(nardz);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Preuzmi narudzbinu/{id}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiNarudzbinu(int id)
        {
            var sp = await Context.Spojevi.Where(s=>s.Narudzbina.ID == id)
                                          .Include(s=>s.Namirnica)
                                          .Select(s=>new{
                                              Naziv = s.Namirnica.Naziv,
                                              Opis = s.Namirnica.Opis,
                                              Tip = s.Namirnica.Tip,
                                              Kolicina = s.Kolicina,
                                              Cena = s.Namirnica.Cena
                                              }).ToListAsync();
            var nardz = await Context.Narudzbine.Where(p=>p.ID == id)
                                                .Include(p=>p.Korisnik)
                                                .Include(p=>p.Sto)
                                                .Select(p=>new{
                                                    Ime=p.Korisnik.Ime,
                                                    Prezime=p.Korisnik.Prezime,
                                                    BrojStola = p.Sto,
                                                    Cena=p.UkupnaCena,
                                                    Vreme=p.Vreme,			  				  
                                                    Hrana = sp
                                                })
                                                .ToListAsync();
            try{
                if(nardz==null)
                {
                    return StatusCode(203,"Nema narudzbine sa ovim brojem");
                }
                return Ok(nardz);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("Naruci/{idsto}/{vreme}/{cena}")]
        [HttpPost]
        public async Task<ActionResult> Naruci([FromQuery] int[] idnamirnica,[FromQuery] int[] kolicina, int idsto, string vreme, int cena)
        {
            string em = User.FindFirst("email").Value;

            var kor = await Context.Korisnici.Where(p=>p.Email==em).FirstAsync();
            Sto sto;
            var nam = await Context.Namirnice.Where(p=>idnamirnica.Contains(p.ID)).ToListAsync();
            if(idsto==0)
                {
                    sto=null;
                }
            else{
                sto = await Context.Stolovi.Where(p=>p.BrojStolica==idsto).FirstAsync();
                if(sto.BrojStolova==0)
                {
                    return StatusCode(204,"Nema vise stolova!");
                }
                sto.BrojStolova--;
            }

            var narudzbina = new Narudzbina(){
                Korisnik = kor,
                Sto = sto,
				UkupnaCena = cena,
                Vreme = vreme				  					 
            };
            var namikol = nam.Zip(kolicina, (n, k) => new { nam = n, kol = k });
            try
            {  
                foreach(var nk in namikol)
                {
                    var pom=await Context.Namirnice.FindAsync(nk.nam.ID);
                    if(pom.Kolicina<nk.kol){
                        return StatusCode(205,"Secas li se lepi grome moj");
                    }
                    pom.Kolicina-=nk.kol;
                    var spoj = new SpojSadrzi()
                    {
                        Namirnica = nk.nam,
                        Narudzbina = narudzbina,
                        Kolicina = nk.kol
                    };
                    Context.Spojevi.Add(spoj);
                };
                Context.Narudzbine.Add(narudzbina);
                await Context.SaveChangesAsync();
                return Ok($"Dodati su narudzbina i spoj!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiNarudzbinu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiNarudzbinu(int id)
        {
            if(id<=0)
            {
                return BadRequest("Pogresan ID");
            }
            try
            { 
                var nar=await Context.Narudzbine.Where(p=>p.ID==id).Include(p=>p.Sto).Include(p=>p.Spojevi).ThenInclude(p=>p.Namirnica).FirstOrDefaultAsync();
                //return Ok($"Obrisatoooo!{nar.Sto.Id}");
                //return Ok(nar);
                if(nar.Sto!=null)
                {
                    //return Ok($"Obrisatoooo!{nar.Sto}");
                    Sto sto=await Context.Stolovi.FindAsync(nar.Sto.Id);
                    sto.BrojStolova++;
                }            
                foreach(SpojSadrzi s in nar.Spojevi)
                {
                    //return Ok($"Obrisatoooo!");
                    Context.Spojevi.Remove(s);
                }
                //return Ok($"Obrisatoooososoos!");
                Context.Narudzbine.Remove(nar);
                await Context.SaveChangesAsync();
                return Ok($"Obrisatoooo!");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}