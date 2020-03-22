import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  public selectedMenu: string = 'minus';

  constructor() { }

  ngOnInit() {
  }
  public onClickMenu(item: string) {
    this.selectedMenu = item;
  }
}

