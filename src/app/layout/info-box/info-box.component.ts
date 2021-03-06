/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rump-info-box',
  templateUrl: './info-box.component.html'
})
export class InfoBoxComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  private destroy: Function;

  constructor() { }

  ngOnInit() {
  }

  closeModal(): void {
    this.destroy();
  }
}
