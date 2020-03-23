import { Component, OnInit } from '@angular/core';

import {  Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import * as firebase from 'firebase';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
})
export class EditProjectPage implements OnInit {

  currentProject:any;
  edit_project_form:FormGroup;

  constructor(  	private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public projectService: ProjectService,
    public userService: UserService
   ) { 
               //Creates Form to update User
               this.edit_project_form = this.formBuilder.group({
                name: new FormControl("", Validators.required),
                description: new FormControl("", Validators.required),
                dueDate: new FormControl("", Validators.required),
                complete: new FormControl("", Validators.required)
              });
   }

  ngOnInit() {
    var self = this;
    console.log("Loading Project...");

    //Get Current Project
    this.route.params.subscribe(
      param => {
        this.currentProject = param;
        console.log(param);
      }
  )
            //Plug In existing values to form
            self.edit_project_form.patchValue({name:this.currentProject.name});
            self.edit_project_form.patchValue({description:this.currentProject.description});
            self.edit_project_form.patchValue({dueDate:this.currentProject.dueDate});
            self.edit_project_form.patchValue({complete:this.currentProject.complete});

            console.log("Project Loaded")
  }
 
  updateProject(value){
    //value = Updated Values
    var db = firebase.firestore();
    var self = this;
    var newValues;
    var projectId;
    var id = this.currentProject.id;

    //Update project
    db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {

      projectId = doc.id;

      newValues = {
        id: projectId,
        name: value.name,
        description: value.description,
        dueDate: value.dueDate,
        complete: value.complete,
      }
      //Update project in project service
      self.projectService.updateProject(newValues);
    })
  });
 
    this.goBack();
  }

  deleteProject(){
    console.log("Deleting project: " + this.currentProject.name);

    //Delete Project in project service
    this.projectService.deleteProject(this.currentProject.id);

    //Decrement Project Count in User Service
    this.userService.minusProject(firebase.auth().currentUser.uid);

    this.router.navigate(["home"]);
  }

  goBack(){
    this.router.navigate(["project-detail",this.currentProject])
  }
}
