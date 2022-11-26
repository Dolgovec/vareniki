import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EventsService} from "../../services/events.service";
import {MatTableDataSource} from "@angular/material/table";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  personal: string[];
  admins: string[];
  dateFrom?: Date;
  dateTo?: Date;
  documentLink?: string;
  status?: number;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  dataSource = new MatTableDataSource<IEvent>();

  eventsList: IEvent[] = [
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
  ];

  displayedColumns: string[] = ['id', 'dates', 'title', 'description', 'admins', 'personal', 'document'];

  constructor(private router: Router,
              private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.eventsList;
  }

  routeTo(id: number): void {
    this.router.navigate([`events/${id}`]);
    this.eventsService.currentEvent = this.eventsList.find(o => o.id === id) || null;
  }

  routeToNewEvent(): void {
    this.eventsService.currentEvent = null;
    this.router.navigate([`events/new_event`]);
  }

  downloadDocument(e: Event, url: string): void {
    e.stopPropagation();

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = url.split('/').pop() || '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadReport(): void {
    let text = 'Звіт \n\n';
    this.dataSource.filteredData.forEach((o) => {
      const dateFrom = o.dateFrom?.toLocaleDateString();
      const dateTo = o.dateTo?.toLocaleDateString();

      text += `Наказ номер: ${o.id}; Дати на які він видавався: ${dateFrom} - ${dateTo}; Виконувач: ${o.personal}\n`;
    });

    this.download(text, 'report.txt');

  }

  private download(data: string, filename: string) {
    const file = new Blob([data], {type: 'text/plain'});
    let a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
