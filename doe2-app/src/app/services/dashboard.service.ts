import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from 'rxjs';
import {shareReplay, map} from "rxjs/operators";
import {ProjectModel} from "../models/project.model";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'any'})
export class DashboardService {
  startedEditing = new Subject<number>();

  constructor(private http: HttpClient) {}

  async asyncFindAll(): Promise<ProjectModel[]> {
    let responseFindAll: Observable<ProjectModel[]>;

    responseFindAll = this.http.get<ProjectModel[]>(`${environment.apiUrl}/test/projects`).pipe(shareReplay(1));

    responseFindAll.subscribe((projects) => {console.log(projects)}, error => console.log(error));

    return responseFindAll.toPromise();
  }

  async asyncFindById(id: number): Promise<ProjectModel> {
    let responseGetById: Observable<ProjectModel>;

    responseGetById = this.http.get<ProjectModel>(`${environment.apiUrl}/test/projects` +
      `/${id}`).pipe(shareReplay(1));

    responseGetById.subscribe((projects) => {}, error => console.log(error));

    return responseGetById.toPromise();
  }

  // async asyncSave(scooter: ProjectModel): Promise<ProjectModel> {
  //   let response0: Observable<ProjectModel>;
  //
  //   if (scooter.id == 0) {
  //     response0 =
  //       this.http.post<ProjectModel>('http://localhost:8080/test/projects', scooter).pipe(shareReplay(1))
  //   } else {
  //     response0 = this.http.put<ProjectModel>('http://localhost:8080/test/projects' +
  //       `/${scooter.id}`, scooter).pipe(shareReplay(1))
  //   }
  //
  //   response0.subscribe((scooters) => {console.log(scooters)}, error => console.log(error));
  //
  //   const savedScooter = Scooter.copyConstructor(await response0.toPromise());
  //   console.log("Scooter-RestAdaptorWithHttp.asyncSave result: ", savedScooter);
  //
  //   return savedScooter
  // }

  // async asyncDeleteById(id: number): Promise<void> {
  //   let responseDeleteById: Observable<ProjectModel>;
  //
  //   responseDeleteById = this.http.delete<ProjectModel>('http://localhost:8080/test/projects' +
  //     `/${id}`).pipe(shareReplay(1));
  //
  //   responseDeleteById.subscribe((scooters) => {console.log(scooters)}, error => console.log(error));
  //
  // }
}
