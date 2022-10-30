import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CreateNodeAction,
  NodeModel,
  FolderType,
  AddChildAction,
} from 'src/node.model';
import { Service } from 'src/services/service';

@Component({
  selector: 'sub-folder',
  templateUrl: './subFolder.component.html',
  styleUrls: ['./subFolder.component.scss'],
})
export class SubFolderComponent {
  @Input() isSubShowDialog: boolean = false;
  @Input() isSubShowSelectType: boolean = false;
  @Input() parent: NodeModel = {};
  @Input() children: NodeModel[] | undefined = [];
  @Output() addChildActionEvent = new EventEmitter<string>();
  isShowDialog = false;
  isShowSelectType = false;
  child: NodeModel | undefined = {};

  constructor(private service: Service) {}

  handleAddChildAction = (event: AddChildAction) => {
    this.child = event.child;
    if (event.action === 'add') {
      this.isShowDialog = true;
      this.isShowSelectType = true;
    } else {
      this.service.modifySubFolder({
        event: { selectedType: null, action: event.action, value: null },
        child: this.child,
      });
    }
  };

  handleCreateNodeAction = (event: CreateNodeAction) => {
    this.addChildActionEvent.emit('test');
    this.service.modifySubFolder({
      event,
      child: this.child?.name ? this.child : this.parent,
    });

    this.isShowDialog = false;
    this.isSubShowDialog = false;
  };
}
