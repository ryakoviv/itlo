import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-image-holder',
  templateUrl: './image-holder.component.html',
  styleUrls: ['./image-holder.component.scss']
})
export class ImageHolderComponent implements OnInit {

  @Input() imageFormControl: FormControl;
  @Input() imageSrc: string;

  constructor() { }

  ngOnInit() {
    if (this.isSelectable && this.imageFormControl.value) {
      this.imageSrc = this.imageFormControl.value;
    }
    if (!this.imageSrc) {
      this.imageSrc = './assets/images/default-thumbnail.jpg';
    }
  }

  get isSelectable(): boolean {
    return !!this.imageFormControl;
  }

  onSelectFile(event: any) {
    if (this.isSelectable && event.target.files && event.target.files[0]) {
      this.imageFormControl.setValue(event.target.files[0]);
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (ev: any) => {
        this.imageSrc = ev.target.result;
      };
    }
  }

}
