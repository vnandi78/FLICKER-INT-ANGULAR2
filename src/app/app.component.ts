import {Component, OnInit} from '@angular/core';
import {FlickrService} from '../services/flickr.service';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FlickrService]
})
export class AppComponent implements OnInit {
  searchControl = new FormControl();
  photos: Object;
  constructor(private _formBuilder: FormBuilder, private _flickrService: FlickrService) {
  }
  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((query: string) => this._flickrService.getResult(query))
      .subscribe(value => {
       this.photos = value;
      });
  }
}
