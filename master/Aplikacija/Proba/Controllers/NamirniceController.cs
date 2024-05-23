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

    public class NamirniceController: ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public NamirniceController(ContextKlasa context)
        {
            Context=context;
        }

        [Route("PreuzmiMeni")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiMeni()
        {
            var meni=await Context.Namirnice.Where(p=>p.Kolicina>0).ToListAsync();
                if(meni==null)
                {
                    return StatusCode(201,"Meni je prazan!");
                }
                return Ok(meni);
                
        }
        [Route("PreuzmiMeniCeo")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiMeniCeo()
        {
            var meni=await Context.Namirnice.Where(p=>p.Kolicina>-1).ToListAsync();
                if(meni==null)
                {
                    return StatusCode(201,"Meni je prazan!");
                }
                return Ok(meni);
                
        }
        [Route("PromeniKolicinu/{kolicina}/{namirnica}")]
        [HttpPut]
        public async Task<ActionResult> Promeni(int kolicina,string namirnica)
        {
            if(kolicina<1 || kolicina>300)
            {
                return StatusCode(206,"Neispravna kolicina!");
            }
            try
            {
                var namirnicaZaPromenu=await Context.Namirnice.Where(p=>p.Naziv==namirnica).FirstOrDefaultAsync();
                if(namirnicaZaPromenu==null)
                {
                    return StatusCode(207,"Ne postoji namirnica!");
                }
                namirnicaZaPromenu.Kolicina=kolicina;
                await Context.SaveChangesAsync();
                
                return Ok("Uspesno promenjen!");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("PromeniCenu/{cena}/{namirnica}")]
        [HttpPut]
        public async Task<ActionResult> PromeniCenu(int cena, string namirnica)
        {
            if (cena < 10 || cena > 5000)
            {
                return StatusCode(206, "Neispravna cena!");
            }
            try
            {
                var namirnicaZaPromenu = await Context.Namirnice.Where(p => p.Naziv == namirnica).FirstOrDefaultAsync();
                if (namirnicaZaPromenu == null)
                {
                    return StatusCode(207, "Ne postoji namirnica!");
                }
                namirnicaZaPromenu.Cena = cena;
                await Context.SaveChangesAsync();

                return Ok("Uspesno promenjen!");

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("PromeniNaziv/{naziv}/{namirnica}")]
        [HttpPut]
        public async Task<ActionResult> PromeniNaziv(string naziv,string namirnica)
        {
            if(string.IsNullOrWhiteSpace(naziv)||naziv.Length>30)
            {
                return StatusCode(206,"Nevalidan naziv!");
            }
            try
            {
                var namirnicaZaPromenu=await Context.Namirnice.Where(p=>p.Naziv==namirnica).FirstOrDefaultAsync();
                if(namirnicaZaPromenu==null)
                {
                    return StatusCode(207,"Ne postoji namirnica!");
                }
                namirnicaZaPromenu.Naziv=naziv;
                await Context.SaveChangesAsync();
                
                return Ok("Uspesno promenjen!");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("Obrisi namirnicu/{namirnica}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiNamirnicu(string namirnica)
        {
            try
            {
                var namirnicaZaBrisanje=await Context.Namirnice.Where(p=>p.Naziv==namirnica).FirstOrDefaultAsync();
                if(namirnicaZaBrisanje==null)
                {
                    return StatusCode(207,"Ne postoji namirnica!");
                }

                Context.Namirnice.Remove(namirnicaZaBrisanje);
                await Context.SaveChangesAsync();
                return Ok($"Namirnica {namirnicaZaBrisanje.Naziv} izbrisana");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("DodajNamirnicu")]
        [HttpPost]
        public async Task<ActionResult> DodajNamirnicu([FromBody] Namirnica namirnica)
        {
            if(string.IsNullOrWhiteSpace(namirnica.Naziv) || namirnica.Naziv.Length>30)
            {
                return BadRequest("Naziv ne sme da bude prazno polje ili duze od 30 karaktera!");
            }
            if(string.IsNullOrWhiteSpace(namirnica.Opis) || namirnica.Opis.Length>500)
            {
                return BadRequest("Opis ne sme da bude duzi od 500 karaktera!");
            }
            if(namirnica.Kolicina>300 || namirnica.Kolicina<0)
            {
                return BadRequest("Nevalidna vrednost za kolicinu 0-100");
            }
            if(namirnica.Cena>3000 || namirnica.Cena<10)
            {
                return BadRequest("Nevalidna vrednost za cenu. Cena ne sme da bude veca od 3000 ni manja od 10");
            }
            if(namirnica.Tip!="hrana" && namirnica.Tip!="pice")
            {
                return BadRequest($"Nevalidna vrednost za tip, {namirnica.Tip}!");
            }
            try
            {
                var nam=await Context.Namirnice.Where(p=>p.Naziv==namirnica.Naziv).FirstOrDefaultAsync();
                if(nam!=null)
                {
                    return StatusCode(204,"Namirnica sa datim imenom vec postoju u bazi!");
                }
                Context.Namirnice.Add(namirnica);
                await Context.SaveChangesAsync();

                return Ok($"Namirnica {namirnica.Naziv} je uspesno dodata!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);

            }
        }
        

        
    }
    
}