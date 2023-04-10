import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicListenerScreenComponent } from "@app/music-listener-screen/music-listener-screen.component";
import { ProfileEditScreenComponent } from "@app/profile-edit-screen/profile-edit-screen.component";
import { ProfileHistoryScreenComponent } from "@app/profile-history-screen/profile-history-screen.component";
import { AuthenticationScreenComponent } from "@app/authentication-screen/authentication-screen.component";

const routes: Routes = [
  {
    path: 'music-listener',
    component: MusicListenerScreenComponent
  },
  {
    path: 'profile-edit',
    component: ProfileEditScreenComponent
  },
  {
    path: 'history',
    component: ProfileHistoryScreenComponent
  },
  {
    path: 'auth',
    component: AuthenticationScreenComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
