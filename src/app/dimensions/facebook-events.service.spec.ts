/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacebookEventsService } from './facebook-events.service';

describe('FacebookEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookEventsService]
    });
  });

  it('should ...', inject([FacebookEventsService], (service: FacebookEventsService) => {
    expect(service).toBeTruthy();
  }));
});
