import { NgModule } from "@angular/core";
import { HeaderComponent } from "@shared/components/header/header.component";
import { AsyncPipe, NgIf } from "@angular/common";
import { DropdownMenuComponent } from "@shared/components/dropdown-menu/dropdown-menu.component";
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [HeaderComponent, DropdownMenuComponent, ClickOutsideDirective],
  imports: [
    NgIf,
    AsyncPipe
  ],
  exports: [HeaderComponent],
})
export class SharedModule {

}
