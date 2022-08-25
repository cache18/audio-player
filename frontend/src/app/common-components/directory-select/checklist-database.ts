import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {MusicNode} from "./directory-select.component";

@Injectable()
export class ChecklistDatabase {

  dataChange = new BehaviorSubject<MusicNode[]>([]);

  get data(): MusicNode[] {
    return this.dataChange.value;
  }

  initialize(directories: Array<string>) {
    const data = this.create(directories);

    this.dataChange.next(data);
  }

  private create(dirs: Array<string>): Array<MusicNode> {
    let rootLevel = ChecklistDatabase.calculateLevel(dirs[0]);

    const rootNode: MusicNode = {
      item: ChecklistDatabase.formatName(dirs[0]),
      path: dirs[0],
      children: []
    };

    let checkLevel = rootLevel + 1;
    for(let i=1;i<dirs.length; i++) {
      let level = ChecklistDatabase.calculateLevel(dirs[i]);
      let itemToAdd = rootNode;
      while(level > checkLevel) {
        itemToAdd = itemToAdd.children[itemToAdd.children.length - 1];
        level--;
      }

      itemToAdd.children.push({
        item: ChecklistDatabase.formatName(dirs[i]),
        path: dirs[i],
        children: []
      });
    }

    return [rootNode];
  }

  private static formatName(name: string) {
    return name.substring(name.lastIndexOf("/") + 1);
  }

  private static calculateLevel(path: string) {
    let length = path.split("/").length;
    if(path.startsWith("/")) {
      length--;
    }
    if(path.endsWith("/")) {
      length--;
    }
    return length;
  }
}
