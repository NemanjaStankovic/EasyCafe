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

    public class StoController: ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public StoController(ContextKlasa context)
        {
            Context=context;
        }

        [Route("PreuzmiStolove")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiStolove()
        {
            var stolovi=await Context.Stolovi.Where(p=>p.BrojStolova>0).ToListAsync();
                if(stolovi==null)
                {
                    return StatusCode(203,"Nema stolova u bazi!");
                }
                return Ok(stolovi);
        }
        [Route("DodajSto/{brojStolica}/{brojStolova}")]
        [HttpPost]
        public async Task<ActionResult> DodajSto(int brojStolica, int brojStolova)
        {
            if(brojStolica<2 || brojStolica>8)
            {
                return BadRequest("Sto ne sme da ima manje od 2 a vise od 8 stolica!");
            }
             if(brojStolova<0 || brojStolova>20)
            {
                return BadRequest("Sto ne sme da ima manje od 2 a vise od 8 stolica!");
            }
            try
            {
                var stoZaPromenu=await Context.Stolovi.Where(p=>p.BrojStolica==brojStolica).FirstOrDefaultAsync();
                var nar=await Context.Narudzbine.Where(p=>p.Sto.BrojStolica==brojStolova).FirstOrDefaultAsync();
                if(stoZaPromenu==null)
                {
                    Sto sto=new Sto();
                    sto.BrojStolica=brojStolica;
                    sto.BrojStolova=brojStolova;
                    if(brojStolova!=0)
                    {
                        Context.Stolovi.Add(sto);
                    }
                    else{
                        return BadRequest("Nononono!");
                    }
                }
                else{
                    if(brojStolova!=0)
                         stoZaPromenu.BrojStolova=brojStolova;
                     else{
                         if(nar!=null)
                         Context.Stolovi.Remove(stoZaPromenu);
                         else{
                             return BadRequest("Lelellele zauzeto mesto!");
                         }
                     }
                }
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.InnerException);
            }
        }
    }
    
}