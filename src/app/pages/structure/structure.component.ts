import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {Degree, User} from "../users/users.component";
import {UsersService} from "../../services/users.service";

// TODO: bring it to order
interface OrgNode {
  title: string;
  children?: OrgNode[];
  positions?: OrgNode[];
  incompleteUnit?: boolean;
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

interface JobContentNode {
  title: string;
  employee: {
    education: Degree,
    experience: number,
    driversLicence: string
  }
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

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {
  treeControl = new NestedTreeControl<OrgNode>(node => {
    let nestedTree: OrgNode[] = [];
    if (node.children) {
      nestedTree = [...nestedTree, ...node.children]
    }

    if (node.positions) {
      nestedTree = [...nestedTree, ...node.positions]
    }

    if (nestedTree.length > 0) {
      return nestedTree;
    } else {
      return null;
    }
  });
  dataSource = new MatTreeNestedDataSource<OrgNode>();

  showEmployees: boolean = false;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    const checkIncomplete = function (unit: Unit): boolean {
      console.log('DEBUG checkIncomplete unit - ', unit);
      let isUnitIncomplete: boolean = false;

      if (unit.positions && unit.positions.length > 0) {
        for (let i = 0; i < unit.positions.length; i++) {
          if (!unit.positions[i].employee) {
            isUnitIncomplete = true;
            break;
          }
        }
      } else if(unit.children && unit.children.length > 0) {
        for (let i = 0; i < unit.children.length; i++) {
          isUnitIncomplete = checkIncomplete(unit.children[i]);
          (unit.children[i] as OrgNode).incompleteUnit = isUnitIncomplete;
        }
      }

      return isUnitIncomplete;
    }

    this.userService.getDepartment().subscribe((resp: Array<Unit>) => {
      resp?.forEach((unit) => {
        console.log('DEBUG resp.forEach - ', unit);
        (unit as OrgNode).incompleteUnit = checkIncomplete(unit);
      });

      this.dataSource.data = resp;
    });
  }

  toggleEmployees(val: boolean) {
    console.log('DEBUG toggleEmployees - ', val);
    this.showEmployees = val;
  }

  hasChild = (_: number, node: OrgNode) => (!!node.children && node.children.length > 0) || (!!node.positions && node.positions.length > 0);

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
