import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DisplayButtonEntry } from 'src/app/pages/setup/setup.component';
import { convertOperator } from '../../utilities';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface PickerEntry {
  index: number;
  buttonEntry: DisplayButtonEntry;
}

@Component({
  selector: 'app-cal-picker',
  templateUrl: './cal-picker.component.html',
  styleUrls: ['./cal-picker.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(100, style({ opacity: 0 })))
    ])
  ]
})
export class CalPickerComponent implements OnInit {

  @Input()
  public index: number;

  @Input()
  public showWidget: boolean= true;

  @Output()
  public onPick = new EventEmitter<PickerEntry>();

  public chosenNumbers: DisplayButtonEntry[] = [];

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
    { name: '(1-10)', value: 10 },
    { name: '(10-100)', value: 11 },
    { name: '(100-1000)', value: 12 },
  ];

  public displayOperators: string[] = ['+', '-', 'X', '/'];

  constructor() { }

  ngOnInit(): void {
  }

  public onToggleDisplay() {
    this.showWidget = !this.showWidget;
  }

  public onAddNumbers(num: DisplayButtonEntry, operator: string) {
    let newNum = { ...num };
    newNum.operator = convertOperator(operator);
    this.showWidget = false;
    this.onPick.emit({ index: this.index, buttonEntry: newNum });
  }

}
