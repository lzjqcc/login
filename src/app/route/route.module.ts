import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {rootRoute} from '@angular/router/src/router_module';
import {SuccessComponent} from "../success/success.component";
import {ArticleComponent} from "../aritle/article.component";
import {MarkdownEditorComponent} from "../md-editor/md-editor.component";
import {TestCompontent} from "../test/test.compontent";
import {ShowarticleComponent} from "../showarticle/showarticle.component";
import {UserdetailsComponent} from '../userdetails/userdetails.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'article', component: ArticleComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'md', component: MarkdownEditorComponent},
  {path: 'test', component: TestCompontent},
  {path: 'showarticle/:id', component: ShowarticleComponent},
  {path: 'showuser', component: UserdetailsComponent}
];

@NgModule({
    imports: [
      /*如果是在特性模块中使用forChild,在根模块中使用forRoot*/
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
