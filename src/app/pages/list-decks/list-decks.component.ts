import { CardsAddComponent } from './../../components/cards-add/cards-add.component';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { SharedService } from '../../services/shared/shared.service';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-list-decks',
  templateUrl: './list-decks.component.html',
  styleUrls: ['./list-decks.component.scss'],
  standalone: true,
  imports: [SharedModule, ComponentsModule],
})
export class ListDecksComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private sharedService: SharedService,
    private alertController: AlertController
  ) {
    this.deckForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  edit = false;
  title = 'list-decks';
  decks: any[] = [];
  createForm = false;
  deckForm: FormGroup;

  async ngOnInit() {
    const decksData = localStorage.getItem('decks');
    this.decks = decksData ? JSON.parse(decksData) : [];
    await this.getCardsCount();
  }

  createDeck() {
    if (this.deckForm.valid) {
      const nameControl = this.deckForm.get('name');
      const imageControl = this.deckForm.get('image');

      if (nameControl && imageControl) {
        const deck = {
          name: nameControl.value,
          image: imageControl.value,
          isEditMode: false,
          deckColors: [],
          pokemonsCard: 0,
          trainerCard: 0,
        };

        let newDeck = this.saveToLocalStorage(deck);
        this.createForm = false;
        this.selectedDeckModal(newDeck.id, true);
      }
    }
  }

  saveToLocalStorage(deck: any) {
    const decksData = localStorage.getItem('decks');
    const decks = decksData ? JSON.parse(decksData) : [];
    const newDeck = {
      id: this.generateUniqueId(),
      name: deck.name,
      image: deck.image,
      pokemonsCard: deck.pokemonsCard,
      trainerCard: deck.trainerCard,
      deckColors: deck.deckColors,
      cards: [],
    };
    decks.push(newDeck);
    localStorage.setItem('decks', JSON.stringify(decks));
    return newDeck;
  }

  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Tem certeza que deseja exlcuir o deck?',
      message: 'Se você excluir, perderá as cartas salvas!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.deleteDeck(id);
          },
        },
      ],
      cssClass: 'custon-alert',
    });
    await alert.present();
  }

  deleteDeck(id: string) {
    const decksData = localStorage.getItem('decks');
    if (decksData) {
      const decks = JSON.parse(decksData);
      const updatedDecks = decks.filter((deck: any) => deck.id !== id);
      localStorage.setItem('decks', JSON.stringify(updatedDecks));
      this.modalController.dismiss();
      this.ngOnInit();
    }
  }

  editDeck(id: string, name: string) {
    const decksData = localStorage.getItem('decks');
    if (decksData) {
      const decks = JSON.parse(decksData);
      const deckIndex = decks.findIndex((deck: any) => deck.id === id);
      if (deckIndex !== -1) {
        decks[deckIndex].name = name;
        localStorage.setItem('decks', JSON.stringify(decks));
      }
    }
  }

  generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.deckForm.patchValue({
      image: null,
    });

    const reader = new FileReader();
    reader.onload = () => {
      const imageControl = this.deckForm.get('image');
      if (imageControl) {
        imageControl.setValue(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  }

  async getCardsCount() {
    for await (const deck of this.decks) {
      if (deck.pokemonsCard + deck.trainerCard != deck.cards.length) {
        await deck.cards.forEach((card: any) => {
          card.types.forEach((cl: string) => {
            if (!deck.deckColors.includes(cl)) {
              deck.deckColors.push(cl);
            }
          });
          if (card.supertype == 'Pokémon') {
            deck.pokemonsCard++;
          } else if (card.supertype == 'Trainer') {
            deck.trainerCard++;
          }
        });
      }
    }

    localStorage.setItem('decks', JSON.stringify(this.decks));
  }

  async selectedDeckModal(deckId: any, newDeck?: boolean) {
    const modal = await this.modalController.create({
      component: CardsAddComponent,
      cssClass: 'custom-modal',
      componentProps: {
        deckId: deckId,
      },
      backdropDismiss: false,
    });

    await modal.present();

    await modal.onDidDismiss().then(async (data: any) => {
      if (newDeck) {
        if (data.data.deck.cards.length < 27 || data.data.close) {
          this.deleteDeck(data.data.deck.id);
        }
      }

      this.ngOnInit();
    });
  }
}
