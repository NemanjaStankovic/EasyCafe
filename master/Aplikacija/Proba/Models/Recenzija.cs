using System.ComponentModel.DataAnnotations;

namespace Proba.Models
{
    public class Recenzija
    {
        [Key]
        public int ID { get; set; }

        [RegularExpression("\\d+")]
        [Required]
        [Range(1,5)]
        public int Ocena { get; set; }

        [MaxLength(300)]
        public string Komentar { get; set; }

        public Korisnik korisnik { get; set; }
 
    }
}