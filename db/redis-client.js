const redis = require('redis');
//* connect to redis
const client = redis.createClient();
client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
    throw new Error('REDIS ERROR');
});

//! Some redis test
/* client.set('my test key', JSON.stringify({ 1: 1, 2: 2, 3: 3 }), redis.print);
client.get('my test key', function (error, result) {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log('GET result ->' + JSON.parse(result)['2']);
  }); */

module.exports = client;