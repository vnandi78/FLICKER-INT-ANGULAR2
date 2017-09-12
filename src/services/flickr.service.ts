import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class FlickrService {
  result$: Observable<any>;
  key = '09f6ae22581d3533ccf017eb9a971bd9';
  constructor(private _http: Http) { }

  getResult(query: string) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&tag_mode=all&tags=${query}&text=${query}&per_page=50&format=json&nojsoncallback=1`;
    return this._http
      .get(url)
      .map(res => res.json())
      .map((val) => {
        if (val.stat === 'ok') {
          return val.photos.photo.map((photo: any) => {
            return {
              url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
              title: photo.title
            };
          });
        } else {
          return [];
        }
      });
  }
}
