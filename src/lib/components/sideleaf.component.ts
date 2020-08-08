
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter,ViewChild, ViewContainerRef, OnDestroy, TemplateRef,ElementRef } from '@angular/core';
import { NgNiruchartService } from '../services/generic/ng-niruchart.service';

@Component({
    selector: 'sideleaf',
    templateUrl: './sideleaf.component.html',
    styleUrls: ['./sideleaf.component.scss']
  })
  export class SideLeafComponent implements AfterViewInit {
    
    leafmoulds: any;    

    constructor(private genserv: NgNiruchartService, private elRef:ElementRef) { }

    ngOnInit() {
      this.leafmoulds = this.genserv.get_charobj().leafmould;
    }

    ngAfterViewInit() {
        console.log("inside sideleaf");
        console.log(this.genserv.get_charobj());
        let co = this.genserv.get_charobj();
        let cc = co.leafmould[0];    
        //this.myid = "sleaf_" + cc.dispname;
        //console.log(this.myid);              
        this.draw();
        
    }

    draw() {
      console.log("insidedraw");
        let co = this.genserv.get_charobj();
        let cc = co.leafmould[0];        
        cc = cc.moduledet;
        console.log(cc);
        //co.chartsidemenu.add_menu_leaf(cc[0]);
        
        co.leafmould.forEach((cc: any) => {
          cc.moduledet.forEach((cce: any) => {
            co.chartsidemenu.add_menu_leaf(cce);
            console.log("test elfr");
            console.log(this.elRef.nativeElement.querySelector('#divsleaf_'+cce.dispname));
          })
        });
        
        
    }

    dragStart(event) {      
        console.log("dragstart");
        console.log(event);
        event.source._dragRef.reset;
        let mychartobj = this.genserv.get_charobj();
        console.log(event.source.element.nativeElement.id);
        let myString = event.source.element.nativeElement.id;
        myString = myString.substring(myString.indexOf('_')+1);
        console.log(myString);
        mychartobj.sidemenu_item_drag_start(myString);
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
      
      dragEnd(event) {
        console.log("dragEnd");
        console.log(event);
       // event.source._dragRef.withRootElement(this.myrt);
     //   event.source.reset();
      //  this.closeDialog();  
      }

  }
  