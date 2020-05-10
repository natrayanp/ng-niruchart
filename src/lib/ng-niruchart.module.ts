import { NgModule } from '@angular/core';
import { NgNiruchartComponent } from './ng-niruchart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from './material.module';


@NgModule({
  declarations: [NgNiruchartComponent],
  imports: [CustomMaterialModule, FlexLayoutModule],
  exports: [NgNiruchartComponent]
})
export class NgNiruchartModule { }
