import {Directive, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';

export declare var google: any;

@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() addressChanged: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    // elRef will get a reference to the element where
    // the directive is placed
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    autocomplete.setFields(
      [
        'address_components',
        // 'adr_address',
        // 'alt_id',
        'formatted_address',
        'geometry',
        // 'icon',
        // 'id',
        'name',
        // 'permanently_closed',
        // 'photo',
        // 'place_id',
        // 'scope',
        'type',
        // 'url',
        // 'user_ratings_total',
        // 'utc_offset',
        // 'vicinity'
      ]
    );

    // Event listener to monitor place changes in the input
    autocomplete.addListener('place_changed', () => {
      // Emit the new address object for the updated place
      this.addressChanged.emit(autocomplete.getPlace());
    });
  }

}
