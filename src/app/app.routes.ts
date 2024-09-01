import { Routes } from '@angular/router';
  
import { IndexComponent } from './veiculo/index/index.component';
import { CreateComponent } from './veiculo/create/create.component';
import { EditComponent } from './veiculo/edit/edit.component';
  
export const routes: Routes = [
      { path: '', redirectTo: 'veiculo/index', pathMatch: 'full'},
      { path: 'veiculo/index', component: IndexComponent },
      { path: 'veiculo/create', component: CreateComponent },
      { path: 'veiculo/:postId/edit', component: EditComponent } 
  ];