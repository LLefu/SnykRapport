import { Component, OnInit } from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import {ProjectService} from "../../services/project/project.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectUserService} from "../../services/project/project-user.service";
import {ProjectUser} from "../../models/project-user.model";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  projectId!: number;
  oldProject !: ProjectModel;
  oldName: string = "oldName"
  oldDesc: string = "oldDesc"
  projectUser !: ProjectUser;

  constructor( private projectService: ProjectService,
               private projectUserService: ProjectUserService,
               private router: Router,
               private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectId = +params['id'];
        this.oldProject = this.projectService.findProjectById(this.projectId.toString());
        this.oldName = this.oldProject.projectName;
        this.oldDesc = this.oldProject.description;
      }
    );

    this.projectService.projectChanged.subscribe(
      () => {
        this.oldProject = this.projectService.findProjectById(this.projectId.toString())
        this.oldName = this.oldProject.projectName;
        this.oldDesc = this.oldProject.description;
      }
    )
  }

  submit(){
    this.oldProject.projectName = ((<HTMLInputElement>document.getElementById("name")).value)
    this.oldProject.description = ((<HTMLInputElement>document.getElementById("description")).value)
    this.projectService.updateProject(this.oldProject);
    this.router.navigate(['/project-profile', this.projectId]);
    for (let i = 0; i < this.projectUserService.findAll().length; i++) {
      if (this.projectUserService.findAll()[i].project.projectId == this.oldProject.projectId){
        this.projectUser = this.projectUserService.findAll()[i];
        this.projectUser.project = this.oldProject;
        this.projectUserService.update(this.projectUser);
      }
    }
  }


}
