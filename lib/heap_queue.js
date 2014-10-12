'use strict';
function PriorityQueue(cmp/*...items...*/) {
    var _queue = [],
    _cmp = cmp || function(a, b) {
        return a - b;
    };

    this.top = function() {
        return _queue[0];
    };

    this.pop = this.shift = function() {
        return _pop(_queue, _cmp);
    };

    this.push = function() {
        var args = Array.prototype.slice.call(arguments),
            list = [],
            ret = 0;

        args.forEach(function(arg) {
            if (Array.isArray(arg) && arg.length > 0) {
                list = list.concat(arg);
            } else if (!Array.isArray(arg)) {
                list.push(arg);
            }
        });

        list.forEach((function(item) {
            ret = _push(_queue, item, _cmp);
        }).bind(this));

        return ret;
    };

    this.__defineGetter__('length', function() { return _queue.length;});

    if (arguments.length > 1) {
        this.push.apply(this, Array.prototype.slice.call(arguments, 1));
    }
}

var _push = function(q, item, cmp) {
    q.push(item);
    _moveUp(q, cmp);
    return q.length;
};

var _pop = function(q, cmp) {
    var length = q.length,
        last = length - 1;
    if (length === 0) {
        return undefined;
    }
    var ret = q[0];
    q[0] = q[last];
    q.length = last;
    _moveDown(q, cmp);

    return ret;
};

function _moveDown(q, cmp) {
    var last = q.length - 1,
        p = 0,
        c = 1;
    if (last === 0) {
        return;
    }
    while (p <= last) {
        c = _firstChild(p);
        var c2 = c + 1,
            s = c2 > last ? c : (cmp(q[c], q[c2]) > 0 ? c2 : c);
        if (s <= last && cmp(q[p], q[s]) > 0) {
            _swap(q, s, p);
            p = s;
        } else {
            break;
        }
    }
}

function _firstChild(p) {
    return ((p + 1) << 1) - 1;
}

function _parent(c) {
    return (c - 1) >> 1;
}

function _moveUp(q, cmp) {
    var last = q.length - 1,
        p,
        c = last;
    while (c >= 0) {
        p = _parent(c);
        if (cmp(q[p], q[c]) > 0) {
            _swap(q, c, p);
            c = p;
        } else {
            break;
        }
    }
};

function _swap(q, i, j) {
    var tmp = q[i];
    q[i] = q[j];
    q[j] = tmp;
};

module.exports = PriorityQueue;
