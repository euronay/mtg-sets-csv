#! /usr/bin/env node

const request = require('request');
const fs = require('fs');
const { Parser } = require('json2csv');

request('https://api.scryfall.com/sets', function (error, response, body) {
    if (!error && response.statusCode == 200) {

        const sets = JSON.parse(body).data.map(set => ({'code': set.code, 'name': set.name}));

        const fields = ['code', 'name'];
        const opts = {fields};
        const parser = new Parser(opts);

        const csv = parser.parse(sets);

        console.log(csv);

        fs.writeFile("sets.csv", csv, err => console.log(err));
     }
})