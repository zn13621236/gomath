import { Component, OnInit } from '@angular/core';
import { randomNumber, shuffle } from '../../shared/utilities';
import { SectionEntry, NumberEntry, Operator, EntryServiceService } from '../../shared/services/entry-service.service';
import { Router } from '@angular/router';
import { PickerEntry } from 'src/app/shared/components/cal-picker/cal-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

export interface DisplayButtonEntry {
  name: string;
  value: number;
  operator?: Operator;
}

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  public shouldShowNew: boolean = false;
  public curIndex: number = 0;
  public newSection: SectionEntry;

  public sections: SectionEntry[] = [];

  public chosenNumbers: DisplayButtonEntry[] = [];

  public panelOpenState: boolean = false;

  public shouldShuffle: boolean = false;

  constructor(
    public sectionService: EntryServiceService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public onShuffle(index: number, value: boolean) {

    let curSection = this.sections[index];
    curSection.shuffle = value;
    if (curSection.numberEntries.length > 0) {
      if (curSection.shuffle) {
        shuffle(curSection.numberEntries);
      } else {
        curSection.numberEntries = this.prepareNumberEntry({ name: '', value: curSection.numberEntries[0].num2, operator: curSection.numberEntries[0].operator })
      }
    }
  }

  public onMinimize(index: number) {
    this.sections[index].minimize = true;
    this.sections[index].showWidget = false;
  }

  public onMaximize(index: number) {
    this.sections[index].minimize = false;
  }

  public onRemoveSection(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { confirmText: 'Are you sure to remove this section' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sections.splice(index, 1);
      }
    });
  }

  public shouldDisableStart(): boolean {
    let result: boolean = false;

    if (this.sections.length == 0) return true;

    for (const section of this.sections) {
      if (section.numberEntries.length === 0) {
        result = true;
      }
    }

    return result;
  }

  public onAddNewSection() {
    for (let section of this.sections) {
      section.minimize = true;
      section.showWidget = false;
    }

    this.sections.push({ numberEntries: [], shuffle: false, minimize: false, showWidget: true });
  }

  public onCopySection(index: number) {
    for (let section of this.sections) {
      section.minimize = true;
      section.showWidget = false;
    }

    let newSection: SectionEntry = { numberEntries: [...{ ...this.sections[index] }.numberEntries], shuffle: false, minimize: false, showWidget: true }
    this.sections.push(newSection);
  }

  public onAddNumbers(entry: PickerEntry) {
    const num = entry.buttonEntry;
    let currentSection: SectionEntry = this.sections[entry.index];

    let entries: NumberEntry[] = this.prepareNumberEntry(num);

    if (currentSection.shuffle) {
      shuffle(entries);
    }

    currentSection.numberEntries = entries;

    this.sections[entry.index] = currentSection;
  }

  public onRemoveNumbers(num: DisplayButtonEntry) {
    this.chosenNumbers.splice(this.chosenNumbers.indexOf(num), 1);
  }

  public onStart() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { confirmText: 'Click Yes when you are done setting up the practice.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sectionService.setSections(this.sections);
        this.router.navigate(['/test']);
      }
    });
  }

  private prepareNumberEntry(num: DisplayButtonEntry): NumberEntry[] {
    let entries: NumberEntry[] = [];

    switch (num.operator) {
      case Operator.Divide:
        entries = this.prepareDivide(num, entries);
        break;
      case Operator.Plus:
        entries = this.preparePlusAndTimes(num, entries);
        break;
      case Operator.Times:
        entries = this.preparePlusAndTimes(num, entries);
        break;
      default:
        entries = this.prepareMinus(num, entries);
        break;
    }
    return entries;
  }

  private prepareMinus(num: DisplayButtonEntry, entries: NumberEntry[]): NumberEntry[] {
    let lookup: {} = {};

    if (num.value < 10) {
      for (let i = 1; i <= 10; i++) {
        let num1 = num.value + i;
        entries.push({
          num1,
          num2: num.value,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 11) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(10, 100);
        const num1 = randomNumber(num2, 100);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;
        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 10) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(1, 10);
        const num1 = randomNumber(num2 + 1, 10);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;
        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 12) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(99, 1000);
        const num1 = randomNumber(num2, 1000);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;
        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    }
    return entries;
  }

  private preparePlusAndTimes(num: DisplayButtonEntry, entries: NumberEntry[]): NumberEntry[] {
    let lookup: {} = {};

    if (num.value < 10) {
      for (let i = 1; i <= 10; i++) {
        let num1 = i;
        entries.push({
          num1,
          num2: num.value,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 11) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(10, 100);
        const num1 = randomNumber(10, 100);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;
        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 10) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(1, 10);
        const num1 = randomNumber(1, 10);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;

        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 12) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(99, 1000);
        const num1 = randomNumber(99, 1000);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;
        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    }
    return entries;
  }

  private prepareDivide(num: DisplayButtonEntry, entries: NumberEntry[]): NumberEntry[] {
    let lookup: {} = {};

    if (num.value < 10) {
      for (let i = 1; i <= 10; i++) {
        let num1 = num.value * i;
        entries.push({
          num1,
          num2: num.value,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 11) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(10, 100);
        const num1 = num2 * randomNumber(1, 10);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;
        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 10) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(1, 10);
        const num1 = num2 * randomNumber(1, 10);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;
        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    } else if (num.value === 12) {
      while (Object.values(lookup).length < 10) {
        const num2 = randomNumber(99, 1000);
        const num1 = num2 * randomNumber(1, 10);
        const key = `${num2}${num.operator}${num1}`
        if (lookup[key]) {
          continue;
        }
        lookup[key] = 1;
        entries.push({
          num1,
          num2: num2,
          operator: num.operator,
          answer: null
        });
      }
    }
    return entries;
  }
}
