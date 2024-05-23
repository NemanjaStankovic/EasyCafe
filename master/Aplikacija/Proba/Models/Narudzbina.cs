using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Proba.Models
{
    public class Narudzbina
    {
        [Key]
        public int ID { get; set; }
		public string Vreme { get; set; }
        public int UkupnaCena { get; set; }
        [JsonIgnore]
        public Korisnik Korisnik { get; set; }

        public List<SpojSadrzi> Spojevi { get; set; }

        public Sto Sto{get; set;}
    }
}
