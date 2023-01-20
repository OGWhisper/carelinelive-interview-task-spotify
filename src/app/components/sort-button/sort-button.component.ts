import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-sort-button',
    templateUrl: './sort-button.component.html',
    styleUrls: ['./sort-button.component.scss'],
})
export class SortButtonComponent implements OnInit {
    @Output() valueChange = new EventEmitter<number>();
    @Input() value: number = 0;
    @Input() name: string = '';

    constructor() {}

    ngOnInit(): void {}

    sort() {
        // 0  ->  1  ->  -1  ->  0 Repeat

        this.value++;

        if(this.value == 2) {
            this.value = -1;
        }

        this.valueChange.emit(this.value);
    }
}
