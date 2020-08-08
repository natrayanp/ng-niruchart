import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter,ViewChild, ViewContainerRef, OnDestroy, TemplateRef,ElementRef } from '@angular/core';
//import { NiruChart } from 'niruchart';
//import { NiruChart } from '/home/nirudhi/Natrayan/Projects/ETL/niruchart/lib/niruchart';
import { NiruChart } from '/home/nirudhi/Natrayan/Projects/ETL/niruchart/src/niruchart';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import { DynamicOverlay } from './services/overlay/dynamic-overlay.service';
import { CdkDragStart, CdkDragMove, DragRef, CdkDrag, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { NgNiruchartService } from './services/generic/ng-niruchart.service';

export interface chart_input {
  chart_width: number;
  chart_height: number;
  leafmould_class: string[];
  leafmould: any;
  leafdata: any;
  chartsvgid: string;
  sidemneuwidth: number;
}

export interface event_callback_response {
  even: string;
  event_code: string;
  data: any;        
}

@Component({
  selector: 'ng-niruchart',
  templateUrl: './ng-niruchart.component.html',
  styleUrls: ['./ng-niruchart.component.scss']
})
export class NgNiruchartComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('tee') _dialogTemplate: TemplateRef<any>;
  @ViewChild("dragoverlay") divView: ElementRef;
  @ViewChild("canvasstart") divView1: ElementRef;
  @ViewChild("mysidemenu") divView2: ElementRef;
  
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;


  @Input() charconf: chart_input;
  @Output() chart_emit_event: EventEmitter<event_callback_response> = new EventEmitter<event_callback_response>();

  mychartobj: any;
  chartsvgid: string;
  events1: string[] = [];
  opened1: boolean = true;
  events2: string[] = [];
  opened2: boolean = true;
  myrt:any;
  

  constructor(private _overlay: Overlay, 
              private dynamicOverlay: DynamicOverlay, 
              private elRef: ElementRef, 
              private _viewContainerRef: ViewContainerRef,
              public genserv: NgNiruchartService
              ) { 

  }

  ngOnInit() {
    console.log(this.charconf);
    console.log("inside kdkd" + this.charconf.chartsvgid);
    this.chartsvgid = this.charconf.chartsvgid;
   /* this.mychartobj = new NiruChart( this.charconf.chart_width,
                                      this.charconf.chart_height,
                                      this.charconf.leafmould_class,
                                      this.charconf.leafmould,
                                      this.charconf.leafdata,
                                      this.charconf.chartsvgid,
                                      this.charconf.sidemneuwidth,                        
                                      this.call_back_method
                                    ); */
  }


  ngAfterViewInit() {
    console.log("**********nat*********");
    console.log(this.divView1);

    let itemloc = {
        "sidemenu": this.divView2.nativeElement,
        "drawarea": this.divView1.nativeElement
    };
    /*
    console.log(this.charconf.chartsvgid);                  
    
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);  
    
    this.dynamicOverlay.setContainerElement(this.divView.nativeElement);
    this._overlayRef = this.dynamicOverlay.create({
      positionStrategy: this.dynamicOverlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
  */
    
    /*
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    */
    //this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());  
    //Overlay to specific region instead of full screen
    ///https://medium.com/@manojvignesh/content-specific-progress-loading-indicator-using-cdk-overlay-207d14b603b5
    //https://stackoverflow.com/questions/44726428/multi-select-elements-with-angular-2-4
    //https://stackblitz.com/edit/angular-material-drag-copy-y3p7zz?file=app%2Fapp.component.html
    console.log("**********nat2*********");
    //console.log(this._overlayRef);   
    this.mychartobj = new NiruChart(  this.charconf.chart_width,
                                      this.charconf.chart_height,
                                      this.charconf.leafmould_class,
                                      this.charconf.leafmould,
                                      this.charconf.leafdata,
                                      this.charconf.chartsvgid,
                                      this.charconf.sidemneuwidth,
                                      itemloc,
                                      this.call_back_method
                                    );    
    this.genserv.set_charobj(this.mychartobj);
  }

  private call_back_method = (ev: event_callback_response) => {
    switch(ev.event_code) {
      case("menu-btn-clk"): {
        console.log("inside comp method");
        console.log(ev);
        this.chart_emit_event.emit(ev);
        break;
      }
    }
}

ngOnDestroy() {
  this._overlayRef.dispose();
}

dragStart(event) {
  console.log("dragstart");
  this.mychartobj.sidemenu_item_drag_start();
  /*  
  console.log(event);
  //console.log(event.source.element.nativeElement.getBoundingClientRect());
  console.log("555555555555555");
  console.log(event.source._dragRef._rootElement);
  this.myrt = event.source._dragRef._rootElement;
  console.log(new ElementRef(this.myrt));
  let element = event.source.getRootElement();
  let mes = this.getPosition(element);
  
  let ss =this.openDialog();
  console.log(event);
  console.log(event.source);
  console.log(event.source._dragRef);
  console.log(event.source._dragRef._rootElement);
  console.log("555555555555555");
  let dd = event.source._dragRef.getFreeDragPosition();
  console.log(dd);
  //console.log(event.source.element.getFreeDragPosition().y);
  event.source._dragRef.withRootElement(ss);
  event.source._dragRef.setFreeDragPosition({x:20, y:-217});
  console.log(event.source._dragRef.getFreeDragPosition())
  //withRootElement(ss);
  */
}

moved(event) {
  console.log("moved");
  console.log(event);
  //console.log(event.source._dragRef.getFreeDragPosition())
}

dragEnd(event: CdkDragStart) {
  console.log("dragEnd");
  console.log(event);
  event.source._dragRef.withRootElement(this.myrt);
  event.source.reset();
  this.closeDialog();  
}

openDialog() {
  console.log("inside open dialog");
  console.log(this._overlayRef);
  //this._overlayRef.attach(this._portal);
  this.showSelfOverlay();
  return <HTMLElement>this._overlayRef.overlayElement;
}

closeDialog() {
  console.log("mouseup");
  this._overlayRef.dispose();
  console.log(this._overlayRef);
}


showSelfOverlay() {
  console.log("showselfoverlay");

  this.dynamicOverlay.setContainerElement(this.divView.nativeElement);
  this._overlayRef = this.dynamicOverlay.create({
    positionStrategy: 
    this.dynamicOverlay.position()
    .flexibleConnectedTo(new ElementRef(this.myrt))    
    .withFlexibleDimensions(false)
    .withPositions([
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
    }
  ]),
    //this.dynamicOverlay.position().global().left('top'),
    //.centerHorizontally().centerVertically(),    
    hasBackdrop: true
  });
  
  console.log(this._overlayRef.getConfig());
  console.log("$$$$");
  
  /*
  this.dynamicOverlay.setContainerElement(this.divView.nativeElement);
  this._overlayRef = this.dynamicOverlay.create({
    positionStrategy: this.dynamicOverlay.position().global().left('top'),
    //.centerHorizontally().centerVertically(),
    hasBackdrop: true
  });  
*/
  /*
  console.log(this._overlayRef.overlayElement);
  let elrefs = new ElementRef(this._overlayRef.overlayElement);
  console.log(elrefs);
  */

  this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);  
  console.log(this._portal.templateRef.elementRef);
  const cref = this._overlayRef.attach(this._portal);
  console.log(cref);
  console.log(this._overlayRef.overlayElement);
  
}


onDragEnded(event) {
  

  
}

getPosition(el) {
  console.log("start getposition");
  let x = 0;
  let y = 0;
  let boundingClientRect = el.getBoundingClientRect();
  console.log(boundingClientRect);
  console.log(el.offsetLeft);
  console.log(el.offsetTop);
 
  while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  //let parentPosition = this.getPosition(el);
  //return { top: y, left: x };
  let parentPosition = { top: y, left: x };
  console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));
  console.log("end getposition");
  return { top: 24, left: 116 };
}


navopen(navid) {
  if(navid == "nav1") {
    this.opened1 = true;
  } else if (navid == "nav2") {
    this.opened2 = true;
  }
  console.log(this.divView1.nativeElement.getBoundingClientRect());
  console.log(this.divView2.nativeElement.getBoundingClientRect());
  
}

navclose(navid) {
  if(navid == "nav1") {
    this.opened1 = false;
  } else if (navid == "nav2") {
    this.opened2 = false;
  }
  console.log(this.divView1.nativeElement.getBoundingClientRect());
  console.log(this.divView2.nativeElement.getBoundingClientRect());
}

chk_empty(){
  if (this.mychartobj !==undefined) {
    return true;
  }
  return false;
}


}
