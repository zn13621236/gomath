import { Component, OnInit } from '@angular/core';
import { SectionEntry, EntryServiceService, NumberEntry, Operator } from 'src/app/shared/services/entry-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public sections: SectionEntry[] = [];
  public isSubmitted: boolean = false;

  public constructor(public sectionService: EntryServiceService) {

  }

  ngOnInit(): void {
    this.sections = [...this.sectionService.getSections()];
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
        return (entry.answer as number) == (entry.num1 / entry.num2);
      case Operator.Times:
        return (entry.answer as number) == (entry.num1 * entry.num2);
      default:
        return (entry.answer as number) == (entry.num1 - entry.num2);
    }
  }
}
