import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.show') isOpen: boolean;
  @HostBinding('ariaExpanded') ariaExp: string;

  menu: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.menu = this.renderer.nextSibling(this.elementRef.nativeElement);
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    this.ariaExp = this.isOpen ? 'true' : 'false';

    if (this.isOpen) {
      this.renderer.addClass(this.menu, 'show');
    } else {
      this.renderer.removeClass(this.menu, 'show');
    }
  }
}
