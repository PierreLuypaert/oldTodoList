import { Component, Input, OnInit } from '@angular/core';
import { ICalendarCase } from '../interfaces/ICalendarCase';
import { modalTaskAddService } from '../services/modalTaskAdd.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() List1 : Array<ICalendarCase>;
  @Input() jour  : Date;

  @Input() index : number;



  constructor(private modalService : modalTaskAddService, private taskService : TaskService  ) { }

  ngOnInit(): void {
  }

  openModal( index : number)
  {
    this.modalService.openModal("update", this.List1[this.index].taskList[index]);
  }

  getColor( importanceLevel : any, isDone : boolean )
  {
    return this.taskService.getColor( importanceLevel, isDone );
  }

}
