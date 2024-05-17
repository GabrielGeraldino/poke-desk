import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  PokemonModel,
  RaritiesModel,
  SubtypeModel,
  SupertypeModel,
  TypeModel,
} from '../../models/PokemonModel';
import { lastValueFrom } from 'rxjs';
import { PokemonService } from '../../services/PokenonService/pokemon.service';
import {
  PokemonFilterBaseModel,
  PokemonFilterModel,
} from '../../models/PokemonFilterModel';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SharedService } from '../../services/shared/shared.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
    private modalController: ModalController,
    private translate: TranslateService
  ) {}

  filter: PokemonFilterModel = new PokemonFilterModel();
  allPokemons: PokemonModel[] = [];
  allTypes: TypeModel[] = [];
  allSubTypes: SubtypeModel[] = [];
  allSuperType: SupertypeModel[] = [];
  allRarities: RaritiesModel[] = [];
  @Input() deckId: any;
  decks: any;
  deckLength: number = 0;
  currentDeck: any;
  deckIndex: number = 0;
  skeletonCount = 10;
  search = '';
  loading = false;
  loadingButton = false;
  filterBase: PokemonFilterBaseModel = new PokemonFilterBaseModel();
  parameter: 'name' | 'types' | 'subtypes' | 'supertypes' | 'rarities' = 'name';
  selectedType: any;
  selectedSubtype: any;
  selectedSupertype: any;
  selectedRarity: any;

  async ngOnInit() {
    this.loading = true;
    await this.getPokemons();

    await this.getTypes();
    await this.getSubtTypes();
    await this.getSuperTypes();
    await this.getRarities();

    const decksData = localStorage.getItem('decks');
    this.decks = decksData ? JSON.parse(decksData) : [];

    this.deckIndex = this.decks.findIndex((d: any) => d.id === this.deckId);
    this.currentDeck = this.decks[this.deckIndex];

    this.getCount();
  }

  async getTypes() {
    try {
      const res: TypeModel = await lastValueFrom(
        this.pokemonService.getTypes()
      );

      this.allTypes = res.data;
    } catch (error) {
      this.loadingButton = false;
      console.error('error', error);
    }

    this.loading = false;
  }
  async getSubtTypes() {
    try {
      const res: SubtypeModel = await lastValueFrom(
        this.pokemonService.getSubtTypes()
      );

      this.allSubTypes = res.data;
    } catch (error) {
      this.loadingButton = false;
      console.error('error', error);
    }

    this.loading = false;
  }
  async getSuperTypes() {
    try {
      const res: SupertypeModel = await lastValueFrom(
        this.pokemonService.getSuperTypes()
      );

      this.allSuperType = res.data;
    } catch (error) {
      this.loadingButton = false;
      console.error('error', error);
    }

    this.loading = false;
  }
  async getRarities() {
    try {
      const res: RaritiesModel = await lastValueFrom(
        this.pokemonService.getRarities()
      );

      this.allRarities = res.data;
    } catch (error) {
      this.loadingButton = false;
      console.error('error', error);
    }

    this.loading = false;
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
    } catch (error) {
      this.loadingButton = false;
      console.error('error', error);
    }

    this.loading = false;
  }

  async getPokemonsFilter(
    searchIncome?: any,
    increasePage = false,
    parameter:
      | 'name'
      | 'types'
      | 'subtypes'
      | 'supertypes'
      | 'rarities' = 'name',
    changeParam = false,
    resetOthersFilter = false
  ) {
    if (searchIncome) {
      this.search = searchIncome.detail.value
        ? searchIncome.detail.value
        : null;
    }

    this.loading = increasePage ? false : true;
    this.loadingButton = increasePage;
    this.parameter = changeParam ? parameter : this.parameter;

    if (resetOthersFilter) {
      await this.resetOthersFilter(this.parameter);
    }

    this.filterBase.page = increasePage ? +1 : this.filterBase.page;

    if (this.search.length == 0) {
      await this.getPokemons();
    } else {
      try {
        const res: PokemonModel[] = await lastValueFrom(
          this.pokemonService.getAllPokemonsFilter(
            this.search,
            this.parameter,
            this.filterBase
          )
        );

        if (increasePage) {
          this.allPokemons = [...this.allPokemons, ...res];
        } else {
          this.allPokemons = res;
        }
      } catch (error) {
        console.error('error', error);
      }
      this.loading = false;
      this.loadingButton = false;
    }
  }

  async resetOthersFilter(filterType: any) {
    if (filterType != 'types') {
      this.selectedType = '';
    }
    if (filterType != 'subtypes') {
      this.selectedSubtype = '';
    }
    if (filterType != 'supertypes') {
      this.selectedSupertype = '';
    }
    if (filterType != 'rarities') {
      this.selectedRarity = '';
    }
  }

  async addToDeck(pokemon: PokemonModel) {
    if (this.deckIndex !== -1) {
      if (this.decks[this.deckIndex].cards.length >= 60) {
        this.sharedService.showToast(
          this.translate.instant('cardsAdd.maxCards'),
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
            this.translate.instant('cardsAdd.sameNameCards'),
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

    await this.sharedService.showToast(
      this.translate.instant('cardsAdd.saveSuccess')
    );
    await this.modalController.dismiss({
      deck: this.decks[this.deckIndex],
    });
  }

  getCount() {
    this.deckLength = this.decks[this.deckIndex].cards.length;
  }

  async close() {
    const alert = await this.alertController.create({
      header: this.translate.instant('cardsAdd.controllerHeader'),
      message: this.translate.instant('cardsAdd.controllerMessage'),
      buttons: [
        {
          text: this.translate.instant('common.cancel'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('common.confirm'),
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
