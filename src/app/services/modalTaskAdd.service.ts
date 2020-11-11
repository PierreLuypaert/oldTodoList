import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ITask } from '../interfaces/ITask';


@Injectable()
export class modalTaskAddService {

	private modalDialog : any;
	constructor(public matDialog: MatDialog) {
	}

	openModal(type : string, tache? : ITask ) {
		const dialogConfig = new MatDialogConfig();
		// The user can't close the dialog by clicking outside its body
		dialogConfig.disableClose = true;
		dialogConfig.id = "task-dialog-component";
		dialogConfig.height = "320px";
		dialogConfig.width = "600px";
		// https://material.angular.io/components/dialog/overview
		this.modalDialog = this.matDialog.open(TaskDialogComponent, dialogConfig);
		this.modalDialog.componentInstance.setType(type);
		console.log("éou1");

		if (tache != null) this.modalDialog.componentInstance.setTask( tache );
	}

	close()
	{
		this.modalDialog.close();
	}
	

	
}