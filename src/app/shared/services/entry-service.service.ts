import { Injectable } from '@angular/core';
import * as moment from 'moment';

export enum Operator {
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
  shuffle: boolean;
  minimize: boolean;
  showWidget: boolean;
  startTime?: any;
  endTime?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EntryServiceService {
  public sections: SectionEntry[] = [];

  constructor() { }

  public getSections() {
    if (this.sections.length > 0) {
      return this.sections;
    }
    return JSON.parse(localStorage.getItem('section')) as SectionEntry[];
  }

  public setSections(sections: SectionEntry[]) {
    this.sections = sections;
    localStorage.setItem('section', JSON.stringify(this.sections));
  }
}
