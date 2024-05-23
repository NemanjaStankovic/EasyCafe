using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proba.Models;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;


namespace WEBPROJEKAT.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class KorisnikController: Controller
    {
        public ContextKlasa Context { get; set; }

        public KorisnikController(ContextKlasa context)
        {
            Context=context;
        }

        [HttpGet("Login")]
        public IActionResult Login(string returnUrl)
        {
            if(User.IsInRole("Admin"))
            {
                return Redirect("PrikaziAdmin");
            }
            if(User.IsInRole("Korisnik"))
            {
                return Redirect("PrikaziLogovan");
            }
            ViewBag.ReturnURL = returnUrl;

            return View();
        }
       
        [HttpPost("PreuzmiKorisnika")]
        public async Task<IActionResult> PreuzmiKorisnika([FromQuery]string returnUrl)
        {

            ViewBag.ReturnURL = returnUrl;

            string email = HttpContext.Request.Form["email"].ToString();
            string lozinka = HttpContext.Request.Form["password"].ToString();

            var korisnik = await Context.Korisnici.Where(p=>p.Email==email).FirstOrDefaultAsync();
            if(korisnik==null)
            {
                ViewBag.Error = "Email invalid!";
                return View("Login");
            }
            var slt = korisnik.SALT;
            byte[] salt = new byte[128 / 8];

            salt = Encoding.ASCII.GetBytes(slt);


            string hashedLozinka = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: lozinka,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8)
            );

            var korisnikPravi = await Context.Korisnici.Where(p=>p.Email==email&&p.Password==hashedLozinka).FirstOrDefaultAsync();
            if (korisnikPravi == null)
            {
                ViewBag.Error = "Password invalid!";
                return View("Login");
            }
            try{
                if (korisnikPravi.isAdmin == true)
                {
                    var claims = new List<Claim>();
                    claims.Add(new Claim("email", email));
                    claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                    claims.Add(new Claim(ClaimTypes.NameIdentifier, email));
                    claims.Add(new Claim(ClaimTypes.IsPersistent, "True"));

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                    await HttpContext.SignInAsync(claimsPrincipal);


                    return Redirect("PrikaziAdmin");
                }
                else
                {

                    var claims = new List<Claim>();
                    claims.Add(new Claim("email", email));
                    claims.Add(new Claim("username", korisnikPravi.Username));
                    claims.Add(new Claim(ClaimTypes.Role, "Korisnik"));
                    claims.Add(new Claim(ClaimTypes.NameIdentifier, email));
                    claims.Add(new Claim(ClaimTypes.Name, email));
                    claims.Add(new Claim(ClaimTypes.IsPersistent, "True"));

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                    
                    await HttpContext.SignInAsync(claimsPrincipal);

                    return Redirect("PrikaziLogovan");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize]
        [HttpGet("PrikaziAdmin")]
        public IActionResult PrikaziAdmin()
        {
            if(User.IsInRole("Korisnik"))
            {
                return Redirect("PrikaziLogovan");
            }
            return View("Admin");
        }

        [Authorize]
        [HttpGet("PrikaziLogovan")]
        public IActionResult PrikaziLogovan()
        {
            if(User.IsInRole("Admin"))
            {
                return Redirect("PrikaziAdmin");
            }
            return View("Logovan");
        }
        
        [HttpGet("Pocetna")]
        public async Task<IActionResult> PreuzmiPocetnu()
        {
            if(User.IsInRole("Korisnik"))
            {
                return Redirect("PrikaziLogovan");
            }
            await HttpContext.SignOutAsync();//ovde odjavi admina
            return View("Pocetna");
        }

        [Authorize]
        [HttpGet("Odjavi")]
        public async Task<IActionResult> Odjavi()
        {
            await HttpContext.SignOutAsync();
            return Redirect("/Korisnik/Pocetna");
        }

        [Route("Registruj se/{username}/{ime}/{prezime}/{email}/{lozinka}/{brojtelefona}")]
        [HttpPost]
        public async Task<ActionResult> Registracija(string username, string ime, string prezime, string email, string lozinka, int brojtelefona)
        {
            try{
                var korisnik = await Context.Korisnici.Where(p=>p.Username==username||p.Email==email).FirstOrDefaultAsync();

                if(korisnik!=null)
                {
                    return StatusCode(203,"Email je vec u upotrebi!");
                }

                byte[] salt = new byte[128 / 8];
                using (var rngCsp = new RNGCryptoServiceProvider())
                {
                    rngCsp.GetNonZeroBytes(salt);
                }
                string saltStr = Encoding.Default.GetString(salt);
                salt = Encoding.ASCII.GetBytes(saltStr);

                string hashedLozinka = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: lozinka,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8)
                );
                
                korisnik = new Korisnik()
                {
                    Username = username,
                    Ime = ime,
                    Prezime = prezime,
                    Email = email,
                    Password = hashedLozinka,
                    SALT = saltStr,
                    BrojTelefona = brojtelefona
                };
                if(email=="admin@easycaffe.com")
                {
                    korisnik.isAdmin=true;
                }

                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();

                return Ok(korisnik);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);

            }
        }


    }
}