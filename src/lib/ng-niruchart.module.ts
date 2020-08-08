import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { NgNiruchartComponent } from './ng-niruchart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from './material.module';
import { DynamicOverlay } from './services/overlay/dynamic-overlay.service';
import { DynamicOverlayContainer } from './services/overlay/dynamic-overlay-container.service';
import { NgNiruchartService } from './services/generic/ng-niruchart.service';
import { SideLeafComponent } from './components/sideleaf.component';


@NgModule({
  declarations: [NgNiruchartComponent, SideLeafComponent], 
  imports: [CommonModule, CustomMaterialModule, FlexLayoutModule],
  exports: [NgNiruchartComponent] ,
  providers: [DynamicOverlay, DynamicOverlayContainer, NgNiruchartService]
})
export class NgNiruchartModule { }
