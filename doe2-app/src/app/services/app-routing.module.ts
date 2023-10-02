import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "../components/mainpage/home-page/home-page.component";
import {TermsOfServiceComponent} from "../components/terms-of-service/terms-of-service.component";
import {NgModule} from "@angular/core";
import {UserRegisterComponent} from "../components/user-register/user-register.component";
import {UserLoginComponent} from "../components/user-login/user-login.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";
import {UserProfileEditComponent} from "../components/user-profile-edit/user-profile-edit.component";
import {ProjectsComponent} from "../components/dashboard/projects/projects.component";
import {ProjectChartsComponent} from "../components/dashboard/project-charts/project-charts.component";
import {UserListComponent} from "../components/user-list/user-list.component";
import {ProjectProfileComponent} from "../components/project-profile/project-profile.component";
import {OrganizationProfileComponent} from "../components/organization-profile/organization-profile.component";
import {CreateOrgComponent} from "../components/create-org/create-org.component";
import {CreateProjectComponent} from "../components/create-project/create-project.component";
import {EditOrganisationComponent} from "../components/edit-organisation/edit-organisation.component";
import {EditProjectComponent} from "../components/edit-project/edit-project.component";
import {UserListOrgComponent} from "../components/user-list-org/user-list-org.component";
import {InvitesComponent} from "../components/invites/invites.component";
import {OrgListComponent} from "../components/org-list/org-list.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'terms-of-services', component: TermsOfServiceComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'profile/:id', component: UserProfileComponent},
  {path: 'profile-edit/:id', component: UserProfileEditComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'edit-project/:id', component: EditProjectComponent},
  {path: 'create-project', component: CreateProjectComponent},
  {path: 'user-list/:id', component: UserListComponent},
  {path: 'user-list-org/:id', component: UserListOrgComponent},
  {path: 'project-profile/:id', component: ProjectProfileComponent},
  {path: 'project-charts', component: ProjectChartsComponent},
  {path: 'edit-organisation/:id', component: EditOrganisationComponent},
  {path: 'create-org', component: CreateOrgComponent},
  {path: 'organization-profile/:id', component: OrganizationProfileComponent},
  {path: 'invites', component: InvitesComponent},
  {path: 'org-list/:id', component: OrgListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
