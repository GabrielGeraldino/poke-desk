import { Injectable } from '@angular/core';
import {
  PokemonFilterBaseModel,
  PokemonFilterModel,
} from '../../models/PokemonFilterModel';
import { Observable, map } from 'rxjs';
import {
  PokemonModel,
  RaritiesModel,
  SetModel,
  SubtypeModel,
  SupertypeModel,
  TypeModel,
} from '../../models/PokemonModel';
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

  getSets(filter: PokemonFilterModel): Observable<SetModel[]> {
    return this.api.get(`cards`, filter).pipe(
      map((pokemons: any) => {
        return pokemons.data.map((c: SetModel) => new SetModel(c));
      })
    );
  }
  getTypes(): Observable<any> {
    return this.api.get(`types`).pipe(map((types) => types));
  }
  getSubtTypes(): Observable<any> {
    return this.api.get(`subtypes`).pipe(map((subtypes) => subtypes));
  }
  getSuperTypes(): Observable<any> {
    return this.api.get(`supertypes`).pipe(map((supertypes) => supertypes));
  }
  getRarities(): Observable<any> {
    return this.api.get(`rarities`).pipe(map((rarities) => rarities));
  }

  getAllPokemonsFilter(
    q: string,
    parameter:
      | 'name'
      | 'types'
      | 'subtypes'
      | 'supertypes'
      | 'rarities' = 'name',
    filter: PokemonFilterBaseModel
  ): Observable<PokemonModel[]> {
    return this.api.get(`cards?q=${parameter}:${q}`, filter).pipe(
      map((pokemons: any) => {
        return pokemons.data.map((c: PokemonModel) => new PokemonModel(c));
      })
    );
  }
}
