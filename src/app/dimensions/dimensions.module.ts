import { NgModule } from '@angular/core';

import { routing } from './dimensions.routing';
import { SharedModule } from '../shared/shared.module';

import { CalendarComponent } from './calendar/calendar.component';
import { TileCalendarComponent } from './tile-calendar/tile-calendar.component';

import { EventsService } from './events.service';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [ CalendarComponent, TileCalendarComponent ],
    providers: [ EventsService ],
    exports: [ TileCalendarComponent ]
})
export class DimensionsModule {}