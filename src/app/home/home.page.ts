import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    icono: string;
    mov: number = 0;
    movJugador1: any[] = [];
    movJugador2: any[] = [];
    movGanador: any[][] = [
      ["0","1","2"],
      ["3","4","5"],
      ["6","7","8"],
      ["0","3","6"],
      ["1","4","7"],
      ["2","5","8"],
      ["0","4","8"],
      ["2","4","6"],
    ];
    tablero = [
      ["0","1","2"],
      ["3","4","5"],
      ["6","7","8"],
    ];
    end: boolean = false;
    show: boolean = false;
    ganador: string = '';
    constructor(
      //public alertController: AlertController,
      public toast: HotToastService
      ) {}
    
    /*async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'This is an alert!',
        buttons: ['OK'],
      });

      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
    }*/
    showToast() {
      this.toast.show(this.ganador, {
        icon: '👏',
        duration: 2000,
        position: 'bottom-right',
          style: {
            padding: '20px',
            color: '#fff',
            backgroundColor: '#939FB3',
            borderRadius: '15px',
            fontSize: '1.3rem',
          },
      });
    }
    movimiento(evento) {
      this.mov++;
      console.log(evento.srcElement.id);
      let idelemento = evento.srcElement.id;
      document.getElementById(idelemento).setAttribute('disabled','true');
      if(this.mov % 2 === 0) {
        document.getElementById(idelemento).setAttribute('color', 'success');
        this.movJugador1.push(idelemento);
        for(let i = 0; i < this.movGanador.length; i++) {
          if(this.movGanador[i].every(x => this.movJugador1.includes(x))) {
            this.ganador = 'Player two wins';
          }
        for(let i = 0; i < 3; i++) {
          for(let j = 0; j < 3; j++) {
            if(this.tablero[i][j] === idelemento) {
              this.tablero[i][j] = 'X';
              }
            }
          }
        }
      }
      else{  
        document.getElementById(idelemento).setAttribute('color', 'danger');
        this.movJugador2.push(idelemento);
        for(let x = 0; x < this.movGanador.length; x++) {
          if(this.movGanador[x].every(x => this.movJugador2.includes(x))) {
            this.ganador = 'Player one wins';
            }
          }
        }
      if(this.mov === 9 && this.ganador === '') {
          this.ganador = 'Draw';
          this.showToast();
          this.end = true;
          this.show = true;
      }
      else if(this.ganador !== '') {
          this.showToast();
          this.end = true;
          this.show = true;
        }
      }
      restart() {
        this.mov = 0;
        this.movJugador1 = [];
        this.movJugador2 = [];
        this.ganador = '';
        this.end = false;
        this.show = false;
        for(let i = 0; i < 9; i++) {
          document.getElementById(i.toString()).setAttribute('color', 'primary');
      }
    }
  }
