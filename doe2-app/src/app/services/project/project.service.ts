import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectModel} from "../../models/project.model";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectChanged = new EventEmitter<ProjectModel>();
  projects: ProjectModel[];

  constructor(private httpClient: HttpClient) {
    this.projects = [];

    this.restGetProjects().subscribe(projects => {
      this.projects = projects;
      this.projectChanged.emit();
    }, error => {
      console.log(error.message);
    })
  }

  addProject(project: ProjectModel): ProjectModel {
    this.restPostProject(project).subscribe(response => {
      this.projects.push(response);
      project = response;
      this.projectChanged.emit();
    })

    return project;
  }

  updateProject(project: ProjectModel): ProjectModel {
    this.restPutProject(project).subscribe(response => {
      this.projects.push(response);
      project = response;
      this.projectChanged.emit();
    })

    return project;
  }


  findProjectById(id: string | null): ProjectModel{
    for (let i = 0; i < this.projects.length; i++){
      if (this.projects[i].projectId.toString() == id){
        this.projectChanged.emit();
        return this.projects[i];
      }
    }
    return null;
  }

  private restGetProjects(): Observable<ProjectModel[]> {
    return this.httpClient.get<ProjectModel[]>(`${environment.apiUrl}/projects`);
  }

  private restPostProject(project: ProjectModel): Observable<ProjectModel> {
    return this.httpClient.post<ProjectModel>(`${environment.apiUrl}/projects`, project);
  }

  private restPutProject(project: ProjectModel): Observable<ProjectModel> {
    const url = `${environment.apiUrl}/projects/` + project.projectId;
    return this.httpClient.put<ProjectModel>(url, project);
  }

  findAll(): ProjectModel[] {
    return this.projects;
  }

  private restDeleteProject(projectId: number) {
    const url = `${environment.apiUrl}/projects/` + projectId;
    return this.httpClient.delete(url);
  }
}
