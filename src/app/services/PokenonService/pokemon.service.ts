import { Injectable } from '@angular/core';
import { PokemonFilterModel } from '../../models/PokemonFilterModel';
import { Observable, map } from 'rxjs';
import { PokemonModel } from '../../models/PokemonModel';
import { ApiService } from '../API/api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private api: ApiService) {}

  getAllPokemons(filter: PokemonFilterModel): Observable<PokemonModel[]> {
    return this.api.get(`cards`, filter).pipe(
      map((pokemons: any) => {
        return pokemons.data.map((c: PokemonModel) => new PokemonModel(c));
      })
    );
  }

  getAllPokemonsFilter(q: string): Observable<PokemonModel[]> {
    return this.api.get(`cards?q=name:${q}`).pipe(
      map((pokemons: any) => {
        return pokemons.data.map((c: PokemonModel) => new PokemonModel(c));
      })
    );
  }
}
