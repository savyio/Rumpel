/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarketSquareService } from './market-square.service';

describe('MarketSquareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketSquareService]
    });
  });

  it('should ...', inject([MarketSquareService], (service: MarketSquareService) => {
    expect(service).toBeTruthy();
  }));
});
