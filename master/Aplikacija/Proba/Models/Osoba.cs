using System.ComponentModel.DataAnnotations;

namespace Proba.Models{
    public abstract class Osoba{
        
        [Key]
        public int Id{get;set;}

        [RegularExpression("\\w+")]
        [MaxLength(30)]
        public string Ime{get;set;}

        [RegularExpression("\\w+")]
        [MaxLength(30)]
        public string Prezime{get;set;}

        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email{get;set;}

        [RegularExpression("\\d+")]
        [MaxLength(10)]
        [MinLength(9)]
        public int BrojTelefona{get;set;}

        public bool isAdmin{get;set;}
    }
}