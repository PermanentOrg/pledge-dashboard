import { Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { orderBy, debounce } from 'lodash';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows?: string[][];
}


export interface FirebasePledge {
    timestamp: number;
    name: string;
    email: string;
    dollarAmount: number;
    anonymous?: boolean;
    noCharge?: boolean;
    id?: string;
    ref?: firebase.database.Reference;
    editing?: string | boolean | any;
    notes?: string;
}

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy {
    public tableData1: TableData;
    public tableData2: TableData;
    public pledges: FirebasePledge[] = [];

    public page = 1;

    public currentSort = 'timestamp';
    public reverseSort = false;

    public currentUser: string;

    public editData = {};

    public onCloseHandler = function(e) {
        return this.beforeClosePrompt(e);
    }.bind(this);

    constructor(
        private db: AngularFireDatabase,
        private zone: NgZone,
        private authService: AuthService,
        private router: Router
    ) {
        this.currentUser = authService.getCurrentUser().email

        this.db.database.ref('/pledges').on('child_added', snapshot => {
            const pledge = snapshot.val() as FirebasePledge;
            pledge.id = snapshot.key;
            pledge.ref = snapshot.ref;

            this.zone.run(() => {
                this.pledges.push(pledge);
                this.editData[pledge.id] = Object.assign({}, pledge);
            });

            snapshot.ref.on('child_changed', (changedChild) => {
                this.zone.run(() => {
                    pledge[changedChild.key] = changedChild.val();
                    if (pledge.editing === this.currentUser) {
                        this.editData[pledge.id] = Object.assign({}, pledge);
                    }
                })
            });
        });

        window.addEventListener('beforeunload', this.onCloseHandler);
    }

    ngOnInit() {
        this.tableData1 = {
            headerRow: ['Created', 'Amount', 'Email', 'Name']
        };
    }

    onPledgeRowClick(pledge) {
        this.router.navigate(['/pledges', pledge.id]);
    }

    sortPledges(sort) {
        if (this.currentSort === sort) {
            this.reverseSort = !this.reverseSort;
        }

        this.pledges.sort((a, b) => {
            let sortValue;
            switch (sort) {
                case 'name':
                case 'email':
                    sortValue = a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : -1;
                    break;
                default:
                    if (a[sort] !== b[sort]) {
                        sortValue = a[sort] > b[sort] ? 1 : -1;
                    } else if (a.name !== b.name) {
                        sortValue = a['name'].toLowerCase() > b['name'].toLowerCase() ? 1 : -1;
                    } else {
                        sortValue = a.timestamp > b.timestamp ? 1 : -1;
                    }
                    break;
            }

            return this.reverseSort ? -sortValue : sortValue;
        });

        this.currentSort = sort;
    }

    createPledge() {
        const dollarAmount = prompt('$:');
        const email = prompt('email:');
        const name = prompt('name:');

        const pledges = this.db.list('pledges');
        pledges.push({
            dollarAmount: dollarAmount,
            email: email,
            name: name
        }).then(ref => {
            console.log('it worked');
        }).catch(err => {
            console.error('it failed', err);
        });
    }

    prevPage() {
        if (this.page > 1) {
            this.page--;
        }
    }

    nextPage() {
        this.page++;
    }

    startEditing(pledge: FirebasePledge) {
        pledge.editing = this.currentUser;
        pledge.ref.update({
            editing: this.currentUser
        }).then(() => {
            this.zone.run(() => {
                this.editData[pledge.id] = Object.assign({}, pledge);
            })
        });

    }

    stopEditing(pledge: FirebasePledge, save = false) {
        if (!save) {
            pledge.ref.update({
                editing: false
            });
        } else {
            const updatedPledge = this.editData[pledge.id];
            updatedPledge.editing = false;
            delete updatedPledge.id;
            delete updatedPledge.ref;
            Object.assign(pledge, updatedPledge);
            pledge.ref.update(updatedPledge).then(() => {
                console.log(`Saved pledge ID ${pledge.id}`);
            })
        }
    }

    beforeClosePrompt(e) {
        const editing = this.pledges.filter(pledge => {
            return pledge.editing === this.currentUser;
        });

        if (editing.length) {
            const msg = `You have unsaved changes on ${editing.length} pledges. Please save them before leaving.`;
            (e || window.event).returnValue = msg;
            return msg;
        } else {
            return 'no edits?';
        }
    }

    ngOnDestroy() {
        window.removeEventListener('beforeunload', this.onCloseHandler);
    }

}
