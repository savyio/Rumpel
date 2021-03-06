/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HatApiService } from '../services/hat-api.service';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { DialogService } from '../layout/dialog.service';
import { DialogBoxComponent } from '../layout/dialog-box/dialog-box.component';
import { UiStateService } from '../services/ui-state.service';
import { DataTable } from '../shared/interfaces/data-table.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import { MarketSquareService } from '../market-square/market-square.service';

@Injectable()
export class DataPlugService {
  private hostname: string = window.location.hostname;
  private protocol: string = window.location.protocol;
  private services: { [key: string]: { url: string; connected: boolean; }; };
  private _dataplugs$: ReplaySubject<any> = <ReplaySubject<any>>new ReplaySubject(1);

  constructor(private http: Http,
              private hatSvc: HatApiService,
              private marketSvc: MarketSquareService,
              private dialogSvc: DialogService,
              private uiSvc: UiStateService,
              private userSvc: UserService) {
    this.services = {
      'Facebook': {
        url: 'https://social-plug.hubofallthings.com/api/user/token/status',
        connected: false
      },
      'Twitter': {
        url: 'https://twitter-plug.hubofallthings.com/api/status',
        connected: false
      }
    };

    this.userSvc.user$
      .filter((user: User) => user.authenticated === true)
      .subscribe((user: User) => {
        this.getFacebookStatus();
        this.getTwitterStatus();
      });

    this.getDataPlugList();
  }

  get dataplugs$(): Observable<any> {
    return this._dataplugs$.asObservable();
  }

  status(plugName: string): boolean {
    return this.services[plugName].connected;
  }

  getTokenInfo(plugName: string): Observable<any> {
    return this.hatSvc.getApplicationToken(plugName, this.services[plugName].url)
      .flatMap(accessToken => {
        const url = this.services[plugName].url;
        const headers = new Headers();
        headers.append('X-Auth-Token', accessToken);
        headers.append('Content-Type', 'application/json');

        return this.http.get(url, { headers: headers, body: '' })
          .map(res => res.json());
      });
  }

  private getDataPlugList() {
    this.marketSvc.getDataPlugs().subscribe(plugs => {
      const displayPlugs = plugs.map(plug => {
        const displayPlug = {
          name: plug.name,
          description: plug.description,
          url: plug.url.replace('/dataplug', '/hat/authenticate'),
          icon: plug.name.toLowerCase() + '-plug'
        };

        if (plug.name === 'facebook' || plug.name === 'twitter') {
          displayPlug.icon += '.png';
        } else {
          displayPlug.icon += '.svg';
        }

        return displayPlug;
      }).sort((p1, p2) => p1.name > p2.name ? 1 : -1);

      this._dataplugs$.next(displayPlugs);
    });
  }

  private getFacebookStatus(): void {
    this.getTokenInfo('Facebook').subscribe(
      tokenInfo => {
        this.services['Facebook'].connected = tokenInfo.canPost;
        if (tokenInfo.canPost === false) {
          this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
            title: 'Reconnect your Facebook plug',
            message: `Every two months, you need to reset your Facebook plug – it's our way of checking that ` +
                     `you're still happy to pull this data into your HAT.`,
            cancelBtnText: 'No Thanks',
            buttons: [{
              title: 'Reconnect Facebook Plug',
              link: `${this.protocol}//${this.hostname}/#/hatlogin?` +
                    `name=Facebook&redirect=https://social-plug.hubofallthings.com/hat/authenticate/`
            }]
          });
        }
      },
      error => {
        this.services['Facebook'].connected = false;
        if (error.url.includes(window.location.hostname)) {
          console.warn('Retrieving application token for the Facebook plug is broken.');
        } else {
          this.uiSvc.tables$.subscribe((tables: DataTable[]) => {
            const tableFound = tables.find(table => table.name === 'posts' && table.source === 'facebook');

            if (tableFound) {
              this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
                title: 'Something went wrong',
                message: 'There is a problem with your Facebook plug. If the problem persists, we suggest ' +
                         'disconnecting and re-connecting the plug.',
                cancelBtnText: 'Dismiss',
                buttons: [{
                  title: 'Reconnect Facebook Plug',
                  link: `${this.protocol}//${this.hostname}/#/hatlogin?` +
                        `name=Facebook&redirect=https://social-plug.hubofallthings.com/hat/authenticate/`
                }]
              });
            }
          });
        }
      }
    );
  }

  private getTwitterStatus(): void {
    this.getTokenInfo('Twitter').subscribe(
      tokenInfo => {
        this.services['Twitter'].connected = true;
      },
      error => {
        this.services['Twitter'].connected = false;
        if (error.url.includes(window.location.hostname)) {
          console.warn('Retrieving application token for the Twitter plug is broken.');
        } else {
          this.uiSvc.tables$.subscribe((tables: DataTable[]) => {
            const tableFound = tables.find(table => table.name === 'tweets' && table.source === 'twitter');

            // If Twitter plug status endpoint gives HTTP error but table exists on the HAT => problem occurred
            // If the table hasn't been created => plug is not set up, all ok
            if (tableFound) {
              this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
                title: 'Something went wrong',
                message: 'There is a problem with your Twitter plug. If the problem persists, we suggest ' +
                         'disconnecting and re-connecting the plug.',
                cancelBtnText: 'Dismiss',
                buttons: [{
                  title: 'Reconnect Twitter Plug',
                  link: `${this.protocol}//${this.hostname}/#/hatlogin?` +
                        `name=Twitter&redirect=https://twitter-plug.hubofallthings.com/authenticate/hat/`
                }]
              });
            }
          });
        }
      }
    );
  }

}
