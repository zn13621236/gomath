import { Component, OnInit } from '@angular/core';

export interface NumberEntry {
  num1: number;
  num2: number;
  answer: number;
}

export interface SectionEntry {
  numberEntries: NumberEntry[];
}

@Component({
  selector: 'app-take-away',
  templateUrl: './take-away.component.html',
  styleUrls: ['./take-away.component.scss']
})
export class TakeAwayComponent implements OnInit {
  public displayNums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  public sections: SectionEntry[] = [];
  public chosenNumbers: number[] = [];

  public start: boolean = false;

  public isSubmitted: boolean = false;

  public shouldShuffle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public onAddNumbers(num: number) {
    this.chosenNumbers.push(num);


  }

  public onStart() {
    this.sections = [];
    for (let num of this.chosenNumbers) {
      let entries: NumberEntry[] = [];
      for (let i = 1; i <= 9; i++) {
        let num1 = num + i;
        entries.push({ num1, num2: num, answer: null });
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
    const res = (entry.answer as number) == (entry.num1 - entry.num2);
    return res;
  }

  private shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
}
