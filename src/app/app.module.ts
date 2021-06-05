import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'; /*Ajax Requests*/
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { SystemUserComponent } from './components/user/systemUser/systemUser.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { GuardianGuard } from './service/guardian.guard';
import { NgxMaskModule, IConfig} from 'ngx-mask';

export const appRouters: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [GuardianGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'userList', component: SystemUserComponent, canActivate: [GuardianGuard]  },
  { path: 'userAdd', component: UserAddComponent, canActivate: [GuardianGuard] },
  { path: 'userAdd/:id', component: UserAddComponent, canActivate: [GuardianGuard] },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SystemUserComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
