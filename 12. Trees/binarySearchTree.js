"use strict";
// Implement
//
//  [x] BinarySearchTree class (BST)
//  [x] add node functionality
//  [x] find node functionality
//  [x] remove node functionality (extra credit)
//
function Node(value) {
    Object.defineProperty(this, 'value', {
        value: value,
        writable: false,
        enumerable: true
    });
    this._left = null;
    Object.defineProperty(this, 'left', {
        get: () => this._left,
        set: node => {
            if ((node instanceof Node) || (node === null)) {
                return this._left = node;
            }
            return false;
        }
    });
    this._right = null;
    Object.defineProperty(this, 'right', {
        get: () => this._right,
        set: node => {
            if ((node instanceof Node) || (node === null)) {
                return this._right = node;
            }
            return false;
        }
    });
}

Node.prototype.insert = function (node) {
    if (node.value < this.value) {
        if (this.left === null) {
            return this.left = node;
        }
        return this.left.insert(node);
    } else if (node.value > this.value) {
        if (this.right === null) {
            return this.right = node;
        }
        return this.right.insert(node);
    } else {
        return false;
    }
}

Node.prototype.find = function (value) {
    if (value === this.value) {
        return this;
    } else if (value < this.value) {
        if (this.left === null) {
            return false;
        }
        return this.left.find(value);
    } else if (value > this.value) {
        if (this.right === null) {
            return false;
        }
        return this.right.find(value);
    } else {
        return false;
    }
};

Node.prototype.remove = function (value) {
    if (value < this.value) {
        if (this.left === null) {
            return false;
        }
        if (value !== this.left.value) {
            return this.left.remove(value);
        }
        var remove = {
            side: 'left',
            target: this.left,
            children: []
        };
    } else {
        if (this.right === null) {
            return false;
        }
        if (value !== this.right.value) {
            return this.right.remove(value);
        }
        remove = {
            side: 'right',
            target: this.right,
            children: []
        };
    }
    if (remove.target.left !== null) {
        remove.children.push(remove.target.left);
    }
    if (remove.target.right !== null) {
        remove.children.push(remove.target.right);
    }
    switch (remove.children.length){
        case 0:
            this[remove.side] = null;    
            return remove.target;
        case 1:
            this[remove.side] = remove.children[0];    
            return remove.target;
        case 2:
            const replace = remove.target.findReplacement();
            replace.parent[replace.side] = replace.child;
            this[remove.side] = replace.target;
            replace.target.left = remove.target.left;
            replace.target.right = remove.target.right;
            return remove.target;
        default:
            return false;
    }
};

Node.prototype.findReplacement = function () {
    const neighborDirection = ['left', 'right'][Math.floor(2 * Math.random())];
    const limitDirection = { left: 'right', right: 'left' }[neighborDirection];
    if (this[neighborDirection][limitDirection] === null) {
        return {
            side: neighborDirection,
            parent: this,
            target: this[neighborDirection],
            child: this[neighborDirection][neighborDirection]
        };
    }
    return this[neighborDirection].findLimit(limitDirection);
};

Node.prototype.findLimit = function (direction) {
    if (this[direction][direction] === null) {
        return {
            side: direction,
            parent: this,
            target: this[direction],
            child: this[direction][{left: 'right', right: 'left'}[direction]]
        };
    }
    return this[direction].findLimit(direction);
};

function BinarySearchTree(root = null) {
    if (!(root instanceof Node)) {
        root = new Node(root)
    }
    this._root = root;
    Object.defineProperty(this, 'root', {
        get: () => this._root,
        set: value => {
            if (!(value instanceof Node) && value !== null){
                value = new Node(value);
            }
            return this._root = value;
        }
    });
}

BinarySearchTree.prototype.insert = function (value) {
    if (!(value instanceof Node)) {
        value = new Node(value);
    }
    return this.root.insert(value);
};

BinarySearchTree.prototype.find = function (value) {
    return this.root.find(value);
};

BinarySearchTree.prototype.remove = function (value) {
    if (value !== this.root.value) {
        return this.root.remove(value);
    } else {
        const remove = {
            target: this.root,
            children: []
        };
        if (this.root.left !== null) {
            remove.children.push(this.root.left)
        }
        if (this.root.right !== null) {
            remove.children.push(this.root.right)
        }
        switch (remove.children.length) {
            case 0:  
                this.root = null;
                return remove.target;
            case 1:
                this.root = remove.children[0];
                return remove.target;
            case 2:
                const replace = remove.target.findReplacement();
                replace.parent[replace.side] = replace.child;
                this.root = replace.target;
                this.root.left = remove.target.left;
                this.root.right = remove.target.right;
                return remove.target;
            default:
                return false;
        }
    }
};

// BEGIN TESTS
let value;

console.log('--INSTANTIATION TESTS--');

const bob = new Node('bob');
value = bob.value;
console.log('bob value: ', value, ' pass: ', value === 'bob');
value = bob.left;
console.log('bob left: ', value, ' pass: ', value === null);
value = bob.right;
console.log('bob value: ', value, ' pass: ', value === null);

const bobTree = new BinarySearchTree(bob);
value = bobTree.root.value;
console.log('bobTree root value: ', value, ' pass: ', value === 'bob');

var nullTree = new BinarySearchTree()
value = nullTree.root.value;
console.log('nullTree root value: ', value, ' pass: ', value === null);

var bst = new BinarySearchTree('start')
value = bst.root.value;
console.log('bst root value: ', value, ' pass: ', value === 'start');

console.log('--INSERTION TESTS--');

value = bst.insert('joe');
console.log('insert root-left value: ', value, ' pass: ', value === bst.root.left);
value = bst.insert('steve');
console.log('insert root-right value: ', value, ' pass: ', value === bst.root.right);
value = bst.insert('andrew');
console.log('insert root-left-left value: ', value, ' pass: ', value === bst.root.left.left);
value = bst.insert('steve');
console.log('insert repeat value: ', value, ' pass: ', value === false);

console.log('--SEARCH TESTS--');

bst.insert('miranda');
bst.insert('josh');
bst.insert('kevin');
bst.insert('erik');
bst.insert('donald');
bst.insert('sean');
bst.insert('kevin');
bst.insert('andres');
bst.insert('joseph');
bst.insert('brian');

value = bst.find('start');
console.log('find "start" node: ', value, ' pass: ', value === bst.root);
value = bst.find('joe');
console.log('find "joe" node: ', value, ' pass: ', value === bst.root.left);
value = bst.find('steve');
console.log('find "steve" node: ', value, ' pass: ', value === bst.root.right);
value = bst.find('andrew');
console.log('find "andrew" node: ', value, ' pass: ', value === bst.root.left.left);
value = bst.find('miranda');
console.log('find "miranda" node: ', value, ' pass: ', value === bst.root.left.right);
value = bst.find('josh');
console.log('find "josh" node: ', value, ' pass: ', value === bst.root.left.right.left);
value = bst.find('kevin');
console.log('find "kevin" node: ', value, ' pass: ', value === bst.root.left.right.left.right);
value = bst.find('erik');
console.log('find "erik" node: ', value, ' pass: ', value === bst.root.left.left.right);
value = bst.find('donald');
console.log('find "donald" node: ', value, ' pass: ', value === bst.root.left.left.right.left);
value = bst.find('sean');
console.log('find "sean" node: ', value, ' pass: ', value === bst.root.left.right.right);
value = bst.find('andres');
console.log('find "andres" node: ', value, ' pass: ', value === bst.root.left.left.left);
value = bst.find('joseph');
console.log('find "joseph" node: ', value, ' pass: ', value === bst.root.left.right.left.left);
value = bst.find('brian');
console.log('find "brian" node: ', value, ' pass: ', value === bst.root.left.left.right.left.left);
value = bst.find('tim');
console.log('find "tim" node: ', value, ' pass: ', value === false);

console.log('--REMOVAL TESTS--');

bst.insert('tim');

value = bst.remove('dan');
console.log('remove "dan" node: ', value, ' pass: ', value === false);
value = bst.remove('steve');
console.log('remove "steve" node: ', value, ' pass: ', bst.find(value.value) === false);
value = bst.remove('donald');
console.log('remove "donald" node: ', value, ' pass: ', bst.find(value.value) === false);
value = bst.remove('joe');
console.log('remove "joe" node: ', value, ' pass: ', bst.find(value.value) === false);
value = bst.remove('joseph');
console.log('remove "joseph" node: ', value, ' pass: ', bst.find(value.value) === false);
value = bst.remove('start');
console.log('remove "start" node: ', value, ' pass: ', bst.find(value.value) === false);
