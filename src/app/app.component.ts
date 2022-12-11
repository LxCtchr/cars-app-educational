import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  });

  // carsData = [
  //   {
  //     image: "1.png",
  //     name: "Lamborghini Huracan Spyder",
  //     engine: 5.2,
  //     places: 2,
  //   },
  //   {
  //     image: "2.png",
  //     name: "Chevrolet Corvette",
  //     engine: 6.2,
  //     places: 2,
  //   },
  //   {
  //     image: "3.png",
  //     name: "Ferrari California",
  //     engine: 3.9,
  //     places: 4,
  //   },
  //   {
  //     image: "4.png",
  //     name: "Lamborghini Urus",
  //     engine: 4.0,
  //     places: 5,
  //   },
  //   {
  //     image: "5.png",
  //     name: "Audi R8",
  //     engine: 5.2,
  //     places: 2,
  //   },
  //   {
  //     image: "6.png",
  //     name: "Chevrolet Camaro",
  //     engine: 2.0,
  //     places: 4,
  //   },
  // ];

  carsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  };

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
  };

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  };

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({ behavior: "smooth" });
    if (car) {
      this.priceForm.patchValue({ car: car.name })
    };
  };

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = { transform: 'translate3d(' + ((e.clientX * 0.1) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)' };
  };

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = { backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px' };
  };

  onSubmit() {
    if (this.priceForm.valid) {
      this.appService.sendQuery(this.priceForm.value)
      .subscribe({
        next: (response: any) => {
          alert(response.message);
          this.priceForm.reset();
        },
        error: (response) => {
          alert(response.error.message);
        },
    });
    }
  };
};
