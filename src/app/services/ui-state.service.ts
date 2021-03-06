/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs/Rx';
import { HatApiService } from './hat-api.service';
import { UserService } from '../user/user.service';
import {User} from '../user/user.interface';
import {DataTable} from '../shared/interfaces/data-table.interface';

@Injectable()
export class UiStateService {
  private state$: ReplaySubject<DataTable[]>;
  private _auth$: Subject<boolean> = <Subject<boolean>>new Subject();

  constructor(private hat: HatApiService, private userSvc: UserService) {
    this.state$ = <ReplaySubject<Array<DataTable>>>new ReplaySubject(1);

    this.userSvc.user$
      .filter((user: User) => user.authenticated === true)
      .flatMap((user: User) => this.hat.getTableList())
      .subscribe(
        rawDataTables => {
          const dataTables: Array<DataTable> = rawDataTables.map(table => {
            return {
              name: table.name,
              source: table.source,
              id: table.id
            };
          });

          this.state$.next(dataTables);
        },
        error => console.log(error)
      );

    this.userSvc.user$
      .filter((user: User) => user.authenticated === false)
      .subscribe((user: User) => this._auth$.next(user.authenticated));
  }

  get tables$(): Observable<DataTable[]> {
    return this.state$.asObservable();
  }

  get auth$(): Observable<boolean> {
    return this._auth$.asObservable();
  }

}
