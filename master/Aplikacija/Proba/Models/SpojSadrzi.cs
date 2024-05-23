using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;								 

namespace Proba.Models{
    public class SpojSadrzi{
        [Key]
        public int Id{get;set;}

        public Namirnica Namirnica{get;set;}
		[JsonIgnore]
        public Narudzbina Narudzbina{get;set;}

        public int Kolicina{get;set;}
    }
}