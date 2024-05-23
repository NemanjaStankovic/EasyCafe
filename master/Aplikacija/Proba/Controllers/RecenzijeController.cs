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

    public class RecenzijeController: ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public RecenzijeController(ContextKlasa context)
        {
            Context=context;
        }


        [Route("PreuzmiRecenzije/{N}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiRecenzije(int N)
        {
            var sveRecenzije=await Context.Recenzije
                                          .Include(p=>p.korisnik)
                                          .Select(p=>
                                          new
                                          {
                                              ID=p.ID,
                                              Ime=p.korisnik.Ime,
                                              Prezime=p.korisnik.Prezime,
                                              Ocena=p.Ocena,
                                              Komentar=p.Komentar,
                                          }
                                          ).OrderByDescending(s=>s.ID).ToListAsync();
                //sveRecenzije.Skip(sveRecenzije.Count()-2).Take(2);
                if(sveRecenzije==null)
                {
                    return StatusCode(203,"Jos nema ni jedne recenzije!");
                }
                return Ok(sveRecenzije.Skip(5*(N-1)).Take(5));
        }
        [Route("PreuzmiRecenzijeBroj")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiRecenzije()
        {
            var sveRecenzije=await Context.Recenzije.ToListAsync();
                //sveRecenzije.Skip(sveRecenzije.Count()-2).Take(2);
                if(sveRecenzije==null)
                {
                    return StatusCode(203,"Jos nema ni jedne recenzije!");
                }
                if(sveRecenzije.Count()%5==0){
                    return Ok(sveRecenzije.Count()/5);
                }
                else
                {
                    return Ok(sveRecenzije.Count()/5+1);
                }
        }
        [Route("DodajRecenziju/{Ocena}/{Komentar}")]
        [HttpPost]
        public async Task<ActionResult> DodajRecenziju(int Ocena, string Komentar)
        {
            if(Ocena<1 || Ocena>5)
            {
                return BadRequest("Ocena van preporucenog opsega (1-5)!");
            }
            if(Komentar.Length>300)//string.IsNullOrWhiteSpace(Marka) || Marka.Length>15)
            {
                return BadRequest("Prekoracili ste maksimalan broj karaktera!");
            }
            try
            {
                string em = User.FindFirst("email").Value;

                var provera=await Context.Recenzije.Where(p=>p.korisnik.Email==em).FirstOrDefaultAsync();
                if(provera!=null){
                    return StatusCode(201,"Korisnik je vec napisao recenziju!");
                }
                

                var korisnikRecenzent=await Context.Korisnici.Where(p=>p.Email==em).FirstOrDefaultAsync();
                if(korisnikRecenzent==null)
                {
                    return StatusCode(202,"Korisnik ne postoji!");
                }
                Recenzija novaRecenzija=new Recenzija();
                novaRecenzija.Ocena=Ocena;
                novaRecenzija.Komentar=Komentar;
                novaRecenzija.korisnik=korisnikRecenzent;
                Context.Recenzije.Add(novaRecenzija);
                await Context.SaveChangesAsync();
            
                // za proveru u swagger  MOZE DA SE PREBACI U GET
                var sveRecenzije=await Context.Recenzije
                                          .Include(p=>p.korisnik)
                                          .Select(p=>
                                          new
                                          {
                                              ID=p.ID,
                                              Ime=p.korisnik.Ime,
                                              Prezime=p.korisnik.Prezime,
                                              Ocena=p.Ocena,
                                              Komentar=p.Komentar,
                                          }
                                          ).ToListAsync();
                return Ok(sveRecenzije);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);

            }
        }

        [Route("ObrisiRecenziju/{idr}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiRecenziju(int idr)
        {
            if(idr<=0)
            {
                return BadRequest("Pogresan ID");
            }
            try{
                var recenzija = await Context.Recenzije.FindAsync(idr);
                if(recenzija==null)
                {
                    return StatusCode(208,"Recenzija ne postoji ili je izbrisana!");
                }
                Context.Recenzije.Remove(recenzija);
                await Context.SaveChangesAsync();
                return Ok($"Recenzija je izbrisana!");

            }
            catch(Exception ec)
            {
                return BadRequest(ec.Message);
            }
        }
        
    }
    
}