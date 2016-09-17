import {Injectable} from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import {BaseDb} from './core/base.db';

@Injectable()
export class UserDb extends BaseDb {

    protected table = 'user';

    constructor() {
        super();
        //this.storage = new Storage(SqlStorage);
        this.init();
    }

    private init() {

        let sql = `CREATE TABLE IF NOT EXISTS ${this.table}
        (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        role TEXT
        )`;
        this.storage.query(sql);
    }


    /**
     * Insert new user
     * @param data
     * @returns {Promise<any>}
     */
    public create(data = {name: '', email: '', role: 'subscriber'}) {
        let sql = `INSERT INTO ${this.table} (name, email, role) VALUES (?, ?, ?)`;
        return this.storage.query(sql, [data.name, data.email, data.role]);
    }




    // update category
    update(id, data = {name:'', email:''}) {
        let sql = `UPDATE ${this.table} SET name = ?, email = ? WHERE id = ?`;
        return this.storage.query(sql, [data.name, data.email, id]);
    }



}