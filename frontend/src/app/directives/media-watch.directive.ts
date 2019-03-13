import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMediaWatch]'
})
export class MediaWatchDirective {
  @Input() playAction;
  @Input() endedAction;
  @Input() mediaControl;

  constructor(el: ElementRef) { }

  @HostListener('play') onPlay() {
    if (this.playAction) this.playAction(this.mediaControl);
  }

  @HostListener('ended') onEnded() {
    if (this.endedAction) this.endedAction(this.mediaControl);
  }

  @HostListener('pause') onPause() {
    if (this.endedAction) this.endedAction(this.mediaControl);
  }

}
