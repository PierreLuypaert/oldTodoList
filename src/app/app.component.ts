import { Component } from '@angular/core';
import * as firebase from 'firebase'; 
import { modalTaskAddService } from './services/modalTaskAdd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private modalService : modalTaskAddService ) {
    const firebaseConfig = {
      apiKey: "AIzaSyCi92s6CMtBNyJ9Tz2369R8caaTeojyC8k",
      authDomain: "taskmanager-ff435.firebaseapp.com",
      databaseURL: "https://taskmanager-ff435.firebaseio.com",
      projectId: "taskmanager-ff435",
      storageBucket: "taskmanager-ff435.appspot.com",
      messagingSenderId: "557879735099",
      appId: "1:557879735099:web:080633d42eb7f1834b3d1e",
      measurementId: "G-WXHCZ2MZQ8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  openModal()
  {
      this.modalService.openModal("create");
  }

  
}
