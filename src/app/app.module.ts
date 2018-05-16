import { EventContractService } from './event-contract.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { CheckinComponent } from './checkin/checkin.component';

@NgModule({
    declarations: [
        AppComponent,
        CreateEventComponent,
        EventInfoComponent,
        RegisterComponent,
        LandingComponent,
        CheckinComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [EventContractService],
    bootstrap: [AppComponent]
})
export class AppModule { }
