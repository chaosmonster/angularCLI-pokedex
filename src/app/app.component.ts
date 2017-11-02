import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
     <router-outlet></router-outlet>
   `
})

export class AppComponent {
  // title wird nicht genutzt und kann gelöscht werden
  title = 'Pokedex';
}