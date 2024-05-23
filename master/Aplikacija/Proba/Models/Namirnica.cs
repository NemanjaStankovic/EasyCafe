using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace Proba.Models
{
    public class Namirnica
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(30)]
        public string Naziv { get; set; }

        [MaxLength(500)]
        public string Opis { get; set; }

        [Range(0,400)]
        [RegularExpression("\\d+")]
        public int Kolicina { get; set; }

        [Range(10,3000)]
        [RegularExpression("\\d+")]
        public double Cena { get; set; }

        [RegularExpression("\\w+")]
        public string Tip { get; set; }
		[JsonIgnore]
        public List<SpojSadrzi> Spojevi { get; set; }
    }
}