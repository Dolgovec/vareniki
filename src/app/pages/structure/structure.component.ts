import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {UsersService} from "../../services/users.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditStructureComponent, UnitType} from "./edit-structure/edit-structure.component";
import {filter, take} from "rxjs";

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {
  dataSource = new MatTreeNestedDataSource<OrgNode>();
  treeControl = new NestedTreeControl<OrgNode>(node => {
    let nestedTree: OrgNode[] = [];
    if (node.children) {
      nestedTree = [...nestedTree, ...node.children]
    }

    if (node.positions) {
      nestedTree = [...nestedTree, ...node.positions]
    }

    return nestedTree;
  });
  @ViewChild('organisationTree') tree: any;

  nodesFullTitles: Array<string> = [];
  showEmployees: boolean = false;

  constructor(private userService: UsersService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getDepartment().subscribe((resp: Array<Unit>) => {
      resp?.forEach((unit) => {
        // console.log('DEBUG resp.forEach - ', unit);
        (unit as OrgNode).incompleteUnit = checkIncomplete(unit);
      });

      this.dataSource.data = resp;
      this.dataSource.data.forEach((unit) => {
        this.nodesFullTitles = [...this.nodesFullTitles, unit.title, ...getFullTitlesForNode(unit, '')];
      });

      // CRUTCH
      setTimeout(() => {
        this.tree.treeControl.dataNodes = resp;
      })
    });
  }

  toggleEmployees(val: boolean) {
    this.showEmployees = val;
  }

  createUnit() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(EditStructureComponent,
      {
        width: '450px',
        data: {
          nodesFullTitles: this.nodesFullTitles,
          selectedUnitType: UnitType.DEPARTMENT
        }
      }
    );

    dialogRef.afterClosed().pipe(take(1), filter((val) => !!val)).subscribe((val) => {
      console.log('DEBUG dialogRef.afterClosed: ', val);
      this.dataSource.data.push({
        title: val.title,
        isDepartment: true
      })
      this.renderTree();
    });
  }

  addSubUnit(node: OrgNode) {
    // TODO: change
    let selectedUnitType: UnitType | undefined;
    if (node.positions && node.positions.length > 0) {
      selectedUnitType = UnitType.POSITION;
    } else if (node.children && node.children.length > 0) {
      selectedUnitType = UnitType.DEPARTMENT;
    }

    const dialogRef: MatDialogRef<any> = this.dialog.open(EditStructureComponent,
      {
        width: '450px',
        data: {
          nodesFullTitles: this.nodesFullTitles,
          selectedNode: node.fullTitle,
          selectedUnitType
        }
      }
    );

    dialogRef.afterClosed().pipe(take(1), filter((val) => !!val)).subscribe((val) => {
      const path: Array<string> = node.fullTitle ? node.fullTitle.split(' - ') : [];
      let currentNode: OrgNode | null;
      let currentChildren: Array<OrgNode> = this.dataSource.data;
      path.forEach((seg: string) => {
        const nodeIndex: number = getNodeIndexByTitle(seg, currentChildren);
        currentNode = nodeIndex > -1 ? currentChildren[nodeIndex] : null;
        if (currentNode === node) {
          if (val.unitType === UnitType.POSITION) {
            if (!currentNode.positions) {
              currentNode.positions = [];
            }
            currentNode.positions.push({
              title: val.title
            });
          } else {
            if (!currentNode.children) {
              currentNode.children = [];
            }
            currentNode.children.push({
              title: val.title,
              fullTitle: currentNode.fullTitle + ' - ' + val.title,
              isDepartment: true
            });
          }
          this.tree.treeControl.expand(currentNode);
          this.renderTree();
        } else {
          currentChildren = (currentNode && currentNode.children) ? currentNode.children : [];
        }
      });
      console.log('DEBUG dialogRef.afterClosed: ', val);
    });
  }

  removeUnit(node: OrgNode) {
    console.log('DEBUG removeUnit data: ', node);
    const path: Array<string> = node.fullTitle ? node.fullTitle.split(' - ') : [];
    console.log('DEBUG removeUnit path: ', path);
    let currentNode: OrgNode | null;
    let currentChildren: Array<OrgNode> = this.dataSource.data;
    path.forEach((seg: string) => {
      const nodeIndex: number = getNodeIndexByTitle(seg, currentChildren);
      currentNode = nodeIndex > -1 ? currentChildren[nodeIndex] : null;
      if (currentNode === node) {
        currentChildren.splice(nodeIndex, 1);
        this.renderTree();
      } else {
        currentChildren = (currentNode && currentNode.children) ? currentNode.children : [];
      }
    });
  }

  renderTree() {
    // CRUTCH
    const updatedData = this.dataSource.data;
    this.dataSource.data = [];
    this.dataSource.data = updatedData;
    this.nodesFullTitles = [];
    this.dataSource.data.forEach((unit) => {
      this.nodesFullTitles = [...this.nodesFullTitles, unit.title, ...getFullTitlesForNode(unit, '')];
    });
    this.tree.treeControl.dataNodes = updatedData;
  }

  expandAll() {
    console.log('DEBUG expandAll tree - ', this.tree.treeControl)
    // console.log('DEBUG expandAll tree getChildren - ', this.tree.treeControl.getChildren())
    console.log('DEBUG expandAll data nodes - ', this.tree.treeControl.dataNodes)
    this.tree.treeControl.expandAll();
  }

  collapseAll() {
    this.tree.treeControl.collapseAll();
  }

  hasChild = (_: number, node: OrgNode) => (!!node.children && node.children.length > 0) || (!!node.positions && node.positions.length > 0) || node.isDepartment;

}

function checkIncomplete(unit: Unit): boolean {
  // console.log('DEBUG checkIncomplete unit - ', unit);
  let isUnitIncomplete: boolean = false;

  if (unit.positions && unit.positions.length > 0) {
    for (let i = 0; i < unit.positions.length; i++) {
      if (!unit.positions[i].employee) {
        isUnitIncomplete = true;
        break;
      }
    }
  } else if (unit.children && unit.children.length > 0) {
    for (let i = 0; i < unit.children.length; i++) {
      isUnitIncomplete = checkIncomplete(unit.children[i]);
      (unit.children[i] as OrgNode).incompleteUnit = isUnitIncomplete;
    }
  }

  return isUnitIncomplete;
}

function getFullTitlesForNode(unit: OrgNode | Unit, prefix: string): Array<string> {
  let titles: Array<string> = [];
  const title = prefix + (prefix ? ' - ' : '') + unit.title;
  (unit as OrgNode).fullTitle = title;
  if (unit.positions && unit.positions.length > 0) {
    return [title];
  } else if ((unit as OrgNode).isDepartment || (unit.children && unit.children.length > 0)) {
    if (unit.children && unit.children.length > 0) {
      for (let i = 0; i < unit.children.length; i++) {
        titles = [...titles, ...getFullTitlesForNode(unit.children[i], title)];
      }
    } else {
      return [title]
    }
  }

  return titles;
}

function getNodeIndexByTitle(title: string, nodes: Array<OrgNode>): number {
  let res = -1;
  for (let i = 0; i < nodes.length; i++) {
    if (title === nodes[i].title) {
      res = i;
      break;
    }
  }
  return res;
}

export interface Unit {
  id: string,
  title: string,
  children?: Array<Unit>
  positions?: Array<Position>,
  incompleteUnit?: boolean
}

export interface Position {
  id: string,
  title: string,
  employee?: Employee
}

export interface Employee {
  inn?: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  education?: string,
  experience?: string,
  driversLicence?: string
}

// TODO: bring it to order
interface OrgNode {
  title: string;
  children?: OrgNode[];
  positions?: OrgNode[];
  incompleteUnit?: boolean;
  fullTitle?: string;
  employee?: Employee;
  isDepartment?: boolean; // Temporary solution
}
