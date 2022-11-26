import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EventsService} from "../../services/events.service";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  personal: string[];
  admins: string[];
  documentLink?: string;
  status?: number;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  eventsList: IEvent[] = [
    {
      id: 1,
      title: 'Наряд на закупку тіста для вареників',
      description: 'Потрібно закупити тісто для виготовлення вареників, бо воно вже закінчується. Для цього потрібно подзвонити на завод, замовити тісто, поїхати і забрати його',
      personal: ['Іванов Дмитро', 'Левінський Богдан'],
      admins: ['Дуб Олексій'],
      documentLink: 'https://google.com',
      status: 1
    },
    {
      id: 2,
      title: 'Наряд на техобслуговування машини',
      description: 'Машина зламалася. Не їздить більше. Треба розібратися чому і полагодити її. Можливо треба буде закупити деталі.',
      personal: ['Олександр Механіков'],
      admins: ['Данілов Максим', 'Денис Кравецький'],
      documentLink: 'https://google.com',
      status: 1,
    }
  ];

  displayedColumns: string[] = ['title', 'description', 'admins', 'personal', 'document', ];

  constructor(private router: Router,
              private eventsService: EventsService) { }

  ngOnInit(): void {

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
}
