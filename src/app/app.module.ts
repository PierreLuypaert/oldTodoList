import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './services/task.service';
import { LoaderComponent } from './loader/loader.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { modalTaskAddService } from './services/modalTaskAdd.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    TaskComponent,
    LoaderComponent,
    TaskDialogComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    
  ],
  providers: [TaskService, modalTaskAddService],
  bootstrap: [AppComponent]
})
export class AppModule { }
