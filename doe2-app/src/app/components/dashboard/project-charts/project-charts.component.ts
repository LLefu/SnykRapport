import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {of} from "rxjs";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-project-charts',
  templateUrl: './project-charts.component.html',
  styleUrls: ['./project-charts.component.css']
})
export class ProjectChartsComponent implements OnInit {
  form: FormGroup;
  projects: any[] = [];
  coreNumber: number = 0;
  arrayNumber: number = 0;
  projectsArray = [1,2,3,4,5];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      projects: ['']
    });

    of(this.getProjects()).subscribe(projects => {
      this.projects = projects;
      this.projects = this.getProjects();
      this.form.controls.orders.patchValue(this.getProjects()[0].id);
    });
  }

  ngOnInit(): void {
  }
  //hardcoded for now
  getProjects() {
    return [
      { id: '1', name: 'project Espresso' },
      { id: '2', name: 'project Raspberry' },
      { id: '3', name: 'project Parfait' },
      { id: '4', name: 'project Red velvet' },
      { id: '4', name: 'project Custard' }
    ];
  }

  getProjectsByIndex(index: number){
    return this.projectsArray[index];
  }

  selectingCore(coreNumber: number) {
    if (this.coreNumber == coreNumber){
      this.coreNumber = 0;
    }
    else this.coreNumber = coreNumber;
  }

  title = 'Amount of management roles within the project originating from organizations';
  title1 = 'Amount of people within the project originating from organizations';
  title2 = 'Amount of people joining the project over time';
  title3 = 'Amount of data engineers within the project originating from organizations';
  title4 = 'Amount of marketing strategists within the project originating from organizations';
  title5 = 'Amount of executives within the project originating from organizations';
  title6 = 'Amount of producers within the project originating from organizations';
  title7 = 'Amount of people leaving the project over time';
  title8 = 'Amount of project leaders within the project originating from organizations';
  type1: any[] = ['PieChart','BarChart','AreaChart','ScatterChart'];
  type = 'PieChart' as any;
  data = [
    ['Apple', 45.0],
    ['Amazon', 26.8],
    ['Google', 12.8],
    ['Lego', 8.5],
    ['Coca-cola', 6.2],
    ['Burger King', 0.7]
  ];
  data1 = [
    ['2015', 5.0],
    ['2016', 6.8],
    ['2017', 12.8],
    ['2018', 38.5],
    ['2019', 26.2],
    ['2020', 10.7]
  ];
  data2 = [
    ['2015', 45.0],
    ['2016', 26.8],
    ['2017', 12.8],
    ['2018', 8.5],
    ['2019', 6.2],
    ['2020', 0.7]
  ];
  column = ['organization', 'People'] as any;
  options = {
  };
  width = 400;
  height = 250;

}
