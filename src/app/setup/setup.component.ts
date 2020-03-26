import { Component, OnInit } from '@angular/core';
import { randomNumber } from '../shared/utilities';

enum Operator {
  Plus = '+',
  Minus = '-',
  Times = 'x',
  Divide = '/'
}

export interface NumberEntry {
  num1: number;
  num2: number;
  operator: Operator;
  answer: number;
}

export interface SectionEntry {
  numberEntries: NumberEntry[];
}

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

  public displayButtonEntry: DisplayButtonEntry[] = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '1-10', value: 10 },
    { name: '10-100', value: 11 },
    { name: '100-1000', value: 12 },
  ];

  public displayOperators: string[] = ['+', '-', 'X', '/']

  public sections: SectionEntry[] = [];

  public chosenNumbers: DisplayButtonEntry[] = [];

  public panelOpenState: boolean = false;

  public start: boolean = false;

  public isSubmitted: boolean = false;

  public shouldShuffle: boolean = false;

  public operator: string = '-';

  constructor() { }

  ngOnInit() {
  }

  public onAddNumbers(num: DisplayButtonEntry) {
    let newNum = { ...num };
    newNum.operator = this.convertOperator(this.operator);
    this.chosenNumbers.push(newNum);
  }

  public onRemoveNumbers(num: DisplayButtonEntry) {
    this.chosenNumbers.splice(this.chosenNumbers.indexOf(num), 1);
  }

  public setStep() {

  }

  public onStart() {
    this.sections = [];
    for (let num of this.chosenNumbers) {
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

      if (this.shouldShuffle) {
        this.shuffle(entries);
      }

      this.sections.push({ numberEntries: entries })
    }
    this.start = true;
  }

  public onSubmit() {
    this.isSubmitted = true;
  }

  public onClear() {
    this.isSubmitted = false;
  }

  public check(entry: NumberEntry): boolean {
    let res: boolean = (entry.answer as number) == (entry.num1 - entry.num2);

    switch (entry.operator) {
      case Operator.Plus:
        return (entry.answer as number) == (entry.num1 + entry.num2);
      case Operator.Divide:
        return (entry.answer as number) == (entry.num1 - entry.num2);
      case Operator.Times:
        return (entry.answer as number) == (entry.num1 / entry.num2);
      default:
        return (entry.answer as number) == (entry.num1 - entry.num2);
    }
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

  private shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  private convertOperator(input: string) {
    switch (input) {
      case 'X':
        return Operator.Times;
      case '-':
        return Operator.Minus;
      case '/':
        return Operator.Divide;
      default:
        return Operator.Plus;
    }
  }
}
