import { isDataSource } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { updateNamedExports } from 'typescript';
import { ITask } from '../interfaces/ITask';
import { modalTaskAddService } from '../services/modalTaskAdd.service';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  private type  : String;
  public  tache : ITask;
  model : ITask;
  jourTaskAct : String;
  @ViewChild('contactForm') contactForm: NgForm;

  constructor(private changeRef: ChangeDetectorRef, private dialogRef: MatDialogRef<TaskDialogComponent>, private taskService: TaskService, private modalService : modalTaskAddService) {dialogRef.disableClose = false; }

  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  ngOnInit(): void {
    
    var today = new Date();
    today.setDate( today.getDate()+1);
    this.model = {
			jourTask : today.getFullYear() + "-" + ( today.getMonth() +1 < 10 ? "0" + today.getMonth() +1 : today.getMonth() +1 ) + "-" +  ( today.getDate() < 10 ? "0" + today.getDate() : today.getDate() ),
			importanceLevel : 50,
			matiere : "",
			description : "",
			isDone : false
		  };
  }

  onSubmit(form: NgForm) {
    if (form.value['importance'] == "") form.value['importance'] = 50;
    var today = new Date();
    today.setDate( today.getDate()+1);
    if (form.value['date'] == "") form.value['date'] = today.getFullYear() + "-" + ( today.getMonth() +1 < 10 ? "0" + today.getMonth() +1 : today.getMonth() +1 ) + "-" +  ( today.getDate() < 10 ? "0" + today.getDate() : today.getDate() );/*:*today.toISOString().slice(0,10);*/
    if (this.type == "create")
    {
      
      this.taskService.addTask(form.value);
    }
    else
    {
      this.model.jourTask = this.contactForm.value['date'];
      this.model.importanceLevel = this.contactForm.value['importance'];
      this.model.matiere = this.contactForm.value['matiere'];
      this.model.description = this.contactForm.value['exo'];
      this.taskService.update(this.tache, this.model);
    }
    this.close();
  }

  setType( type : string )
  {
    this.type = type;
  }

  setTask(tache : ITask)
  {
    this.tache = tache;
    this.jourTaskAct = this.tache.jourTask;
  }

  getTypeTitle()
  { 
    switch(this.type)
    {
      case "create":
        return "Création";
      case "update":
        this.initModel();
        return "Modification";
      default:
        return;
    }
  }

  isCreate()
  {
    return this.type=="create";
  }

  initModel(date? : Date)
	{
		this.model = {
			jourTask : this.tache.jourTask,
			importanceLevel : this.tache.importanceLevel,
			matiere : this.tache.matiere,
			description : this.tache.description,
			isDone : this.tache.isDone
		  };	
  }

  changeState()
  {
    
    this.taskService.updateDone(this.tache);
    this.close();
  }

  destroyTask()
  {
    this.taskService.destroy(this.tache);
    this.close();
  }

  close()
  {
    this.modalService.close();
  }

  getSliderValue()
  {
    if (this.contactForm != undefined) return this.contactForm.value['importance'];
    else return 50;
  
  }

  getColor()
  {
    var isDoneTask : boolean;
    if (this.tache == undefined ) isDoneTask = false;
    else isDoneTask = this.tache.isDone;
    return this.taskService.getColor(this.getSliderValue(), isDoneTask);
  }


}
