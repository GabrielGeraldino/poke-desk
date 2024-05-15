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
    return this.api
      .get(`${this.api}cards`, filter)
      .pipe(
        map((pokemons: any) =>
          pokemons.map((c: PokemonModel) => new PokemonModel(c))
        )
      );
  }
}
