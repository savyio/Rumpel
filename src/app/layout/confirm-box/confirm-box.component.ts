/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'rump-confirm-box',
  templateUrl: './confirm-box.component.html'
})
export class ConfirmBoxComponent implements OnInit {
  private destroy: Function;
  @Input() message = '';
  @Input() accept: () => void = () => {};
  @Input() reject: () => void = () => {};

  constructor() { }

  ngOnInit() {
  }

  closeModal(): void {
    this.destroy();
  }

}
