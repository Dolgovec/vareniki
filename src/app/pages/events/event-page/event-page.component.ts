import { Component, OnInit } from '@angular/core';
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {EventsService} from "../../../services/events.service";
import {IEvent} from "../events.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {User} from "../../users/users.component";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface Comment {
  name: string;
  comment: string;
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
  event!: IEvent | null;

  participants: any[] = [
    {
      inn: 1,
      lastName: 'Дуб',
      firstName: 'Олексій',
      middleName: 'no',
      education: 'Вища',
      driverLicence: "BC",
      experience: "5",
    },
    {
      inn: 2,
      lastName: 'Данілов',
      firstName: 'Максим',
      middleName: 'no',
      education: 'Вища',
      driverLicence: "C",
      experience: "3",
    },
    {
      inn: 3,
      lastName: 'Кравецький',
      firstName: 'Денис',
      middleName: 'no',
      education: 'Вища',
      driverLicence: "ABC",
      experience: "10",
    }
  ];

  users: any[] = [];

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
      personal: [[]],
      fromDate: [],
      toDate: [],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.data) {
      this.event = this.route.snapshot.data['order'];

      this.form.patchValue({
        title: this.event?.title,
        admins: this.event?.admins,
        description: this.event?.description,
        personal: this.event?.personal,
        fromDate: this.event?.fromDate,
        toDate: this.event?.toDate,
      });
      if (this.event?.status) {
        console.log(this.form.getRawValue())
        this.form.disable();
      }
      this.usersService.getUsers().subscribe((users: User[]) => {
        this.users = users.map((u: User) => ({inn: u.inn, name: u.firstName + ' ' + u.lastName}));
      });
    }

    this.usersService.getParticipants().subscribe({
      next: (participants: User[]) => {
        this.participants = participants;
      },
      error: (err) => {
        console.log('error on getting participants', err);
      }
    });
  }

  createNewEvent(): void {
    const formData = this.form.getRawValue();
    delete(formData.fromDate);
    delete(formData.toDate);
    delete(formData.personal);

    this.eventsService.createOrder(formData).subscribe((result) => {
      this.matSnackBar.open('Подію успішно створено. Керівники були запрошені для подальших дій', '', {
        duration: 3000,
      });
      this.router.navigate(['events']);
    });
  }

  editEvent(): void {
    const formData = this.form.getRawValue();
    formData.id = this.event?.id;

    this.eventsService.saveOrder(formData).subscribe((result) => {
      console.log(result);
      this.matSnackBar.open('Успішно збережено', '', {
        duration: 3000,
      });
      this.router.navigate(['events']);
    });
  }

  confirmEvent(): void {
    const id = this.event!.id.toString();

    this.eventsService.signOrder(id,  '1233321323').subscribe((result) => {
      this.matSnackBar.open('Успішно підписано', '', {
        duration: 3000,
      });
      this.router.navigate(['events']);
    });
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
    // TODO: some logic
  }
}
