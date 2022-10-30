export type FolderType = 'folder' | 'file' | 'unset' | null;

export class NodeModel {
  type?: FolderType;
  name?: string | null;
  children?: NodeModel[];
  id?: string;
}

export type CreateNodeAction = {
  selectedType: 'folder' | 'file' | 'unset' | null;
  action: string;
  value: string | null;
};

export type AddChildAction = {
  action: string;
  child: NodeModel | undefined;
};
