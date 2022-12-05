import { Injectable } from '@angular/core';
import {IEvent} from "../pages/events/events.component";
import {Observable} from "rxjs";
import {User} from "../pages/users/users.component";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Supervisor} from "./users.service";
import {Performer} from "../pages/events/event-page/event-page.component";

export interface WorkOrder {
  id?: number;
  title: string;
  description: string;
  initiator?: User;
  participants?: Supervisor[];
  performers?: Performer[];
  fromDate?: Date;
  toDate?: Date;
  startDate?: Date;
  status?: number;
}

export interface Injury {
  id?: number;
  description: string;
  place: string;
  dateTime: any;
  receipt?: any;
  medComment: string;
  financierComment: string;
  directorComment: string;
  isStep1Finished: boolean;
  isStep2Finished: boolean;
  isStep3Finished: boolean;
  isStep4Finished: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  currentEvent!: WorkOrder | null;

  currentInjury!: Injury | null;

  participants: Supervisor[] = [
    {
      id: 1,
      employee: {
        inn: '1',
        education: 'Вище',
        experience: 5,
        firstName: 'Дуб',
        lastName: 'Олексій',
        middleName: 'Сергійович',
        driversLicence: 'BC'
      }
    },
    {
      id: 2,
      employee: {
        inn: '2',
        education: 'Середнє',
        experience: 3,
        firstName: 'Данілов',
        lastName: 'Максім',
        middleName: 'Дмитрович',
        driversLicence: 'C'
      }
    },
    {
      id: 3,
      employee: {
        inn: '3',
        education: 'Вище',
        experience: 2,
        firstName: 'Денис',
        lastName: 'Кравецький',
        middleName: 'Олексійович',
        driversLicence: 'C'
      }
    },
  ];

  performers: Performer[] = [
    {
      id: 1,
      employee: {
        inn: '1',
        firstName: 'Дмитро',
        lastName: 'Іванов',
        middleName: 'Сергійович',
        education: 'Середнє',
        driversLicence: 'B',
        experience: 1
      }
    },
    {
      id: 2,
      employee: {
        inn: '2',
        firstName: 'Богдан',
        lastName: 'Левінський',
        middleName: 'Сергійович',
        education: 'Середнє',
        driversLicence: 'C',
        experience: 2
      }
    },
    {
      id: 3,
      employee: {
        inn: '3',
        firstName: 'Олександр',
        lastName: 'Механіков',
        middleName: 'Сергійович',
        education: 'Середнє',
        driversLicence: 'C',
        experience: 2
      }
    },
    {
      id: 4,
      employee: {
        inn: '4',
        firstName: 'Максим',
        lastName: 'Білий',
        middleName: 'Сергійович',
        education: 'Середнє',
        driversLicence: 'C',
        experience: 3
      }
    },
    {
      id: 5,
      employee: {
        inn: '5',
        firstName: 'Антон',
        lastName: 'Крацюк',
        middleName: 'Сергійович',
        education: 'Середнє',
        driversLicence: 'C',
        experience: 2
      }
    },
    {
      id: 6,
      employee: {
        inn: '6',
        firstName: 'Роман',
        lastName: 'Жолоб',
        middleName: 'Сергійович',
        education: 'Середнє',
        driversLicence: 'B',
        experience: 1
      }
    }
  ];

  eventsList: WorkOrder[] = [
    {
      id: 1,
      title: 'Наряд на закупку тіста для вареників',
      description: 'Потрібно закупити тісто для виготовлення вареників, бо воно вже закінчується. Для цього потрібно подзвонити на завод, замовити тісто, поїхати і забрати його',
      performers: [this.performers[0], this.performers[1]],
      participants: [this.participants[0]],
      status: 1,
      fromDate: new Date('08/10/2022'),
      toDate: new Date('08/15/2022'),
    },
    {
      id: 2,
      title: 'Наряд на техобслуговування машини',
      description: 'Машина зламалася. Не їздить більше. Треба розібратися чому і полагодити її. Можливо треба буде закупити деталі.',
      performers: [this.performers[2]],
      participants: [this.participants[1], this.participants[2]],
      status: 1,
      fromDate: new Date('11/19/2022'),
      toDate: new Date('11/22/2022'),
    },
    {
      id: 3,
      title: 'Наряд на техобслуговування конвеєру',
      description: 'Конвеэр зломався. Нехай хтось приде і починить.',
      performers: [this.performers[3], this.performers[5], this.performers[4]],
      participants: [this.participants[0], this.participants[2]],
      status: 1,
      fromDate: new Date('11/02/2022'),
      toDate: new Date('11/05/2022'),
    },
    {
      id: 4,
      title: 'Закупити вішні',
      description: 'Вишня для вареників закінчилися. Треба з"їздити до фермерів та купити',
      performers: [this.performers[1], this.performers[3]],
      participants: [this.participants[1]],
      status: 1,
      fromDate: new Date('06/12/2022'),
      toDate: new Date('06/15/2022'),
    },
    {
      id: 5,
      title: 'Потрібнно забрати звіт',
      description: 'Треба забрати скан документів по закупкам',
      performers: [this.performers[2], this.performers[0], this.performers[5]],
      participants: [this.participants[2]],
      status: 1,
      fromDate: new Date('07/19/2022'),
      toDate: new Date('07/22/2022'),
    },
    {
      id: 6,
      title: 'Зробити щось важливе',
      description: 'Треба поїхати на місце та зрозуміти що можно зробити',
      performers: [this.performers[1], this.performers[3], this.performers[4]],
      participants: [this.participants[0], this.participants[1], this.participants[2]],
      status: 1,
      fromDate: new Date('10/29/2022'),
      toDate: new Date('10/30/2022'),
    },
  ];

  injuriesList: Injury[] = [
    {
      "id": 1,
      "description": "Василь запхнув руку прямо у працюючий станок!!",
      "place": "Станок з тістом",
      "dateTime": "2022-12-02T11:35:45.000Z",
      "medComment": "Рука подроблена, це надовго...",
      "financierComment": "40000 грн на лікування. 20000 грн на лікарняний. Загалом 60000 грн",
      "directorComment": "!!!!!",
      "isStep1Finished": true,
      "isStep2Finished": true,
      "isStep3Finished": true,
      "isStep4Finished": true
    }
  ];

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

  getOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.sharedService.getFullUrl('order'));
  }

  getOrderById(id: string): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(this.sharedService.getFullUrl(`order/${id}`));
  }

  createOrder(order: WorkOrder): Observable<any> {
    return this.http.post<any>(this.sharedService.getFullUrl('order'), order);
  }

  saveOrder(order: WorkOrder): Observable<any> {
    return this.http.patch<any>(this.sharedService.getFullUrl('order'), order);
  }

  signOrder(orderId: string, userId: string): Observable<any> {
    return this.http.post(this.sharedService.getFullUrl(`order/${orderId}`), {employeeInn: userId});
  }
}
