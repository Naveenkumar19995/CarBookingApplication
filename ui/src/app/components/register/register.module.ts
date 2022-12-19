import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';


import {RegisterRoutingModule} from './register-routing.module';
import { AboutComponent } from '../about/about.component';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent,
   AboutComponent
  ],
  imports: [
    BrowserModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
