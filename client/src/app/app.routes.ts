import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import {ProjectComponent} from "./shared/components/project/project.component";
import {SubmissionComponent} from "./submission/submission.component";
import {ProjectsComponent} from "./projects/projects.component";
import {LoginComponent} from "./login/login.component";
import {ConsentComponent} from "./submission/consent/consent.component";

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },

  { path: 'submissions/consent', component: ConsentComponent },
  { path: 'submissions/list', component: HomeComponent },
  { path: 'submissions/new/:tab', component: SubmissionComponent },
  { path: 'submissions/detail/:id/:tab', component: SubmissionComponent },

  { path: 'projects/detail/:projectid/submissions/:tab', component: SubmissionComponent },

  { path: 'projects/list', component: ProjectsComponent },

  { path: 'projects/new', component: ProjectComponent },
  { path: 'projects/detail/:id', component: ProjectComponent },

  { path: 'home', component: HomeComponent },

  { path: '**', redirectTo: '' }
];
