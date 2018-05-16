import { CheckinComponent } from './checkin/checkin.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { CreateEventComponent } from './create-event/create-event.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'create-event', component: CreateEventComponent },
    { path: 'event-info/:eid', component: EventInfoComponent },
    { path: 'register/:eid', component: RegisterComponent },
    { path: 'check-in/:eid', component: CheckinComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
