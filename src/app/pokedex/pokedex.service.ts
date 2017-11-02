import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PokedexService {
  // die könnte man in die enviroment.ts schrieben, so kann man unterschiedliche APIs für dev und prod haben
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  /** Inject den HTTP service. */
  // Nutze HttpClient (da Http mit version 5 deprecated ist)
  constructor(private http: Http) { }

  /** Methode die die Daten von der Pokémon API fetched. */
  getPokemon(offset: number, limit: number) {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      /**
       * Die `get()` Methode gibt einen
       * Observable zurück, aber wir konvertieren es zu einem Promise.
       */
      // Warum? :'(
      // das geht auch mit rxjs sehr einfach und gut
      .toPromise()
      .then(response => response.json().results)
      .then(items => items.map((item, idx) => {
        const id: number = idx + offset + 1;

        return {
          name: item.name,
          sprite: `${this.baseSpriteUrl}${id}.png`,
          id
        };
      }));

      /*
      return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .map(response => response.json().results)
      .map(items => items.map((item, idx) => {
        const id: number = idx + offset + 1;

        return {
          name: item.name,
          sprite: `${this.baseSpriteUrl}${id}.png`,
          id
        };
      }));
      */
  }
}