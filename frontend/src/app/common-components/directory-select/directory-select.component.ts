import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SelectionModel} from "@angular/cdk/collections";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {ChecklistDatabase} from "./checklist-database";


export class MusicNode {
  item: string;
  path: string;
  children: MusicNode[];
}

export class MusicFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

export interface Playlist {
  name: string;
  items: Array<string>;
}

@Component({
  selector: 'app-directory-select',
  templateUrl: './directory-select.component.html',
  styleUrls: ['./directory-select.component.scss'],
  providers: [ChecklistDatabase]
})
export class DirectorySelectComponent {

  @Output() onDirectoriesRead = new EventEmitter<Playlist>()

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private dialogRef: MatDialogRef<DirectorySelectComponent>,
              private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );

    this.treeControl = new FlatTreeControl<MusicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.initialize(dialogData.dirs);
    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  flatNodeMap = new Map<MusicFlatNode, MusicNode>();
  nestedNodeMap = new Map<MusicNode, MusicFlatNode>();
  treeControl: FlatTreeControl<MusicFlatNode>;
  treeFlattener: MatTreeFlattener<MusicNode, MusicFlatNode>;
  dataSource: MatTreeFlatDataSource<MusicNode, MusicFlatNode>;
  checklistSelection = new SelectionModel<MusicFlatNode>(true);

  hasChild = (_: number, node: MusicFlatNode) => node.expandable;
  getLevel = (node: MusicFlatNode) => node.level;
  getChildren = (node: MusicNode): MusicNode[] => node.children;
  isExpandable = (node: MusicFlatNode) => node.expandable;


  transformer = (node: MusicNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new MusicFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  descendantsAllSelected(node: MusicFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
  }

  descendantsPartiallySelected(node: MusicFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  musicItemSelectionToggle(node: MusicFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  musicLeafItemSelectionToggle(node: MusicFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: MusicFlatNode): void {
    let parent: MusicFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: MusicFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: MusicFlatNode): MusicFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  cancel() {
    this.dialogRef.close();
  }

  accept() {
    const selectedDirectories = this.checklistSelection.selected;
    const musicNodes = selectedDirectories
      .map(flatNode => this.flatNodeMap.get(flatNode))
      .map(musicNode => musicNode.path);

    this.dialogRef.close(musicNodes);
  }

}
