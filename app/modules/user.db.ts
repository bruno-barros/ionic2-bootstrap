import {Injectable} from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import {BaseDb} from './core/base.db';

@Injectable()
export class UserDb extends BaseDb {

    protected table = 'user';

    constructor() {
        super();
        this.init();
    }

    private init() {

        let sql = `CREATE TABLE IF NOT EXISTS ${this.table}
        (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        login TEXT,
        email TEXT,
        avatar TEXT,
        role TEXT
        )`;
        this.db.query(sql);
    }


}