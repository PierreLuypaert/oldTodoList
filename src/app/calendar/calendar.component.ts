import { Component, destroyPlatform, OnInit } from '@angular/core';
import { ICalendarCase } from '../interfaces/ICalendarCase';
import { CommonModule } from "@angular/common";
import { TaskService } from '../services/task.service';
import { ITask } from '../interfaces/ITask';
import { Subscription } from 'rxjs';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public model: ICalendarCase;
  public moisActuel :  string;
  public dayActuel  :  string;
  public anneeActuel :  string;
  public jourActuel : Date;
  public currentWeek : Array<ICalendarCase>;
  public premierLundi : Date;
  public isLoading   : boolean;

  tasks: ITask[];
  tasksSubscription: Subscription;

  public mois: Array<ICalendarCase>;

  constructor(private taskService: TaskService) {
    this.initModel(null);
    this.currentWeek = new Array<ICalendarCase>();
    this.jourActuel = new Date();
    this.mois = new Array<ICalendarCase>();
    this.moisActuel = String(this.jourActuel.getMonth() + 1).padStart(2, '0'); //January is 0!
    this.premierLundi = new Date();
    this.dayActuel = String(this.jourActuel.getDate()).padStart(2, '0');
    this.anneeActuel = String(this.jourActuel.getFullYear());
    this.isLoading = true;

   }

  ngOnInit(): void {
    var cpt = 0;
    this.tasksSubscription = this.taskService.tasksSubject.subscribe(
      (tasks: ITask[]) => {
        this.tasks = tasks;
        this.tasks = this.tasks.sort((n1,n2)=> n2.importanceLevel - n1.importanceLevel);
        this.prepare();
        
        if (this.tasks.length != 0 ) this.isLoading = false;
      }
    );
    this.taskService.emitTasks();

    this.getCurrentWeek(true);
    console.log("current week");
    console.log( new Date() );


  }
  
  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
    console.log("DESTROY");

  }


  initModel(date : Date)
  {
    this.model = {
      jour: date,
      taskList : new Array<ITask>()
    };
  }

  getMoisActuelIntitule()
  {
    if (this.currentWeek!= null )
    {
      var moisAnnee = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
      this.anneeActuel = this.currentWeek[0].jour.getFullYear() + "" + (this.currentWeek[0].jour.getFullYear() != this.currentWeek[6].jour.getFullYear() ? " / " + this.currentWeek[6].jour.getFullYear() : "");
      return moisAnnee[this.currentWeek[0].jour.getMonth()] + (this.currentWeek[0].jour.getMonth() != this.currentWeek[6].jour.getMonth() ? " / " + moisAnnee[this.currentWeek[6].jour.getMonth()] : "");
    }
  }
  
  prepare()
  {
    this.currentWeek.forEach( jourSem => {
      jourSem.taskList = [];
      this.tasks.forEach( caseM =>
      { 
        var search = new Date();
        var aMettre = new Date(caseM.jourTask+"");
        search.setDate( aMettre.getDate() );
        search.setMonth( aMettre.getMonth()  );
        search.setFullYear( aMettre.getFullYear()  );
          if ( search.getDate() == jourSem.jour.getDate() && 
               search.getMonth() == jourSem.jour.getMonth() && 
               search.getFullYear() == jourSem.jour.getFullYear()  )
          {
            jourSem.taskList.push(caseM);
          }
            
      });
    });
    console.log(this.currentWeek);
    //this.currentWeek[3].taskList = this.taskService.init(this.currentWeek[3].jour);

    /*for ( let i = 0 ; i < 7 ; i++ )
    {
      this.taskService.init(this.currentWeek[i].jour).then(data => { this.currentWeek[3].taskList = data });
    }*/
  }
  

  getCurrentWeek(wantStart)
  {
    var result : Array<ICalendarCase> = new Array<ICalendarCase>();
    var dateSearch = new Date();
    for( let i = 1 ; i < 8 && wantStart; i++ )
    { 
      if(dateSearch.getDay() == 1 && dateSearch <= this.jourActuel)
      {
        this.premierLundi = dateSearch;
      }
      else
      {
        dateSearch.setDate( dateSearch.getDate() - 1);
      }
    };

    console.log("premier lundi");
    console.log( this.premierLundi );
  
    this.initModel(new Date(this.premierLundi));
    result.push(this.model);

    var premierLundiDate = new Date(this.premierLundi);
    for (var i = 0 ; i < 6 ; i++) {
      var newDate = new Date(premierLundiDate.setDate( premierLundiDate.getDate()+1));
      this.initModel( newDate );
      result.push( this.model );
    }
    this.currentWeek = result;
    this.prepare();
    
    
  }

  weekBack()
  {
    let lastLundi = this.currentWeek[0].jour;
    var cpt = 0;

    lastLundi.setDate( lastLundi.getDate() - 7);
    
    this.premierLundi.setDate( lastLundi.getDate() ); // A CHANGER ?
    this.premierLundi.setMonth( lastLundi.getMonth() );
    this.premierLundi.setFullYear( lastLundi.getFullYear() );
    this.getCurrentWeek(false);
    
  }

  weekNext()
  {
    /*for( var i = 0 ; i < 7 ; i++)
      this.currentWeek[i].jour.setDate( this.currentWeek[i].jour.getDate() + 7 );*/
    
    let Lundi = this.currentWeek[0].jour;
    Lundi.setDate( Lundi.getDate() + 7);
    
    this.premierLundi.setDate( Lundi.getDate() ); // A CHANGER ?
    this.premierLundi.setMonth( Lundi.getMonth() );
    this.premierLundi.setFullYear( Lundi.getFullYear() );
    this.getCurrentWeek(false);
  }

  

  isToday(aujourdhui : Date)
  {
    return (aujourdhui.getDate() == this.jourActuel.getDate() && aujourdhui.getMonth() == this.jourActuel.getMonth() && aujourdhui.getFullYear() == this.jourActuel.getFullYear());
  }

}
