import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PokemonModel } from '../../models/PokemonModel';
import { ModalController } from '@ionic/angular';
import { CardsAddComponent } from '../cards-add/cards-add.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  constructor(private modalController: ModalController) {}

  @Input() pokemon: PokemonModel = new PokemonModel();

  async openModal() {
    const modal = await this.modalController.create({
      component: CardsAddComponent,
      cssClass: 'custom-modal',
      componentProps: {
        pokemon: this.pokemon,
      },
    });

    await modal.present();

    await modal.onDidDismiss().then(async (value: any) => {
      if (value.data) {
      }
    });
  }
}
