import {Injectable} from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';

@Injectable()
export abstract class BaseDb {

    /**
     * Table name
     * @type {string}
     */
    protected table = '';

    protected storage:Storage;

    constructor() {
        this.storage = new Storage(SqlStorage);
    }


    protected drop(){
        return this.storage.query('DROP TABLE '+this.table);
    }


    /**
     * get all
     * @returns {Promise<any>}
     */
    public all() {
        return this.storage.query(`SELECT * FROM ${this.table}`);
    }

    /**
     * find one
     * @returns {Promise<any>}
     */
    public find(id) {
        return this.storage.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
    }

    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    public remove(id) {
        let sql = `DELETE FROM ${this.table} WHERE id = (?)`;
        return this.storage.query(sql, [id]);
    }

    /**
     * call this to reset your category table
     * @returns {Promise<any>}
     */
    public reset() {
        let sql = `DELETE FROM ${this.table}`;
        return this.storage.query(sql);
    }
}