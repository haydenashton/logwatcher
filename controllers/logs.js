var all = [];
var test = [
  {
    '_id': 1,
    'url': 'https://localhost:8081/users',
    'message': 'something happened',
    'stacktrace': 'stuff\nmore stuff',
    'level': 'error',
    'timestamp': Date.now(),
    'app': 'test'
  },
  {
    '_id': 2,
    'url': 'https://localhost:8081/',
    'message': 'bau',
    'level': 'info',
    'timestamp': Date.now(),
    'app': 'test'
  }
];

all = test.concat([
  {
    '_id': 3,
    'url': 'https://example.com',
    'message': 'bad stuff',
    'stacktrace': 'other stuff\nlots more stuff',
    'level': 'error',
    'timestamp': Date.now(),
    'app': 'example'
  }
]);

module.exports.index = function(req, res, next) {
  res.json(all);
};


module.exports.getByName = function(req, res, next) {
  res.json(test);
};
