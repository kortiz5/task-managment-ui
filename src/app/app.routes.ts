import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { AuthGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {   
        path: '',
        component: TaskListComponent,
        title: 'Task Management App',
        canActivate: [AuthGuard],
    },
    {
        path: 'task-form/:id',
        component: TaskFormComponent,
        title: 'Task Management form',
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }

];
