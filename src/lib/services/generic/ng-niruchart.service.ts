import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgNiruchartService {
  mychartobj_serv :any;
  constructor() { }

  set_charobj(chartobj) {
    this.mychartobj_serv = chartobj;
  }

  get_charobj() {
    return this.mychartobj_serv;
  }

}
