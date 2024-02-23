import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
    if (err) {
        console.log(err.message);
    } else {
        if (!row) {
            console.log('Database does not exist. Creating database...');
            // create database
        } else {
            console.log('Connecting to database...');
            // connect to database
            try {
                db.c
            }
        }
    }