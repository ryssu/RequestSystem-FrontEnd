import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { ViewDogInfoComponent } from './view-dog-info/view-dog-info.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SignupComponent } from './signup/signup.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserViewDogInfoComponent } from './user-view-dog-info/user-view-dog-info.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full' }, 
  {path: 'index', component: IndexComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'user-dashboard', component: UserDashboardComponent },
  {path: 'login', component: LoginComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'add-dog', component: AddDogComponent},
  {path: 'view-dog-info/:id', component: ViewDogInfoComponent},
  {path: 'user-view-dog-info/:id', component: UserViewDogInfoComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'request-form', component: RequestFormComponent},
  {path: 'create-account', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
