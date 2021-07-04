const _ = require('lodash');
const fs = require('fs');
const data = require('./json/data')


fs.readFile('./json/colors.json', (err, data) => {
    if (err){
        console.log('err -', err);
        return;
    }
    const keys = JSON.parse(data.toString())
        .map(o =>  _.keys(o)[0]);

    const res_1 = _.filter(keys, k => k.length < 6)
        .sort();

    console.log(res_1);
});

fs.readFile('./json/colors.json', (err, data) => {
    if (err){
        console.log('err -', err);
        return;
    }
    const colors = JSON.parse(data.toString())
        .map((o, i, arr) => ({
            color: _.keys(o)[0], 
            rgb: arr[i][_.keys(o)[0]].slice(0, 3)
        }));
    const res_2 = _.orderBy(colors, ["color"], ["asc"]);

    // console.log(res_2);
});

fs.readFile('./json/users.json', (err, data) => {
    if (err){
        console.log('err -', err);
        return;
    }
    const users = JSON.parse(data.toString());

    const res_3 = _.flow(
        (users) => _.filter(users, u => Number(u.address.geo.lat) < 0),
        (users) => _.map(users, u => ({
            id: u.id,
            city: u.address.city,
        })),
        (users) => _.orderBy(users, ["city"], ["asc"])
    )(users);
    
    // console.log(res_3)
});

fs.readFile('./json/clients.json', (err, data) => {
    if (err){
        console.log('err -', err);
        return;
    }
    const clients = JSON.parse(data.toString()).clients;

    const res_4 = _.flow(
        (clients) => _.filter(clients, u => u.address.city === "Кунгур"),
        (clients) => _.orderBy(clients, ["gender", "age", "name"], ["asc", "desc", "asc"])
    )(clients);

    // console.log(res_4)
});

let res_5 = _
    .sortBy(_
            .zip(data.colors, data.argb)
            .map(arr => _.zipObject(['color', 'hex_name'], arr)),
        a => a.color
    );

    // console.log(res_5)
  