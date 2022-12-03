import { Component, OnInit } from '@angular/core';
import {FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Comment} from "../event-page/event-page.component";
import {IEvent} from "../events.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {jsPDF} from "jspdf";
import * as moment from 'moment';

@Component({
  selector: 'app-injury-page',
  templateUrl: './injury-page.component.html',
  styleUrls: ['./injury-page.component.scss']
})
export class InjuryPageComponent implements OnInit {

  event!: IEvent | null;
  todayDate: Date = new Date();

  commentForm: UntypedFormGroup = new UntypedFormGroup({
    comment: new FormControl('', Validators.required),
  });

  step1Form: UntypedFormGroup = new UntypedFormGroup({
    description: new FormControl('', Validators.required),
    place: new FormControl('', Validators.required),
    dateTime: new FormControl('', Validators.required),
  });

  isStep1Finished: boolean = false;

  step2Form: UntypedFormGroup = new UntypedFormGroup({
    receipt: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });

  isStep2Finished: boolean = false;

  step3Form: UntypedFormGroup = new UntypedFormGroup({
    comment: new FormControl('',  Validators.required),
  });

  isStep3Finished: boolean = false;

  step4Form: UntypedFormGroup = new UntypedFormGroup({
    comment: new FormControl(''),
  });

  comments: Comment[] = [];

  constructor(private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
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

  submitStep1(): void {
    this.isStep1Finished = true;
    this.step1Form.disable();

    this.matSnackBar.open('Успішно збережено та передано до мед.працівника', '', {
      duration: 3000,
    });
    // TODO: implement step 1 submit
  }

  submitStep2(): void {
    this.isStep2Finished = true;
    this.step2Form.disable();

    this.matSnackBar.open('Успішно збережено та передано до фінансиста', '', {
      duration: 3000,
    });
    // TODO: implement step 2 submit
  }

  submitStep3(): void {
    this.isStep3Finished = true;
    this.step3Form.disable();

    this.matSnackBar.open('Успішно збережено та передано до директора', '', {
      duration: 3000,
    });
    // TODO: implement step 3 submit
  }

  submitStep4(): void {
    this.matSnackBar.open('Підтверджено!', '', {
      duration: 3000,
    });
  }

  downloadReceipt(): void {
    this.matSnackBar.open('Тут повинна скачуватися справка', '', {
      duration: 2000,
    });
  }

  formFullDoc(): void {
    let text = `Звіт о виробничій травмі

      Травма сталася на робочому місці "${this.step1Form.get('place')?.value}" о ${moment(this.step1Form.get('dateTime')?.value).format('DD.MM.YYYY HH:mm')}. Вона була отримана наступним чином:
      ${this.step1Form.get('description')?.value}

      Мед.персонал провів обстеження потерпілого та надав справку для фінансиста.
    `;

    if (this.step2Form.get('comment')?.value) {
      text += `
      У коментарі мед.працівник зазначив наступне:
      ${this.step2Form.get('comment')?.value}
      `;
    }

    text += `
      Фінансист ознайомився із справкою та визначив наступний об'єм виплат:
      ${this.step3Form.get('comment')?.value}
    `;

    this.createAndSaveInPdf(text, `Виробнича травма`);
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
