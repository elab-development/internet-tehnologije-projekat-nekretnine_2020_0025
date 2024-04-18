# OPIS APLIKACIJE
Potrebno je kreirati aplikaciju koja podržava tri korisničke uloge:
  1.	Neulogovani korisnik
  2.	Kupac
  3.	Prodavac
   
Za svaku od ovih uloga je potrebno kreirati odvojene mogućnosti. Korisnik koji nije ulogovan ima mogućnost pregleda početne stranice, kreiranja naloga (registracije) ili prijave na postojeći nalog. 
Nakon što se korisnik prijavi na sistem, potrebno je proveriti korisničku ulogu. Ukoliko je uloga kupac, korisniku se otvara stranica na kojoj su prikazane sve nekretnine koje agencija ima u ponudi. Za svaku nekretninu treba prikazati naziv nekretnine, opis, cenu, galeriju slika, broj spavaćih soba, tip nekretnine I slično. Kako bismo pružili zadovoljavajuće korisničko iskustvo, neophodno je dodati filtere po raznim kriterijumima: cena, tip nektrentine, pretraga po nazivu.. S obzirom da je aplikacija namenjena za širi region, potrebno je omogućiti prikaz cene u više različitih valuta. Kupci koji su ulogovani treba da imaju mogućnost kreiranja rezervacije za određenu nekretninu, odabirom datuma je potrebno prikazati korisniku cenu, nakon čega korisnik može da potvrdi ili odbije rezervaciju. Kupcima je dostupna I opcija za postavljanje pitanja prodavcima, putem kontakt forme. 
Nakon što se prijavi prodavac, njemu se otvara stranica na kojoj može da upravlja nekretninama. Nekretnine treba da budu prikazane tabelarno, kao I da postoji mogućnost pretrage I sortiranja. Prodavcima treba obezbediti dodavanje nove nekretnine, kao I brisanje ili ažuriranje postojećih. Prodavci takođe treba da imaju uvid u statistike o broju novih korisnika I najboljih nekretnina. Prodavcima je potrebno tabelarno prikazati I poruke koje su kreirali kupci putem kontakt forme. 

# POKRETANJE APLIKACIJE

## LARAVEL

    cd nekretnineLaravel
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate --seed
    php artisan serve

    
## REACT
    cd front
    npm install
    npm start




