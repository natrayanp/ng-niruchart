import { Injectable } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class DynamicOverlayContainer extends OverlayContainer{
  _containerElement: HTMLElement;
  public setContainerElement(containerElement: HTMLElement): void {
    this._containerElement = containerElement;
  }
}


