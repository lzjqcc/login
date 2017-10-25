import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {rootRoute} from '@angular/router/src/router_module';
import {SuccessComponent} from "../success/success.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'success', component: SuccessComponent}
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    /*不加上这句在浏览器不认识app.component.html中<router-outlet></router-outlet>*/
    exports: [
      RouterModule
    ]
  }
)
export class RouteModule {

}