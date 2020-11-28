import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyGuardService } from './services/my-guard-service-service.service';

const appRouters: Routes = [ 
  { path: '', component: LoginComponent,  pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [MyGuardService]}  
];

@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
