import { Component, OnInit } from '@angular/core';
import { PokedexService } from './pokedex.service';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-pokedex',
  // service muss hier nicht erneut provided werden, das machst du bereits im module. 
  // Dieses Provide sorgt dafür, dass es eine eigene Instanz nur für dies Komponente gibt
  // Bei dem Service macht das keinen Unterschied, aber falls dein Service states hat, dann wären die unterschiedlich
  // In der der Regel reicht es einmal im Module einen Service bekannt zu machen.
  providers: [PokedexService],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemon: Pokemon[] = [];
  // boolean = false ist trivial für den typescript compiler.
  // Wenn du Variablen mit primitiven Typen instanzierst, dann wird der type impliziet gesetzt
  // Webstorm linter mault da auch ;)
  isLoading: boolean = false;
  error: boolean = false;
  constructor(private pokedexService: PokedexService) { }
  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    this.isLoading = true;
    this.pokedexService.getPokemon(this.pokemon.length, 9)
      // das promise wäre echt nicht nötig gewesen
      .then(pokemon => {
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          return p;
        });
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
      /*
      .subscribe(pokemon => {
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          return p;
        });
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
      }, () => {
        this.error = true;
        this.isLoading = false;
      });
      */
  }
}
