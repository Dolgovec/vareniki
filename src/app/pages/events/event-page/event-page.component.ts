import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {EventsService} from "../../../services/events.service";
import {IEvent} from "../events.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  form: UntypedFormGroup = new UntypedFormGroup({});
  event!: IEvent | null;

  admins: any[] = [
    {
      id: 1,
      name: 'Дуб Олексій'
    },
    {
      id: 2,
      name: 'Данілов Максим'
    },
    {
      id: 3,
      name: 'Кравецький Денис'
    },
  ];

  users: any[] = [
    {
      id: 1,
      name: 'Іванов Дмитро',
    },
    {
      id: 2,
      name: 'Левінський Богдан',
    },

    {
      id: 3,
      name: 'Механіков Олександр',
    },
    {
      id: 4,
      name: 'Білий Максим',
    },
    {
      id: 5,
      name: 'Крацюк Антон',
    }
  ];

  isConfirmed: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private eventsService: EventsService) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      admins: [[], Validators.required],
      personal: [[]],
    });
  }

  ngOnInit(): void {
    this.event = this.eventsService.currentEvent;

    if (this.router.url.includes('2')) {
      this.event = {
        id: 2,
        title: 'Наряд на техобслуговування машини',
        description: 'Машина зламалася. Не їздить більше. Треба розібратися чому і полагодити її. Можливо треба буде закупити деталі.',
        personal: [this.users[2]],
        admins: [this.admins[1], this.admins[2]],
        status: 1,
      }
    } else if (this.router.url.includes('1')) {
      this.event = {
        id: 1,
        title: 'Наряд на закупку тіста для вареників',
        description: 'Потрібно закупити тісто для виготовлення вареників, бо воно вже закінчується. Для цього потрібно подзвонити на завод, замовити тісто, поїхати і забрати його',
        personal: [this.users[0], this.users[1]],
        admins: [this.admins[0]],
        status: 1,
      }
    }

    if (this.event) {
      this.form.patchValue({
        title: this.event.title,
        admins: this.event.admins,
        description: this.event.description,
        personal: this.event.personal
      });
      if (this.event.status) {
        this.form.disable();
      }
    }
  }

  createNewEvent(): void {
    this.eventsService.currentEvent = this.form.getRawValue();
    this.eventsService.currentEvent!.id = 3;
    this.eventsService.currentEvent!.status = 0;
    this.event = this.eventsService.currentEvent;
    this.router.navigate(['events/3']);
  }

  confirmEvent(): void {
    this.isConfirmed = true;
  }

  downloadDoc(): void {
    // TODO: some logic
  }
}
