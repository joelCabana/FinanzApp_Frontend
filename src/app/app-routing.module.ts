import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPanelComponent } from './components/account/account-panel/account-panel.component';
import { CreateComponent } from './components/account/create/create.component';
import { LoginComponent } from './components/account/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createAccount', component: CreateComponent },
  { path: 'accountPanel', component: AccountPanelComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
