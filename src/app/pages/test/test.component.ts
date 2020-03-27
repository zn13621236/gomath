import { Component, OnInit } from '@angular/core';
import { SectionEntry, EntryServiceService, NumberEntry, Operator } from 'src/app/shared/services/entry-service.service';
import { MatDialog } from '@angular/material/dialog';
import { StartTestComponent } from './start-test/start-test.component';

import * as moment from 'moment';
import { Router } from '@angular/router';

export interface Result {
  right: number;
  wrong: number;
  duration: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public sections: SectionEntry[] = [];
  public wrongEntries: NumberEntry[] = [];
  public isSubmitted: boolean = false;
  public startTime: any = moment();

  public result: Result = { right: 0, wrong: 0, duration: null };

  public constructor(
    public router: Router,
    public sectionService: EntryServiceService,
    public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.sections = [...this.sectionService.getSections()];
    const dialogRef = this.dialog.open(StartTestComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.startTime = moment();
    });
  }

  public onSubmit() {
    this.isSubmitted = true;

    this.summarize();
  }

  public onClear() {
    this.isSubmitted = false;
  }

  public check(entry: NumberEntry): boolean {

    switch (entry.operator) {
      case Operator.Plus:
        return (entry.answer as number) == (entry.num1 + entry.num2);
      case Operator.Divide:
        return (entry.answer as number) == (entry.num1 / entry.num2);
      case Operator.Times:
        return (entry.answer as number) == (entry.num1 * entry.num2);
      default:
        return (entry.answer as number) == (entry.num1 - entry.num2);
    }
  }

  public onCorrection() {
    this.sectionService.setSections([{ numberEntries: this.wrongEntries }]);
    location.reload();
  }

  public onRedo() {
    for (const section of this.sections) {
      for (const entry of section.numberEntries) {
        entry.answer = null;
      }
      this.isSubmitted = false;
    }
  }

  private summarize() {
    this.result.duration = moment().diff(this.startTime, 'minutes') + 'minutes';

    for (const section of this.sections) {
      for (const entry of section.numberEntries) {
        if (this.check(entry)) {
          this.result.right++;
        } else {
          this.result.wrong++;
          let wrongEntry = { ...entry };
          wrongEntry.answer = null;
          this.wrongEntries.push(wrongEntry);
        }
      }
    }
  }
}
