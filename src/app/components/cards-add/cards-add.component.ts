import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PokemonModel } from '../../models/PokemonModel';
import { lastValueFrom } from 'rxjs';
import { PokemonService } from '../../services/PokenonService/pokemon.service';
import { PokemonFilterModel } from '../../models/PokemonFilterModel';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SharedService } from '../../services/shared/shared.service';
import { AlertController, ModalController } from '@ionic/angular';

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
    private sharedService: SharedService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  filter: PokemonFilterModel = new PokemonFilterModel();
  allPokemons: PokemonModel[] = [];
  @Input() deckId: any;
  decks: any;
  deckLength: number = 0;
  currentDeck: any;
  deckIndex: number = 0;
  skeletonCount = 10;
  search = '';
  loading = false;
  loadingButton = false;

  async ngOnInit() {
    this.loading = true;
    await this.getPokemons();

    const decksData = localStorage.getItem('decks');
    this.decks = decksData ? JSON.parse(decksData) : [];

    this.deckIndex = this.decks.findIndex((d: any) => d.id === this.deckId);
    this.currentDeck = this.decks[this.deckIndex];

    this.getCount();
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

  async addToDeck(pokemon: PokemonModel) {
    if (this.deckIndex !== -1) {
      if (this.decks[this.deckIndex].cards.length >= 60) {
        this.sharedService.showToast(
          'Você já atingiu o número máximo de 60 cartas neste deck.',
          2500,
          'danger'
        );
        return;
      }

      const existingCard = this.decks[this.deckIndex].cards.find(
        (card: any) => card.name === pokemon.name
      );

      if (existingCard) {
        if (
          this.decks[this.deckIndex].cards.filter(
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

      this.decks[this.deckIndex].cards.push(pokemon);
      this.getCount();
    }
  }

  async saveDecksToLocalStorage() {
    const decksJson = JSON.stringify(this.decks);
    localStorage.setItem('decks', decksJson);

    this.getCount();

    await this.sharedService.showToast('Cards salvo com sucesso!');
    await this.modalController.dismiss({
      deck: this.decks[this.deckIndex],
    });
  }

  getCount() {
    this.deckLength = this.decks[this.deckIndex].cards.length;
  }

  async close() {
    const alert = await this.alertController.create({
      header: 'Tem certeza que deseja fechar?',
      message: 'Se você fechar, seu deck não será salvo!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.modalController.dismiss({
              deck: this.decks[this.deckIndex],
              close: true,
            });
          },
        },
      ],
      cssClass: 'custon-alert',
    });
    await alert.present();
  }
}
