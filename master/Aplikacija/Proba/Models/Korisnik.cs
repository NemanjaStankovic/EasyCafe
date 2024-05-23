using System.ComponentModel.DataAnnotations;

namespace Proba.Models{
    public class Korisnik : Osoba
    {
        [MaxLength(30)]
        public string Username{get;set;}

        [MinLength(8)]
        public string Password{get;set;}

        public string SALT {get; set;}
    }
}