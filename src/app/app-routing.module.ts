import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './pages/setup/setup.component';
import { TestComponent } from './pages/test/test.component';


const routes: Routes = [
  { path: 'setup', component: SetupComponent },
  { path: 'test', component: TestComponent },
  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
