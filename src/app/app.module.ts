import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { appStates } from "./shared/redux/app.states";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MusicListenerScreenComponent } from "@app/music-listener-screen/music-listener-screen.component";
import { ProfileEditScreenComponent } from "@app/profile-edit-screen/profile-edit-screen.component";
import { ProfileHistoryScreenComponent } from "@app/profile-history-screen/profile-history-screen.component";
import { AuthenticationScreenComponent } from './authentication-screen/authentication-screen.component';
import { HttpClientModule } from "@angular/common/http";
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

@NgModule({
  declarations: [
    AppComponent,
    MusicListenerScreenComponent,
    ProfileEditScreenComponent,
    ProfileHistoryScreenComponent,
    AuthenticationScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxsModule.forRoot(appStates),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
