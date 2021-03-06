/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { UserService } from '../user.service';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public hatDomain: string;
  public error: string;
  private redirectPath: string;
  private navExtras: NavigationExtras;

  constructor(@Inject(APP_CONFIG) public config: IAppConfig,
              private route: ActivatedRoute,
              private router: Router,
              private storageSvc: BrowserStorageService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    const qps = this.route.snapshot.queryParams;

    if (qps['name'] && qps['redirect']) {
      this.navExtras = { queryParams: {
        name: qps['name'],
        redirect: qps['redirect']
      }};
    } else {
      this.navExtras = {};
    }

    if (qps['target']) {
      this.redirectPath = qps['target'];
    } else {
      this.redirectPath = 'dashboard';
    }

    // Redirect user to the dashboard if she is already authenticated
    if (this.userSvc.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  clearError() {
    this.error = '';
  }

  get username(): string {
    const host = window.location.hostname;
    return host.substring(0, host.indexOf('.'));
  }

  get protocol(): string {
    return window.location.protocol;
  }

  get hostname(): string {
    return window.location.hostname;
  }

  onSubmit(form) {
    this.storageSvc.rememberMe = form.value.rememberMe;
    this.userSvc.login(this.username, form.value.password).subscribe(
      (isAuthenticated: boolean) => {
        this.router.navigate([this.redirectPath], this.navExtras);
      },
      err => {
        console.log('Login failed! Reason: ', err);
        this.error = 'Incorrect password. Please try again.';
      });
    // window.location.href = `https://${this.hatDomain}/hatlogin?name=Rumpel&redirect=${this.redirectUrl}`;
  }

}
