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

  async ngOnInit() {
    try {
      await lastValueFrom(this.pokemonService.getAllPokemons(this.filter)).then(
        (res: PokemonModel[]) => {
          this.allPokemons = res;
          console.log('this.allPokemons', this.allPokemons);
        }
      );
    } catch (error) {
      console.error('error', error);
    }
  }
}
