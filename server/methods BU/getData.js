const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

const config = {
  page: 1,
  perPage: 100,
  sortBy: 'location_country',
  sortDir: 'desc',
  filters: [
    { field: 'location_city', value: '' },
    { field: 'location_country', value: '' }
  ]
};

const getData = function(next) {
  gb.companies.list(config, (err, res, json) => {
    let companies = [];
    if (err) {
      next(err);
    } else {
      for (var result of json.results) {
        if (result.location_address != 'null' && result.location_country != 'null' && result.location_city != 'null') {
          companies.push(result);
          // console.log(result.location_country, result.name)
        }
      }
      next(null, companies);
    }
  });
};

var second = 1000
var minute = 60 * second
var hour = 60 * minute
var day = 24 * hour

module.exports = [
  {
    name: 'getData',
    method: getData
  }
]