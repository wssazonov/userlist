import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-list/user-add/user-add.component';


const routes: Routes = [
  {
    path: '', component: UserListComponent,
    data: {
      meta: {
        title: 'Users list',
        description: 'Users list page'
      }
    }
  },
  {
    path: 'add', component: UserAddComponent,
    data: {
      head: 'Users',
      breadcrumb: 'Add user',
      meta: {
        title: 'Add user',
        description: 'Add user page'
      }
    }
  },
  {
    path: 'edit/:userId', component: UserAddComponent,
    data: {
      head: 'Users',
      breadcrumb: 'Update user',
      meta: {
        title: 'Update user',
        description: 'Update user page'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
