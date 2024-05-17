import { Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { SharedModule } from '../../shared/shared.module';
import { lastValueFrom } from 'rxjs';
import { PokemonService } from '../../services/PokenonService/pokemon.service';
import { PokemonFilterModel } from '../../models/PokemonFilterModel';
import { PokemonModel } from '../../models/PokemonModel';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  standalone: true,
  imports: [PokemonCardComponent, SharedModule],
})
export class PokemonsComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  filter: PokemonFilterModel = new PokemonFilterModel();
  allPokemons: PokemonModel[] = [];
  skeletonCount = 10;
  loading = false;
  loadingButton = false;
  search = '';

  async ngOnInit() {
    this.loading = true;
    await this.getPokemons();
  }

  async getPokemons(moreResult = false) {
    this.filter.page += moreResult ? 1 : 0;
    this.loadingButton = true;

    try {
      const res: PokemonModel[] = await lastValueFrom(
        this.pokemonService.getAllPokemons(this.filter)
      );

      if (moreResult) {
        this.allPokemons = [...this.allPokemons, ...res];
      } else {
        this.allPokemons = res;
      }

      this.loadingButton = false;
      console.log('this.allPokemons', this.allPokemons);
    } catch (error) {
      this.loadingButton = false;
      console.error('error', error);
    }

    this.loading = false;
  }

  async getPokemonsFilter() {
    this.loading = true;

    if (this.search.length == 0) {
      await this.getPokemons();
    } else {
      try {
        await lastValueFrom(
          this.pokemonService.getAllPokemonsFilter(this.search)
        ).then((res: PokemonModel[]) => {
          this.allPokemons = res;
          console.log('this.allPokemons', this.allPokemons);
        });
      } catch (error) {
        console.error('error', error);
      }
      this.loading = false;
    }
  }
}
