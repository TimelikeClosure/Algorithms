

// Create an undirected graph
//
//  [X] .containsNode() returns whether the node exists
//  [X] .addNode() adds a new node to the graph
//  [ ] .removeNode() remove the node from the graph, and any connected edges
//  [ ] .containsEdge() returns whether two nodes are connected
//  [ ] .addEdge() creates a connection between two existing nodes
//  [ ] .removeEdge() removes the connection between two nodes
//  [X] .printContents() prints the contents of the graph
//
//  [ ] What is the Big-O time complexity of each function?
//
//
//
//  Extra Credit (not for the faint of heart)
//
//  [ ] You already implemented an adjacency list.  Research adjacency matrix, implement a new graph using it
//  [ ] Research Depth-First Search (DFS).  Implement it with one of the two graphs you wrote.
//      [ ] with the other graph you wrote
//  [ ] Research Breadth-First Search (BFS).  Implement it with one of the two graphs you wrote.
//      [ ] with othe other graph you wrote
//

function Graph() {
  this.node_list = [];
}

function Node(name) {
  this.edge_list = [];
  this.name = name;
}




Array.prototype.contains = function(name) {
  var i = this.length;
  while (i--) {
    if (this[i].name === name) {
      return true;
    }
  }
  return false;
};

Node.prototype.addEdge = function(end) {
  this.edge_list.push(end);
};




Graph.prototype.containsNode = function (node) {
  var list = this.node_list;
  for (var i = 0, list = this.node_list, length = list.length; i < length; i++){
    if (node === list[i].name) {
      return true;
    }
  }
  return false;
};

Graph.prototype.addNode = function (node) {
  if (!this.containsNode(node)) {
    this.node_list.push(new Node(node));
    return true;
  }
  return false;
};

Graph.prototype.removeNode = function(node) {
  //...
};




Graph.prototype.containsEdge = function(start, end) {
  //...
};

Graph.prototype.addEdge = function(start, end) {
  //...
};

Graph.prototype.removeEdge = function(start, end) {
  //...
};


Graph.prototype.printContents = function() {
  console.log(this.node_list);
};




// -------------- TEST -------------

var graph = new Graph();
graph.addNode("start"); if (!graph.containsNode("start")){console.log('Should contain "start"') };
graph.addNode("end"); if (!graph.containsNode("end")){console.log('Should contain "end"') };
graph.addNode("here"); if (!graph.containsNode("here")){console.log('Should contain "here"') };
graph.addNode("there"); if (!graph.containsNode("there")){console.log('Should contain "there"') };
graph.addNode("up"); if (!graph.containsNode("up")){console.log('Should contain "up"') };
graph.addNode("down"); if (!graph.containsNode("down")){console.log('Should contain "down"') };
graph.addNode("left"); if (!graph.containsNode("left")){console.log('Should contain "left"') };
graph.addNode("right"); if (!graph.containsNode("right")){console.log('Should contain "right"') };

graph.addEdge("start", "end");
graph.addEdge("start", "finish");
graph.addEdge("here", "there");
graph.addEdge("up", "down");
graph.addEdge("up", "left");
graph.addEdge("up", "right");

graph.removeEdge("up", "right");
graph.removeNode("up"); if (graph.containsNode("up")){console.log('Should not contain "up"') };

console.log(graph.containsEdge("start", "end"));
console.log(graph.containsEdge("alpha", "omega"));

graph.printContents();
