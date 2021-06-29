import Point from './point';

export default class Node {
  pattes=false;
  okc=false;
  utah=false;
  chicago=false;
  miami=false;
  ny=false;
  seattle=false;
  portland=false;
  hou=false;
  toronto=false;
  lal=false;
  lac=false;
  indiana=false;
  brooklyn=false;
  no=false;
  isVisited;
  isWall;
  isStartNode;
  isEndNode;
  row;
  col;
  distance;
  previousNode;
  inPath = false;

  constructor(
    row,
    col,
    visited = false,
    wall = false,
    startNode: Point = null,
    endNode: Point = null
  ) {
    this.row = row;
    this.col = col;
    this.isVisited = visited;
    this.isWall = wall;
    this.isStartNode = this.matches(startNode, { row, col });
    this.isEndNode = this.matches(endNode, { row, col });
    this.distance = 9999999;
    this.previousNode = null;
  }

  // checks if both the points are same or not
  matches(point1, point2) {
    if (point1 == null) {
      return false;
    }
    if (point1.row === point2.row && point1.col === point2.col) {
      return true;
    }
    return false;
  }

  markAsVisited() {
    this.isVisited = true;
  }

    reset(){
        this.isVisited = false;
        this.previousNode = false;
        this.isWall = false;
        this.previousNode = null;
        this.inPath = false;
        this.isStartNode = false;
        this.isEndNode = false;
        this.distance = 9999999;
    }
}
