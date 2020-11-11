import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/ITask';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/internal/Subject';
import DataSnapshot = firebase.database.DataSnapshot;
import { ICalendarCase } from '../interfaces/ICalendarCase';

@Injectable()
export class TaskService {
	tasks: ITask[] = [];
	tasksSubject = new Subject<ITask[]>();

	
	model : ITask;
	constructor() {
		this.getTasks();
	}

	emitTasks() {
		
		this.tasksSubject.next(this.tasks);
	}

	initModel(today : Date)
	{
		this.model = {
			jourTask : today.getFullYear() + "-" + ( today.getMonth() +1 < 10 ? "0" + today.getMonth() +1 : today.getMonth() +1) + "-" +  ( today.getDate() < 10 ? "0" + today.getDate() : today.getDate() ),
			importanceLevel : 1,
			matiere : "",
			description : "",
			isDone : false
		  };	
	}

	init(jour : Date)
	{
		this.initModel(jour);

		return this.getTasks();
	}

	saveTasks()
	{
		firebase.database().ref('/tasks').set(this.tasks);
	}

	getTasks()
	{
		/*firebase.database().ref('/tasks')
		.on( 'value', (data) => {
			this.emitTasks( data.val() ? data.val() : [] );
		});
		
		return this.tasks;*/


			firebase.database().ref('/tasks').orderByValue()
			  .on('value', (data: DataSnapshot) => {
				  this.tasks = data.val() ? data.val() : [];
				  this.emitTasks();
				}
			  );
			

	}

	addTask(array : any[] )
	{
		if ( array['date'] == null)
		{
			var tomorrow = new Date();
			tomorrow.setDate( tomorrow.getDate() +1 );
			this.initModel(tomorrow);
		}
		else
			this.initModel(new Date( array['date'] ) );
		this.model.importanceLevel = array['importance'];
		this.model.matiere = array['matiere'];
		this.model.description = array['exo'];
		this.tasks.push(this.model);
		this.saveTasks();

	}

	update( oldValue : ITask, newValue : ITask)
	{
		if ( oldValue != newValue )
		{
			this.destroy(oldValue);
			this.tasks.push(newValue);
			this.saveTasks();

		}
	}

	updateDone( tache : ITask )
	{
		this.tasks.forEach( element => {
			if (element == tache )
			{
				if ( element.isDone ) element.importanceLevel = 50;
				else element.importanceLevel = -1;
				element.isDone = !element.isDone;
			}
		});
		
		this.saveTasks();
	}


	destroy(toDestroy : ITask)
	{
		const taskIndexToRemove = this.tasks.findIndex(
			(taskEl) => {
			  if(taskEl === toDestroy) {
				return true;
			  }
			}
		  );
		  this.tasks.splice(taskIndexToRemove, 1);
		  this.saveTasks();
		  this.emitTasks();
	}

	getColor( importanceLevel : any, isDone : boolean )
	{
		if (isDone )
			return "#FFFFFF";

		if (importanceLevel <20 )
		return "#70EF8B";
		else if ( importanceLevel < 40 )
		return "#E2EEA0";
		else if  ( importanceLevel < 60 )
		return "#ECC678";
		else if  ( importanceLevel < 80 )
		return "#EC8E60";
		else if  ( importanceLevel < 100 )
		return "#EC6060";
		else
		return "#867676";
		
	}

	

	
}