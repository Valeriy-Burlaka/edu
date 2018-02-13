"use strict";


class Group {
    constructor(iter=[]) {
        this.content = [];
        for (let elem of iter) {this.add(elem)};
    }

    add(value) {
        if (this.content.indexOf(value) < 0) {
            this.content.push(value);
        }
        // "in" is about Array keys, not values;
        // if (!(value in this.content)) {this.content.push(value)};
    }

    has(value) {
        return this.content.indexOf(value) > -1;
    }

    delete(value) {
        if (this.has(value)) {
            this.content.splice(this.content.indexOf(value), 1);
        }
    }

    static from(iter) {
        return new Group(iter);
    }
}


class GroupIterator {
    constructor(group) {
        this.group = group;
        this.index = 0;
    }

    next() {
        if (this.index == this.group.content.length) {
            return {done: true};
        }
        let value = this.group.content[this.index];
        this.index++;
        return {value, done: false};
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
};



function log(v) {console.log(v)};

let g = new Group([1,2]);
log(g);
g.add(1);
log(g);
log(g.has(1));
log(g.has("1"));
log(g.has(3));
g.add("1");
log(g);
g.add("a");
log(g);
log(g.has("a"));
g.add("b");
log(g);
log(g.has(3));
g.delete("a");
log(g);
g.delete("2");
log(g);
log(Group.from([1,2,2,3,3,3,4,"a"]))

for (let member of new Group(["a", "b", "c"])) {
    log(member);
}