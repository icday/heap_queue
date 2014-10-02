var Queue = require('../index.js');
var should = require('should');

function getRandomArr(len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(random(10000));
    }
    return arr;
}
function random(maxVal) {
    return Math.round(Math.random() * maxVal);
}

var caseNum = 1000;
describe('Priority queue', function() {
    for (var i = 1; i <= caseNum; i++) {
        describe('#case ' + i, function() {
            var arr = getRandomArr(1000);
            var qres = [];
            var q = new Queue();
            q.push(arr);
            while (q.length > 0) {
                qres.push(q.pop());
            }
            arr.sort(function(a, b) {
                return a - b;
            });
            it('should be sorted', function() {
                qres.should.eql(arr);
            });
        });
    }
});
