#Description
A simple priority queue of Javascript.

#Example

    var Queue = require('heap_queue');

    var pq = new Queue(function(a, b) {
        return a - b;
    });

    pq.push([5, 4], [10, 3, 2, 8]);

    pq.push(1, 6, 7, 9);

    // => 10
    console.log(pq.length);

    // 1 2 3 4 5 6 7 8 9 10
    while (pq.length > 0) {
        console.log(pq.pop());
    }
