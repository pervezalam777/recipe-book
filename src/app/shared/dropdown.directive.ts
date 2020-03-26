import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') 
    isOpen = false;

    //Following host listener only works on clicking host element
    // which means click outside will not close the dropdown. 
    @HostListener('click') 
    toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    //Following code assign listener on document and execute
    // each time whenever click event occurs on document.
    // @HostListener('document:click', ['$event'])
    // toggleOpen(event:Event){
    //     this.isOpen = 
    //         this.eleRef.nativeElement.contains(event.target) 
    //         ? !this.isOpen 
    //         : false;
    // }

    // constructor(private eleRef:ElementRef){}
}