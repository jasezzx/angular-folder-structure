import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddChildAction, CreateNodeAction, NodeModel } from 'src/node.model';

@Injectable()
export class Service {
  private modifySubFolderSubject = new BehaviorSubject<any>([]);
  public modifySubFolderOb = this.modifySubFolderSubject.asObservable();

  modifySubFolder(obj: object) {
    this.modifySubFolderSubject.next(obj);
  }
}
