import { CardsAddComponent } from './../../components/cards-add/cards-add.component';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private sharedService: SharedService
  ) {
    this.deckForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  title = 'list-decks';
  decks: any[] = [];
  createForm = false;
  deckForm: FormGroup;

  ngOnInit() {
    const decksData = localStorage.getItem('decks');
    this.decks = decksData ? JSON.parse(decksData) : [];
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

    console.log('this.deckForm', this.deckForm);
  }

  async selectedDeckModal(deckId: any) {
    console.log('teste');
    const modal = await this.modalController.create({
      component: CardsAddComponent,
      cssClass: 'custom-modal',
      componentProps: {
        deckId: deckId,
      },
    });

    await modal.present();

    await modal.onDidDismiss().then(async (value: any) => {
      // if (value.data) {
      // }
    });
  }
}
