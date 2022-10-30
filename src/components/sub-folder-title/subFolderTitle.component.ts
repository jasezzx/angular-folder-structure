import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CONSTANTS } from 'src/constants';
import { AddChildAction, NodeModel } from 'src/node.model';
import { Service } from 'src/services/service';

@Component({
  selector: 'sub-folder-title',
  templateUrl: './subFolderTitle.component.html',
  styleUrls: ['./subFolderTitle.component.scss'],
})
export class subFolderTitleComponent {
  @Input() child: NodeModel | undefined;
  @Output() addActionEvent = new EventEmitter<AddChildAction>();

  folderIconUrl = this.constants.FOLDER_ICON_URL;
  fileIconUrl = this.constants.FILE_ICON_URL;

  constructor(public constants: CONSTANTS, private service: Service) {}

  CreateNodeAction({ action, child }: AddChildAction) {
    this.addActionEvent.emit({ action, child });
  }
}
