import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/mainpage/navbar/navbar.component';
import {HomePageComponent} from './components/mainpage/home-page/home-page.component';
import {UserLoginComponent} from './components/user-login/user-login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserPasswordShowDirective } from './directives/user-password-show.directive';
import { StylepageComponent } from './components/stylepage/stylepage.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import {AppRoutingModule} from "./services/app-routing.module";
import {ProjectsComponent} from "./components/dashboard/projects/projects.component";
import {ProjectDetailsComponent} from "./components/dashboard/project-details/project-details.component";
import {ProjectChartsComponent} from "./components/dashboard/project-charts/project-charts.component";
import { GoogleChartsModule } from 'angular-google-charts';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {UserProfileEditComponent} from "./components/user-profile-edit/user-profile-edit.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProjectProfileComponent} from "./components/project-profile/project-profile.component";
import {OrganizationProfileComponent} from "./components/organization-profile/organization-profile.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import { CreateOrgComponent } from './components/create-org/create-org.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { EditOrganisationComponent } from './components/edit-organisation/edit-organisation.component';
import { UserListOrgComponent } from './components/user-list-org/user-list-org.component';
import { InvitesComponent } from './components/invites/invites.component';
import { OrgListComponent } from './components/org-list/org-list.component';
import {UserFilterPipe} from "../pipes/user-filter.pipe";
import {OrganisationFilterPipe} from "../pipes/organisation-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserPasswordShowDirective,
    StylepageComponent,
    TermsOfServiceComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    ProjectChartsComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    OrganizationProfileComponent,
    ProjectProfileComponent,
    UserListComponent,
    CreateOrgComponent,
    CreateProjectComponent,
    EditProjectComponent,
    EditOrganisationComponent,
    UserListOrgComponent,
    InvitesComponent,
    OrgListComponent,
    UserFilterPipe,
    OrganisationFilterPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GoogleChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
