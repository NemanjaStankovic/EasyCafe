using Microsoft.EntityFrameworkCore;

namespace Proba.Models{
    public class ContextKlasa : DbContext{
        public ContextKlasa(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Sto> Stolovi { get; set; }
        public DbSet<Namirnica> Namirnice { get; set; }
        public DbSet<Narudzbina> Narudzbine { get; set; }
        public DbSet<Recenzija> Recenzije{get;set;}
        public DbSet<SpojSadrzi> Spojevi {get;set;}
    }
}