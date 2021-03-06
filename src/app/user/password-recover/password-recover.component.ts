/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'rump-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.scss']
})
export class PasswordRecoverComponent implements OnInit {
  public errorMessage: string;
  public successMessage: string;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: any): void {
    this.userSvc.recoverPassword(form.value.recoveryEmail)
      .subscribe(
        (res: any) => {
          this.successMessage = 'If the email address you have entered is correct, you will shortly receive an email'
                              + ' with your password reset instructions.';
        },
        error => {
          console.warn('Failed to recover password. Reason: ', error);
          this.errorMessage = 'ERROR: Failed to submit password recovery request.';
        }
      );
  }

  clearErrors() {
    this.errorMessage = null;
    this.successMessage = null;
  }

}
