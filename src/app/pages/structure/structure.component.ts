import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {Degree, User} from "../users/users.component";
import {UsersService} from "../../services/users.service";

interface OrgNode {
  title: string;
  children?: OrgNode[];
  positions?: OrgNode[];
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

    if(node.positions) {
      nestedTree = [...nestedTree, ...node.positions]
    }

    if(nestedTree.length > 0) {
      return nestedTree;
    } else {
      return null;
    }
  });
  dataSource = new MatTreeNestedDataSource<OrgNode>();

  constructor(private userService: UsersService) {
    //this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.userService.getDepartment().subscribe((resp) => {
      this.dataSource.data = resp;
    });
  }

  hasChild = (_: number, node: OrgNode) => (!!node.children && node.children.length > 0) || (!!node.positions && node.positions.length >0);

}
