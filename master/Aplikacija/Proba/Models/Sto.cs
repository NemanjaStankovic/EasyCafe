using System.ComponentModel.DataAnnotations;

namespace Proba.Models{
    public class Sto{
        [Key]
        public int Id{get; set;}

        [RegularExpression("\\d+")]
        [Required]
        [Range(2,8)]
        public int BrojStolica{get;set;}

        [Range(0,20)]
        public int BrojStolova{get;set;}
    }
}