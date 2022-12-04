import { Component, OnInit } from '@angular/core';
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {EventsService, WorkOrder} from "../../../services/events.service";
import {IEvent} from "../events.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Supervisor, UsersService} from "../../../services/users.service";
import {User} from "../../users/users.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {jsPDF} from "jspdf";
import * as moment from "moment/moment";

export interface Comment {
  name: string;
  comment: string;
}

export interface Performer {
  id: number;
  employee: User;
}

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  form: UntypedFormGroup = new UntypedFormGroup({});
  commentForm: UntypedFormGroup = new UntypedFormGroup({
    comment: new FormControl('', Validators.required),
  });

  event!: WorkOrder | null;

  supervisors: Supervisor[];

  performers: Performer[] = [];

  comments: Comment[] = [
    {
      name: 'Денис Кравецький',
      comment: 'Вважаю, що 4 працівників достатьо для цієї задачі'
    },
    {
      name: 'Максим Данілов',
      comment: 'А що вони там вчотирьох будуть робити? І двоє справляться'
    }
  ]


  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private matSnackBar: MatSnackBar,
              private eventsService: EventsService) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      participants: [[], Validators.required],
      performers: [[]],
      fromDate: [],
      toDate: [],
    });

    this.supervisors = this.eventsService.participants;
    this.performers = this.eventsService.performers;
  }

  ngOnInit(): void {
/*    if (this.route.snapshot.data) {
      this.event = this.route.snapshot.data['order'];

      this.form.patchValue({
        title: this.event?.title,
        description: this.event?.description,
        fromDate: this.event?.fromDate,
        toDate: this.event?.toDate,
      });
      if (this.event?.status) {
        console.log(this.form.getRawValue())
        this.form.disable();
      }
      this.usersService.getUsers().subscribe((users: User[]) => {
        this.performers = users.map((u: User) => ({inn: u.inn, name: u.firstName + ' ' + u.lastName}));

        this.form.patchValue({
          performers: this.performers.filter((o: User) => this.event?.performers.find((p: Performer) => p.employee.inn === o.inn))
        });
      });
    }*/

/*    this.usersService.getSupervisors().subscribe({
      next: (supervisors: Supervisor[]) => {
        this.supervisors = supervisors;

        this.form.patchValue({
          participants: this.supervisors.filter((o: Supervisor) => this.event?.participants.find((p: Supervisor) => p.employee.inn === o.employee.inn))
        });
      },
      error: (err) => {
        console.log('error on getting supervisors', err);
      }
    });*/
    if (this.eventsService.currentEvent?.id) {
      this.event = this.eventsService.currentEvent;

      this.form.patchValue({
        title: this.event?.title,
        description: this.event?.description,
        fromDate: this.event?.fromDate,
        toDate: this.event?.toDate,
      });

      this.form.patchValue({
        performers: this.performers.filter((o: Performer) => this.event?.performers?.find((p: Performer) => p.employee.inn === o.employee.inn))
      });
      this.form.patchValue({
        participants: this.supervisors.filter((o: Supervisor) => this.event?.participants?.find((p: Supervisor) => p.employee.inn === o.employee.inn))
      });

      if (this.event.status) {
        this.form.disable();
      }
    }
  }

  createNewEvent(): void {
    const formData = this.form.getRawValue();
    delete(formData.fromDate);
    delete(formData.toDate);
    delete(formData.personal);
    formData.id = this.eventsService.eventsList.length + 1;
    //formData.participants = this.form.get('participants')?.value.map((o: Supervisor) => ({employee: {inn: o.employee.inn}}));

    /*this.eventsService.createOrder(formData).subscribe((result) => {
      this.matSnackBar.open('Подію успішно створено. Керівники були запрошені для подальших дій', '', {
        duration: 3000,
      });
      this.router.navigate(['events']);
    });*/

    this.eventsService.eventsList.push(formData);
    this.matSnackBar.open('Подію успішно створено. Керівники були запрошені для подальших дій', '', {
      duration: 3000,
    });
    this.router.navigate(['events']);
  }

  editEvent(): void {
    const formData = this.form.getRawValue();
    formData.id = this.event?.id;
    //formData.participants = this.form.get('participants')?.value.map((o: Supervisor) => ({employee: {inn: o.employee.inn}}));
    //formData.performers = this.form.get('performers')?.value.map((o: User) => ({employee: {inn: o.inn}}));

    const dataToSaveIndex = this.eventsService.eventsList.findIndex((o) => o.id === this.event?.id);
    this.eventsService.eventsList[dataToSaveIndex] = formData;

    this.matSnackBar.open('Успішно збережено', '', {
      duration: 3000,
    });
    this.router.navigate(['events']);
   /* this.eventsService.saveOrder(formData).subscribe((result) => {
      console.log(result);
      this.matSnackBar.open('Успішно збережено', '', {
        duration: 3000,
      });
      this.router.navigate(['events']);
    });*/
  }

  confirmEvent(): void {
    const dataToSaveIndex = this.eventsService.eventsList.findIndex((o) => o.id === this.event?.id);
    this.eventsService.eventsList[dataToSaveIndex].status = 1;

    this.matSnackBar.open('Успішно підписано', '', {
      duration: 3000,
    });
    this.router.navigate(['events']);

    /*const id = this.event!.id.toString();

    this.eventsService.signOrder(id,  '1233321323').subscribe((result) => {
      this.matSnackBar.open('Успішно підписано', '', {
        duration: 3000,
      });
      this.router.navigate(['events']);
    });*/
  }

  submitComment(): void {
    this.comments.push({
      name: 'Олексій Дуб',
      comment: this.commentForm.get('comment')?.value
    });
    this.commentForm.patchValue({
      comment: ''
    });
  }

  downloadDoc(): void {
    const report = this.event!;
    const dateFrom = moment(report.fromDate).format('DD.MM.YYYY');
    const dateTo = moment(report.toDate).format('DD.MM.YYYY');
    const formattedParticipants = report.participants?.map((o: Supervisor) => ' ' + o.employee?.firstName + ' ' + o.employee?.lastName);
    const formattedPerformers = report.performers?.map((o: Performer) => ' ' + o.employee?.firstName + ' ' + o.employee?.lastName);
    const text = `Наказ номер ${report.id} від ${moment(report.startDate).format('DD.MM.YYYY')}

    Дати на які він видавався: ${dateFrom} - ${dateTo}

    Опис:
    ${report.description}

    Керівники: ${formattedParticipants}

    Виконувач: ${formattedPerformers}`;

    this.createAndSaveInPdf(text, `Звіт за наказом ${report.id}`);
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
