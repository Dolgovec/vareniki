import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EventsService, WorkOrder} from "../../services/events.service";
import {MatTableDataSource} from "@angular/material/table";
import { jsPDF } from "jspdf";
import "../../Helvetica_Neue_OTS-normal";
import {Supervisor} from "../../services/users.service";
import {Performer} from "./event-page/event-page.component";
import * as moment from 'moment';

export interface IEvent {
  id: number;
  title: string;
  description: string;
  performers: Performer[];
  participants: Supervisor[];
  fromDate?: Date;
  toDate?: Date;
  documentLink?: string;
  status?: number;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();

  eventsList: WorkOrder[] = [];

  displayedColumns: string[] = ['id', 'startDate', 'dates', 'title', 'description', 'participants', 'performers', 'document'];

  constructor(private router: Router,
              private eventsService: EventsService) {
    this.eventsList = this.eventsService.eventsList;

    const formattedResult = this.eventsService.eventsList.map((o: WorkOrder) => {
      return {
        id: o.id,
        startDate: moment(o.fromDate).subtract(2,'d'),
        title: o.title,
        description: o.description,
        fromDate: o.fromDate,
        toDate: o.toDate,
        participants: o.participants?.map((o: Supervisor) => ' ' + o.employee?.firstName + ' ' + o.employee?.lastName),
        performers: o.performers?.map((o: Performer) => ' ' + o.employee?.firstName + ' ' + o.employee?.lastName)
      }
    })
    this.dataSource.data = formattedResult;
  }

  ngOnInit(): void {
   /* this.eventsService.getOrders().subscribe((result: WorkOrder[]) => {
      const formattedResult = result.map((o: WorkOrder) => {
        return {
          id: o.id,
          startDate: o.startDate || new Date(),
          title: o.title,
          description: o.description,
          fromDate: o.fromDate,
          toDate: o.toDate,
          participants: o.participants?.map((o: Supervisor) => ' ' + o.employee?.firstName + ' ' + o.employee?.lastName),
          performance: o.performers?.map((o: Performer) => ' ' + o.employee?.firstName + ' ' + o.employee?.lastName)
        }
      })
      this.dataSource.data = formattedResult;
    });

    this.dataSource.data = this.eventsList;*/
  }

  routeTo(id: number): void {
    this.eventsService.currentEvent = this.eventsService.eventsList.find(o => o.id === id)!;
    this.router.navigate([`events/${id}`]);
  }

  routeToNewEvent(): void {
    this.eventsService.currentEvent = null;
    this.router.navigate([`events/new_event`]);
  }

  routeToInjury(): void {
    this.router.navigate([`events/new_injury`]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadSingleReport(e: Event, report: WorkOrder): void {
    e.stopPropagation();
    const dateFrom = moment(report.fromDate).format('DD.MM.YYYY');
    const dateTo = moment(report.toDate).format('DD.MM.YYYY');
    const text = `Наказ номер ${report.id} від ${moment(report.startDate).format('DD.MM.YYYY')}

    Дати на які він видавався: ${dateFrom} - ${dateTo}

    Опис:
    ${report.description}

    Керівники: ${report.participants}

    Виконувач: ${report.performers}`;

    this.createAndSaveInPdf(text, `Звіт за наказом ${report.id}`);
  }

  downloadSearchReport(): void {
    let text = `Звіт

    `;
    this.dataSource.filteredData.forEach((o) => {
      const dateFrom = moment(o.fromDate).format('DD.MM.YYYY');
      const dateTo = moment(o.toDate).format('DD.MM.YYYY');

      text += `
      Наказ номер ${o.id} від ${moment(o.startDate).format('DD.MM.YYYY')}
      Дати на які він видавався: ${dateFrom} - ${dateTo}
      Виконувач: ${o.performers}

      `;
    });

    this.createAndSaveInPdf(text, `Звіт для ${this.dataSource.filter}`);
  }

  createAndSaveInPdf(text: string, fileName: string = 'report'): void {
    // create PDF
    const doc = new jsPDF();
    // set UTF-8 font (Helvetica)
    doc.addFont('Helvetica_Neue_OTS-normal.ttf', 'Helvetica_Neue_OTS', 'normal');
    doc.setFont('Helvetica_Neue_OTS');
    doc.text(text, 10, 10, {
      maxWidth: 200
    });
    doc.save(`${fileName}.pdf`);
  }
}
