import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'delete-user',
    loadChildren: () => import('./delete-user/delete-user.module').then( m => m.DeleteUserPageModule)
  },
  {
    path: 'create-project',
    loadChildren: () => import('./create-project/create-project.module').then( m => m.CreateProjectPageModule)
  },
  {
    path: 'project-detail',
    loadChildren: () => import('./project-detail/project-detail.module').then( m => m.ProjectDetailPageModule)
  },
  {
    path: 'edit-project',
    loadChildren: () => import('./edit-project/edit-project.module').then( m => m.EditProjectPageModule)
  },
  {
    path: 'create-meeting',
    loadChildren: () => import('./create-meeting/create-meeting.module').then( m => m.CreateMeetingPageModule)
  },
  {
    path: 'create-member',
    loadChildren: () => import('./create-member/create-member.module').then( m => m.CreateMemberPageModule)
  },
  {
    path: 'create-task',
    loadChildren: () => import('./create-task/create-task.module').then( m => m.CreateTaskPageModule)
  },
  {
    path: 'tasks-details',
    loadChildren: () => import('./tasks-details/tasks-details.module').then( m => m.TasksDetailsPageModule)
  },
  {
    path: 'meetings-details',
    loadChildren: () => import('./meetings-details/meetings-details.module').then( m => m.MeetingsDetailsPageModule)
  },
  {
    path: 'member-details',
    loadChildren: () => import('./member-details/member-details.module').then( m => m.MemberDetailsPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },  {
    path: 'google-map',
    loadChildren: () => import('./google-map/google-map.module').then( m => m.GoogleMapPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
