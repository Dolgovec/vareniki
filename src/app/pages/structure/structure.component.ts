import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {UsersService} from "../../services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {EditStructureComponent, UnitType} from "./edit-structure/edit-structure.component";

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
        console.log('DEBUG resp.forEach - ', unit);
        (unit as OrgNode).incompleteUnit = checkIncomplete(unit);
      });

      this.dataSource.data = resp;
      this.dataSource.data.forEach((unit) => {
        this.nodesFullTitles = [...this.nodesFullTitles, unit.title, ...getFullTitlesForNode(unit, '')];
        console.log('DEBUG this.nodesFullTitles - ', this.nodesFullTitles);
      });
      this.tree.treeControl.dataNodes = resp;
    });
  }

  toggleEmployees(val: boolean) {
    this.showEmployees = val;
  }

  createUnit() {
    this.dialog.open(EditStructureComponent,
      {
        width: '450px',
        data: {
          nodesFullTitles: this.nodesFullTitles,
          selectedUnitType: UnitType.DEPARTMENT
        }
      }
    );
  }

  addSubUnit(node: OrgNode) {
    // TODO: change
    console.log('DEBUG add sub unit: ', node);
    let selectedUnitType: UnitType | undefined;
    if (node.positions && node.positions.length > 0) {
      selectedUnitType = UnitType.POSITION;
    } else if (node.children && node.children.length > 0) {
      selectedUnitType = UnitType.DEPARTMENT;
    }

    this.dialog.open(EditStructureComponent,
      {
        width: '450px',
        data: {
          nodesFullTitles: this.nodesFullTitles,
          selectedNode: node.fullTitle,
          selectedUnitType
        }
      }
    );
  }

  removeUnit(node: OrgNode) {
    console.log('DEBUG removeUnit data: ', node);
    const path: Array<string> = node.fullTitle ? node.fullTitle.split(' - ') : [];
    console.log('DEBUG removeUnit path: ', path);
    let currentNode: OrgNode | null;
    let currentChildren: Array<OrgNode> = this.dataSource.data;
    path.forEach((seg: string) => {
      console.log('DEBUG path segment: ', seg);
      console.log('DEBUG starting currentChildren - ', currentChildren);
      const nodeIndex: number = getNodeIndexByTitle(seg, currentChildren);
      currentNode = nodeIndex > -1 ? currentChildren[nodeIndex] : null;
      console.log('DEBUG current node remove unit - ', currentNode);
      if (currentNode === node) {
        currentChildren.splice(nodeIndex, 1);
        this.renderTree();
      }
      currentChildren = (currentNode && currentNode.children) ? currentNode.children : [];
      console.log('DEBUG next currentChildren - ', currentChildren);
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
      console.log('DEBUG this.nodesFullTitles - ', this.nodesFullTitles);
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

  hasChild = (_: number, node: OrgNode) => (!!node.children && node.children.length > 0) || (!!node.positions && node.positions.length > 0);

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
  } else if (unit.children && unit.children.length > 0) {
    for (let i = 0; i < unit.children.length; i++) {
      titles = [...titles, ...getFullTitlesForNode(unit.children[i], title)];
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
  inn: string,
  firstName: string,
  middleName: string,
  lastName: string,
  education: string,
  experience: string,
  driversLicence: string
}

// TODO: bring it to order
interface OrgNode {
  title: string;
  children?: OrgNode[];
  positions?: OrgNode[];
  incompleteUnit?: boolean;
  fullTitle?: string;
  employee?: {
    "inn": string,
    "firstName": string,
    "middleName": string,
    "lastName": string,
    "education": string,
    "experience": string,
    "driversLicence": string
  };
}

/*const TREE_DATA: OrgNode[] = [
  {
    name: 'Управління',
    children: [
      {
        name: 'Дирекція',
        children: [
          {
            name: "Директор",
            children: [
              {
                requirements: {
                  education: Degree.HIGHER,
                  experience: 5,
                  driversLicence: 'B'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Виробництво',
    children: [
      {
        name: 'Перший цех'
      }
    ]
  }
];*/
