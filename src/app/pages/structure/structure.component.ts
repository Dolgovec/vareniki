import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {Degree, User} from "../users/users.component";
import {UsersService} from "../../services/users.service";

interface OrgNode {
  title: string;
  children?: OrgNode[] | JobContentNode[];
}

interface JobContentNode {
  user?: User,
  requirements: {
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
    if (node.children) {
      return node.children as OrgNode[];
    }
    return null;
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

  hasChild = (_: number, node: OrgNode) => !!node.children && node.children.length > 0;

}
