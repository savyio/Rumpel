import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SideMenuComponent } from './side-menu/index';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel.component.html',
  styleUrls: ['rumpel.component.css'],
  directives: [HeaderComponent, FooterComponent, SideMenuComponent, ROUTER_DIRECTIVES]
})
export class RumpelAppComponent implements OnInit {
  title = 'rumpel2 works!';

  ngOnInit() {
    console.log("Rumpel is running. Version: 0.0.1");
  }
}
