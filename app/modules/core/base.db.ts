import {Injectable} from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';

@Injectable()
export abstract class BaseDb {

    /**
     * Table name
     * @type {string}
     */
    protected table = '';

    protected db:Storage;

    constructor() {
        this.db = new Storage(SqlStorage);
    }



    /**
     * Insert new record
     * @param data
     * @returns {Promise<any>}
     */
    public create(data = {}) {
        let sql = `INSERT INTO ${this.table} ${this.prepareInsertStatement(data)};`;
        return this.db.query(sql, this.objValues(data));
    }


    /**
     * Update record
     * @param id
     * @param data
     * @returns {Promise<any>}
     */
    public update(id, data = {}) {
        let sql = `UPDATE ${this.table} SET ${this.prepareUpdateStatement(data)} WHERE id = ?;`;
        return this.db.query(sql, this.objValues(data).concat(id));
    }

    /**
     * Drop table
     * @returns {Promise<any>}
     */
    public drop() {
        return this.db.query('DROP TABLE ' + this.table);
    }

    /**
     * get all
     * @returns {Promise<any>}
     */
    public all() {
        return this.db.query(`SELECT * FROM ${this.table}`);
    }

    /**
     * find one
     * @returns {Promise<any>}
     */
    public find(id) {
        return this.db.query(`SELECT * FROM ${this.table} WHERE id = (?)`, [id]);
    }

    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    public remove(id) {
        let sql = `DELETE FROM ${this.table} WHERE id = (?)`;
        return this.db.query(sql, [id]);
    }

    /**
     * reset table
     * @returns {Promise<any>}
     */
    public reset() {
        let sql = `DELETE FROM ${this.table}`;
        let db = this.db;

        return db.query(sql).then((success) => {

            return db.query(`DELETE FROM sqlite_sequence WHERE name=(?)`, [this.table]);

        }, (err) => {
            return new Promise.reject(err);
        });
    }


    /**
     * Generate: (field1, field2, field3) VALUE (?, ?, ?)
     *
     * @param fields
     * @returns {string}
     */
    protected prepareInsertStatement(fields:Object) {

        var q1 = '(';
        var q2 = '(';
        var total = Object.keys(fields).length;
        var loop = 0;
        for (var key in fields) {
            if (fields.hasOwnProperty(key)) {
                let val = fields[key];
                q1 += key;
                q2 += '?';
                q1 += total - 1 > loop ? ', ' : '';
                q2 += total - 1 > loop ? ', ' : '';
                loop++;
            }
        }

        q1 += ')';
        q2 += ')';

        return q1 + ' VALUES ' + q2;
    }
    /**
     * Generate: field1 = ?, field2 = ?
     *
     * @param fields
     * @returns {string}
     */
    protected prepareUpdateStatement(fields:Object) {

        var q1 = '';
        var total = Object.keys(fields).length;
        var loop = 0;
        for (var key in fields) {
            if (fields.hasOwnProperty(key)) {
                let val = fields[key];
                q1 += key + ' = ?';
                q1 += total - 1 > loop ? ', ' : ' ';
                loop++;
            }
        }

        return q1;
    }

    /**
     * Return values as array: [val1, val2, val3]
     * @param fields
     * @returns {*[]}
     */
    protected objValues(fields){
        return Object.keys(fields).map(key => fields[key]);
    }
}

/**
 * Helpers
 */
export class DB {

    /**
     *
     * @param response
     * @returns {Array|Null}
     */
    public static parseRow(response){
        let rows = response.res.rows;
        if(rows.length === 0){
            return null;
        }
        return rows[0];
    }

    /**
     *
     * @param response
     * @returns {Array|Null}
     */
    public static parseCollection(response){
        let rows = response.res.rows;
        if(rows.length === 0){
            return null;
        }
        return rows;
    }
}