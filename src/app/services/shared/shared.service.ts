import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  private toast = null;
  private isLoading = false;

  async showLoading(msg?: string, interval: number = 120000) {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        message: msg,
        duration: interval,
      })
      .then((load) => {
        load.present().then(() => {
          if (!this.isLoading) {
            load.dismiss(null, undefined);
          }
        });
      });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss(null);
  }

  async showToast(
    message: string,
    timer?: number,
	color?: 'primary' | 'success' | 'danger' | 'warning',
    position?: 'bottom' | 'top' | 'middle'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      buttons: [{ role: 'cancel', text: 'OK' }],
      color: color ?? 'success',
      duration: timer ?? 2500,
      position: position ?? 'bottom',
    });

    toast.present();
  }
}
