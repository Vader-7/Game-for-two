import { Component, Input } from '@angular/core';
import { Button } from 'protractor';
import { HotToastService } from '@ngneat/hot-toast';
import { kMaxLength } from 'buffer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
  end: boolean = false;
  show: boolean = false;
  ganador: string;
  constructor(private toast: HotToastService) {}
    
  showToast() {
    this.toast.show(this.ganador, {
      icon: '👏',
      duration: 2000,
      position: 'bottom-center',
        style: {
          padding: '16px',
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
    console.log(this.ganador);
    if(this.mov % 2 == 0) {
      document.getElementById(idelemento).setAttribute('color', 'success');
      this.movJugador1.push(idelemento);
      console.log(this.movJugador1);
      for(let i = 0; i < this.movGanador.length; i++) {
        if(this.movGanador[i].every(x => this.movJugador1.includes(x))) {
          this.ganador = 'Player two wins';
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
    if(this.mov == 8 && this.ganador.length == 0) {
        this.ganador = 'Draw';
    }
    else if(this.ganador.length > 0) {
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
// End of file
/*{
    console.log(evento.srcElement.id);
    let idelemento=evento.srcElement.id
    document.getElementById(idelemento).setAttribute('disabled','true');*/

