import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TakeAwayComponent } from './take-away/take-away.component';


const routes: Routes = [
  { path: 'minus', component: TakeAwayComponent },
  {
    path: '',
    redirectTo: 'minus',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
