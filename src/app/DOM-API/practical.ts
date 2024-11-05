import {Component, ElementRef, HostListener, Input, Renderer2, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tooltip',
  template: `
    <button #tooltipButton>{{ label }}</button>
    <div #tooltipBox class="tooltip-box" *ngIf="showTooltip">{{ tooltipText }}</div>
  `,
  standalone: true,
  imports: [
    NgIf
  ],
  styles: [`
    .tooltip-box {
      position: absolute;
      background-color: #333;
      color: #fff;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      visibility: hidden;
    }
  `]
})
export class TooltipComponent {
  @Input() label: string = 'Hover me';
  @Input() tooltipText: string = 'Tooltip text';
  showTooltip: boolean = false;

  // Element references for the button and tooltip box
  @ViewChild('tooltipButton', {static: true}) button!: ElementRef;
  @ViewChild('tooltipBox', {static: false}) tooltipBox!: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip = true;
    this.positionTooltip();
    this.renderer.setStyle(this.tooltipBox.nativeElement, 'visibility', 'visible');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showTooltip = false;
    this.renderer.setStyle(this.tooltipBox.nativeElement, 'visibility', 'hidden');
  }

  private positionTooltip() {
    // Get the button's position to place the tooltip
    const buttonPosition = this.button.nativeElement.getBoundingClientRect();
    const tooltipElement = this.tooltipBox.nativeElement;

    // Position tooltip below the button
    this.renderer.setStyle(tooltipElement, 'top', `${buttonPosition.bottom + window.scrollY}px`);
    this.renderer.setStyle(tooltipElement, 'left', `${buttonPosition.left + window.scrollX}px`);
  }
}


@Component({
  selector: 'app-parent',
  template: `
    <!-- app.component.html -->
    <app-tooltip label="Hover over me" tooltipText="This is a tooltip!"></app-tooltip>
    <app-tooltip label="Another button" tooltipText="Another tooltip example!"></app-tooltip>
  `,
  imports: [
    TooltipComponent
  ],
  standalone: true
})
export class ParentComponent {
}
