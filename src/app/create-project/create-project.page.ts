import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
 
  project = {
    name:"",
    description:"",
    dueDate: "",
    owner: "",
    dateCreated:"",
    tasks: [],
    meetings: [],
    team:[],
    complete: false,
    percentComplete:0,


  }

  constructor(private router: Router,
    public projectService: ProjectService,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit() {
  }

  formatDate(date: string){
    var newDate = date.split("T")[0];
    var newerDate = newDate.split('-')
    var finalDate = newerDate[1] + "/" + newerDate[2] + "/" + newerDate[0];
    return finalDate;
  }
  
  createProject(){
    console.log("Creating Project for user: " + firebase.auth().currentUser.email );

    //Get Values From Form
    var name=this.project.name;
    var description=this.project.description;
    var dueDate = this.formatDate(this.project.dueDate);
    
    //Create Project
    this.projectService.createProject(name,description,dueDate)

    console.log("Project Created");
    this.router.navigate(["/home"])

  }

  goBack(){
    this.router.navigate(["/home"])
  }
}