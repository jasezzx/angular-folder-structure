import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CONSTANTS } from 'src/constants';
import { CreateNodeAction, FolderType } from 'src/node.model';

@Component({
  selector: 'new-folder-dialog',
  templateUrl: './newFolderDialog.component.html',
  styleUrls: ['./newFolderDialog.component.scss'],
})
export class newFolderDialog {
  @Input() isSelectType: boolean | undefined;
  @Input() isInSubTree?: boolean;
  @Output() createNodeActionEvent = new EventEmitter<CreateNodeAction>();
  inputValue = new FormControl('');
  selectedType: FolderType = 'folder';
  folderIconUrl = this.constants.FOLDER_ICON_URL;
  fileIconUrl = this.constants.FILE_ICON_URL;

  constructor(public constants: CONSTANTS) {}

  selectAction(actionType: FolderType) {
    this.selectedType = actionType;
    this.isSelectType = !this.isSelectType;
  }

  createNodeAction(actionType: string) {
    if (this.inputValue.value || actionType === 'cancel') {
      const result: CreateNodeAction = {
        selectedType: this.selectedType,
        action: actionType,
        value: this.inputValue.value,
      };
      this.createNodeActionEvent.emit(result);
    } else {
      window.alert('Please put the name for the folder!');
    }
  }
}
