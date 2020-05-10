import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';


import {PlatformModule} from '@angular/cdk/platform';
import {ObserversModule} from '@angular/cdk/observers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatSidenavModule,
    MatCardModule,
    MatExpansionModule,
    DragDropModule,
    PortalModule,
    ObserversModule,
    PlatformModule
  ]
})
export class CustomMaterialModule { }
