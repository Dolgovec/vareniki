import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EventsService, WorkOrder} from "../../services/events.service";
import {MatTableDataSource} from "@angular/material/table";
import { jsPDF } from "jspdf";
import "../../Helvetica_Neue_OTS-normal";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  personal: string[];
  admins: string[];
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

  dataSource = new MatTableDataSource<WorkOrder>();

  eventsList: WorkOrder[] = [];

/*  eventsList: IEvent[] = [
    {
      id: 1,
      title: 'Наряд на закупку тіста для вареників',
      description: 'Потрібно закупити тісто для виготовлення вареників, бо воно вже закінчується. Для цього потрібно подзвонити на завод, замовити тісто, поїхати і забрати його',
      personal: ['Іванов Дмитро', 'Левінський Богдан'],
      admins: ['Дуб Олексій'],
      documentLink: 'https://google.com',
      status: 1,
      dateFrom: new Date('08/10/2022'),
      dateTo: new Date('08/15/2022'),
    },
    {
      id: 2,
      title: 'Наряд на техобслуговування машини',
      description: 'Машина зламалася. Не їздить більше. Треба розібратися чому і полагодити її. Можливо треба буде закупити деталі.',
      personal: ['Олександр Механіков'],
      admins: ['Данілов Максим', 'Денис Кравецький'],
      documentLink: 'https://google.com',
      status: 1,
      dateFrom: new Date('11/19/2022'),
      dateTo: new Date('11/22/2022'),
    },
    {
      id: 3,
      title: 'Наряд на техобслуговування конвеєру',
      description: 'Конвеэр зломався. Нехай хтось приде і починить.',
      personal: ['Білий Максим', 'Крацюк Антон', 'Дуб Олексій'],
      admins: ['Дуб Олексій', 'Денис Кравецький'],
      documentLink: 'https://google.com',
      status: 1,
      dateFrom: new Date('11/02/2022'),
      dateTo: new Date('11/05/2022'),
    },
    {
      id: 4,
      title: 'Закупити вішні',
      description: 'Вишня для вареників закінчилися. Треба з"їздити до фермерів та купити',
      personal: ['Олександр Механіков', 'Іванов Дмитро'],
      admins: ['Данілов Максим'],
      documentLink: 'https://google.com',
      status: 1,
      dateFrom: new Date('06/19/2022'),
      dateTo: new Date('06/22/2022'),
    },
    {
      id: 5,
      title: 'Потрібнно забрати звіт',
      description: 'Треба забрати скан документів по закупкам',
      personal: ['Олександр Механіков', 'Крацюк Антон', 'Білий Максим',],
      admins: ['Денис Кравецький'],
      documentLink: 'https://google.com',
      status: 1,
      dateFrom: new Date('07/19/2022'),
      dateTo: new Date('07/22/2022'),
    },
    {
      id: 6,
      title: 'Зробити щось важливе',
      description: 'Треба поїхати на місце та зрозуміти що можно зробити',
      personal: ['Олександр Механіков', 'Іванов Дмитро', 'Левінський Богдан'],
      admins: ['Дуб Олексій', 'Денис Кравецький', 'Данілов Максим'],
      documentLink: 'https://google.com',
      status: 1,
      dateFrom: new Date('10/19/2022'),
      dateTo: new Date('10/22/2022'),
    },
  ];*/

  displayedColumns: string[] = ['id', 'eventDate', 'dates', 'title', 'description', 'admins', 'personal', 'document'];

  constructor(private router: Router,
              private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.eventsService.getOrders().subscribe((result: WorkOrder[]) => {
      this.dataSource.data = result;
    });

    this.dataSource.data = this.eventsList;
  }

  routeTo(id: number): void {
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
    const dateFrom = report.fromDate?.toLocaleDateString();
    const dateTo = report.toDate?.toLocaleDateString();
    const text = `Наказ номер ${report.id}

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
      const dateFrom = o.fromDate?.toLocaleDateString();
      const dateTo = o.toDate?.toLocaleDateString();

      text += `
      Наказ номер ${o.id}
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
