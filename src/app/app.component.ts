import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddChildAction, CreateNodeAction, NodeModel } from 'src/node.model';
import { Service } from 'src/services/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  isSubShowDialog = false;
  isSubShowSelectType = false;
  isShowDialog = false;
  isShowSelectType = false;
  addSubFolderSubscription: Subscription;

  nodeModel: NodeModel[] = [];

  constructor(private service: Service) {
    this.addSubFolderSubscription = this.service.modifySubFolderOb.subscribe(
      ({ event, child }) => {
        this.modifyChild(event, this.nodeModel, child);
        this.isShowDialog = false;
      }
    );

    if (localStorage.getItem('nodeModel')) {
      this.nodeModel = JSON.parse(localStorage.getItem('nodeModel') || '');
    }
  }

  modifyChild(event: CreateNodeAction, node: NodeModel[], child?: NodeModel) {
    const obj = {
      type: event?.selectedType,
      name: event?.value,
      id: Date.now().toString(),
      children: [],
    };
    if (event?.action === 'del') {
      node.forEach((each, index) => {
        if (each.id === child?.id && each.name === child?.name) {
          node.splice(index, 1);
        } else if (each.children) {
          this.modifyChild(event, each.children, child);
        }
      });
    } else {
      node.forEach((each) => {
        if (child?.name && obj.name) {
          const { name, id, children } = each;
          if (id === child?.id && name === child?.name) {
            each.hasOwnProperty('children')
              ? children?.push(obj)
              : (each.children = [obj]);
          } else if (children) {
            this.modifyChild(event, children, child);
          }
        } else {
          obj.name
            ? each.hasOwnProperty('children')
              ? each.children?.push(obj)
              : (each.children = [obj])
            : null;
        }
      });
    }
    this.nodeModel = node;
    localStorage.setItem('nodeModel', JSON.stringify(node));
  }

  addToRoot = () => {
    this.isShowDialog = true;
  };

  handleAddAction = (event: AddChildAction) => {
    this.modifyChild(
      { selectedType: null, action: event.action, value: null },
      this.nodeModel,
      event.child
    );
    this.isSubShowDialog = true;
    this.isSubShowSelectType = true;
  };

  handleCreateNodeAction = (event: CreateNodeAction) => {
    if (event?.value) {
      this.nodeModel.push({
        type: event.selectedType,
        name: event.value,
        id: Date.now().toString(),
        children: [],
      });
    }
    localStorage.setItem('nodeModel', JSON.stringify(this.nodeModel));
    this.isShowDialog = false;
  };

  async ngOnInit() {}
}
