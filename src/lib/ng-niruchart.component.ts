import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter,ViewChild, ViewContainerRef, OnDestroy, TemplateRef } from '@angular/core';
//import { NiruChart } from 'niruchart';
//import { NiruChart } from '/home/nirudhi/Natrayan/Projects/ETL/niruchart/lib/niruchart';
import { NiruChart } from '/home/nirudhi/Natrayan/Projects/ETL/niruchart/src/niruchart';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

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
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;


  @Input() charconf: chart_input;
  @Output() chart_emit_event: EventEmitter<event_callback_response> = new EventEmitter<event_callback_response>();

  mychartobj: any;
  chartsvgid: string;
  events1: string[] = [];
  opened1: boolean;
  events2: string[] = [];
  opened2: boolean;

  constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) { 

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
    console.log(this.charconf.chartsvgid);
    console.log("**********nat1*********");                
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());  
    //Overlay to specific region instead of full screen
    ///https://medium.com/@manojvignesh/content-specific-progress-loading-indicator-using-cdk-overlay-207d14b603b5
    console.log("**********nat2*********");
    console.log(this._overlayRef);   
    this.mychartobj = new NiruChart( this.charconf.chart_width,
                                      this.charconf.chart_height,
                                      this.charconf.leafmould_class,
                                      this.charconf.leafmould,
                                      this.charconf.leafdata,
                                      this.charconf.chartsvgid,
                                      this.charconf.sidemneuwidth,                        
                                      this.call_back_method
                                    );    
        
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

openDialog() {
  console.log("inside open dialog");
  console.log(this._overlayRef);
  this._overlayRef.attach(this._portal);
}

}
