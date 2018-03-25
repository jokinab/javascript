import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cf-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  _id: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
  }

}
