/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import { EventsService } from '../events.service';
import {FacebookEventsService} from '../facebook-events.service';
import {GoogleEventsService} from '../google-events.service';

import { Event } from '../../shared/interfaces';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'rump-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private sub: Subscription;
  private events: any;
  private header: any;
  private viewChoices: string;
  private defaultView: string;
  private defaultDate: string;
  private firstDay: number;
  private height: string;

  constructor(private eventsSvc: EventsService,
              private facebookEventsSvc: FacebookEventsService,
              private googleEventsSvc: GoogleEventsService) {}

  ngOnInit() {
    this.viewChoices = 'month,agendaWeek,agendaDay';
    this.defaultView = 'agendaWeek';
    this.defaultDate = moment().format('YYYY-MM-DD');
    this.firstDay = 1;
    this.height = '70em';
    this.events = [];
    this.header = {
      left: 'prev,next,today',
      center: 'title',
      right: this.viewChoices
    };

    $('#calendar').fullCalendar('destroy');

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: this.viewChoices
      },
      defaultDate: this.defaultDate,
      defaultView: this.defaultView,
      firstDay: this.firstDay,
      editable: false,
      selectable: true,
      events: this.events,
      height: this.height
    });

    this.sub =
      Observable.merge(
        this.eventsSvc.data$,
        this.facebookEventsSvc.data$,
        this.googleEventsSvc.data$
      ).subscribe((events: Array<Event>)  => {
        this.events = this.events.concat(events.map(dp => {
          return {
            id: dp.id,
            title: dp.title,
            start: dp.start.format(),
            end: !!dp.end ? dp.end.format() : null,
            allDay: dp.allDay,
            url: dp.link
          };
        }));

        this.updateCalendar();
      });

  }

  private updateCalendar() {
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', this.events);
  }

}
