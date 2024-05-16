import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonModel } from '../../models/PokemonModel';
import { ModalController } from '@ionic/angular';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-cards-add',
  standalone: true,
  templateUrl: './cards-add.component.html',
  styleUrls: ['./cards-add.component.scss'],
  imports: [SharedModule],
})
export class CardsAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private sharedService: SharedService
  ) {
    this.deckForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  hasDeck = false;
  createForm = false;
  deckForm: FormGroup;
  deckImage?: File;
  decks: any[] = [];
  @Input() pokemon: PokemonModel = new PokemonModel();

  ngOnInit() {
    const decksData = localStorage.getItem('decks');
    this.decks = decksData ? JSON.parse(decksData) : [];
  }

  addToDeck(deckId: string) {
    const deckIndex = this.decks.findIndex((d) => d.id === deckId);

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
        (card: any) => card.name === this.pokemon.name
      );

      if (existingCard) {
        if (
          this.decks[deckIndex].cards.filter(
            (card: any) => card.name === this.pokemon.name
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

      this.decks[deckIndex].cards.push(this.pokemon);
      this.saveDecksToLocalStorage();
    }
  }

  async saveDecksToLocalStorage() {
    const decksJson = JSON.stringify(this.decks);
    localStorage.setItem('decks', decksJson);

    this.modalController.dismiss();
    await this.sharedService.showToast('Card salvo com sucesso!');
  }

  generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  createDeck() {
    if (this.deckForm.valid) {
      const nameControl = this.deckForm.get('name');
      const imageControl = this.deckForm.get('image');

      if (nameControl && imageControl) {
        const deck = {
          name: nameControl.value,
          image: imageControl.value,
        };

        this.saveToLocalStorage(deck);
        this.createForm = false;
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
      cards: [],
    };
    decks.push(newDeck);
    localStorage.setItem('decks', JSON.stringify(decks));

    this.ngOnInit();
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

    console.log('this.deckForm', this.deckForm);
  }
}
