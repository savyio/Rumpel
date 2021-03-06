/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicProfileComponent } from './public-profile/public-profile.component';
import { PublicNotablesComponent } from './public-notables/public-notables.component';
import { NativeGuard } from '../native-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'public/profile', component: PublicProfileComponent, canActivate: [NativeGuard] },
      { path: 'public/notables', component: PublicNotablesComponent, canActivate: [NativeGuard] }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PublicPageRoutingModule {}
