/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/index';
import { ExternalNotification } from '../../shared/interfaces/index';
import { NotificationsService } from '../notifications.service';
import { User } from '../../user/user.interface';

@Component({
  selector: 'rump-notification-centre',
  templateUrl: './notification-centre.component.html',
  styleUrls: ['./notification-centre.component.scss']
})
export class NotificationCentreComponent implements OnInit {
  public notification: ExternalNotification;
  public totalNotifications: number;

  constructor(private userSvc: UserService,
              private _notificationsSvc: NotificationsService) { }

  ngOnInit() {
    this.totalNotifications = 0;

    this._notificationsSvc.notification$.subscribe(notification => {
      this.notification = notification;
    });

    this._notificationsSvc.stats$.subscribe(stats => {
      this.totalNotifications = stats.total;
    });

    this.userSvc.user$
      .filter((user: User) => user.authenticated === true)
      .subscribe((user: User) => this._notificationsSvc.getAllNotifications());
  }

  nextNote() {
    this._notificationsSvc.nextNotification();
  }

  previousNote() {
    this._notificationsSvc.previousNotification();
  }

  markAsRead() {
    this._notificationsSvc.markAsRead(this.notification);
  }
}
