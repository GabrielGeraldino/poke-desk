import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PokemonModel } from '../../models/PokemonModel';
import { lastValueFrom } from 'rxjs';
import { PokemonService } from '../../services/PokenonService/pokemon.service';
import { PokemonFilterModel } from '../../models/PokemonFilterModel';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-cards-add',
  standalone: true,
  templateUrl: './cards-add.component.html',
  styleUrls: ['./cards-add.component.scss'],
  imports: [SharedModule, PokemonCardComponent],
})
export class CardsAddComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private sharedService: SharedService
  ) {}

  filter: PokemonFilterModel = new PokemonFilterModel();
  allPokemons: PokemonModel[] = [];
  @Input() deckId: any;
  decks: any;
  deckLength: number = 0;
  currentDeck: any;

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

    const decksData = localStorage.getItem('decks');
    this.decks = decksData ? JSON.parse(decksData) : [];

    const deckIndex = this.decks.findIndex((d: any) => d.id === this.deckId);
    this.currentDeck = this.decks[deckIndex];

    console.log('this.decks', this.currentDeck);
    this.getCount();
  }

  addToDeck(pokemon: PokemonModel) {
    const deckIndex = this.decks.findIndex((d: any) => d.id === this.deckId);

    if (deckIndex !== -1) {
      if (this.decks[deckIndex].cards.length >= 60) {
        this.sharedService.showToast(
          'Você já atingiu o número máximo de 60 cartas neste deck.',
          2500,
          'danger'
        );
        return;
      }

      const existingCard = this.decks[deckIndex].cards.find(
        (card: any) => card.name === pokemon.name
      );

      if (existingCard) {
        if (
          this.decks[deckIndex].cards.filter(
            (card: any) => card.name === pokemon.name
          ).length >= 4
        ) {
          this.sharedService.showToast(
            'Ja possuem 4 cartas com o mesmo nome!',
            2500,
            'danger'
          );
          return;
        }
      }

      this.decks[deckIndex].cards.push(pokemon);
      this.saveDecksToLocalStorage();
    }
  }

  async saveDecksToLocalStorage() {
    const decksJson = JSON.stringify(this.decks);
    localStorage.setItem('decks', decksJson);

    this.getCount();

    await this.sharedService.showToast('Card salvo com sucesso!');
  }

  getCount() {
    const deckIndex = this.decks.findIndex((d: any) => d.id === this.deckId);

    this.deckLength = this.decks[deckIndex].cards.length;
  }
}
