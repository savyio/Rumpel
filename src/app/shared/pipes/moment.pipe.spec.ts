/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MomentPipe } from './moment.pipe';

describe('MomentPipe', () => {
  it('create an instance', () => {
    const pipe = new MomentPipe();
    expect(pipe).toBeTruthy();
  });
});
