import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import Point from '../../interfaces/point';
import Node from '../../interfaces/node';
import DjikstraAlgrothim from '../../services/djikstraAlgorithm.service';
import { MessageService } from '../../services/message.service';
import { NodeComponent } from '../node/node.component';
import { Action, Algorithm } from '../../interfaces/actions';
import { HttpClient } from "@angular/common/http";
import { ngfModule, ngf } from "angular-file";

import * as fileSaver from 'file-saver';
//var FileSaver = require('file-saver');

@Component({
  selector: 'gv-graph-visaulizer',
  templateUrl: './graph-visaulizer.component.html',
  styleUrls: ['./graph-visaulizer.component.scss'],
})
export class GraphVisaulizerComponent implements OnInit {
  rows: number = 10;
  cols: number = 13;
  html: string = '';
  somme;
 
  isClicked: boolean = false;
  map:any;
  test:any;
  postiony;
   matriceIsWall:any;
   items: any = [];
   products:any =[];

  avalilableAlgos: Array<Algorithm> = [
    { name: 'Djikstra', isSelected: true },
    { name: 'A*', isSelected: false },
  ];

  actions: Array<Action> = [
    {
      name: 'Guidez moi',
      action: () => {
        this.start();
      },
    },
    {
      name: 'Initialiser',
      action: () => {
        this.Reset();
      },
      
    },
    {
      name: 'Ma localisation ',
      action: () => {
        this.poistion();
      },
    }
    
    /*
    {
      name: 'Download',
      action: () => {
        this.Download();
      },
      
    }*/
  ];

  nodes: Array<Array<Node>> = [];
/*
  startNode: Point = { row: 13, col: 4 };
  endNode: Point = { row: 13, col: 44 };
  */

 startNode: Point ;
 endNode: Point ;
  @ViewChildren('node') mycomponents: QueryList<any>;

  constructor(
    private ref: ChangeDetectorRef,
    private messageService: MessageService,
    private httpClient: HttpClient,

  ) {
    this.somme = localStorage.getItem("total");
    this.httpClient.get("http://35.225.20.174:3000/getposition")
    .subscribe(data =>{
      
      console.log(data);
      this.test=data;
      console.log(this.test.x);

      // this.startNode = { row: data[0].y, col: data[0].x};
      this.startNode = { row: this.test.y, col:this.test.x};

       console.log(this.startNode);

       this.CreateNodes();
       let stNd: Node = this.getNode(this.startNode);
       stNd.isStartNode = true;
        this.startNode = stNd;

     });
  }

  InitializeStartEndNodes() {
  
     // this.startNode = { row: 12, col:9};
 
      //this.endNode = { row: 3, col: 2 };
    let stNd: Node = this.getNode(this.startNode);
   stNd.isStartNode = true;
    this.startNode = stNd;
    
    let enNd = this.getNode(this.endNode);
    
    enNd.isEndNode = true;
    this.endNode = enNd;
    

  }

  ngOnInit() {
    this.getproducts();
     this.getAll();
  }

  /**
   * The user has released the mouse button.
   * @param event Event Object
   */
  
  MouseUp(event: Event) {
  /*  this.messageService.MouseRelease();
    event.preventDefault();
    event.stopPropagation();
  */
  }
  

  /**
   * The user has clicked on the board
   * @param event Event Object
   */
  
  MouseDown(event: Event) {
  /*  this.messageService.MouseClicked();
    event.preventDefault();
    event.stopPropagation();*/
  }

  Drop(event) {
    let previousNode: Node = event.previousNode;
    let newNode: Node = event.newNode;
    console.log(previousNode, this.endNode);
    //handle if the node was startnode
    if (previousNode.isStartNode && !newNode.isEndNode) {
      console.log(previousNode, this.endNode);
      let { row, col } = previousNode;
      this.nodes[row][col].isStartNode = false;
      previousNode.isStartNode = false;
      this.nodes[newNode.row][newNode.col].isStartNode = true;
      this.startNode = this.nodes[newNode.row][newNode.col];

      //handle of the node was endNode
    } else if (previousNode.isEndNode && !newNode.isStartNode) {
      let { row, col } = previousNode;
      this.nodes[row][col].isEndNode = false;
      previousNode.isEndNode = false;
      this.nodes[newNode.row][newNode.col].isEndNode = true;
      this.endNode = this.nodes[newNode.row][newNode.col];
    }

    // [2D => 1D] -> index =  row * totalelemsInRow + Col;
    // this.RunChangeDetector('single' , previousNode.row * this.cols + previousNode.col  );
    // this.RunChangeDetector('single' , newNode.row * this.cols + newNode.col  );
    console.log('here');
    this.RunChangeDetector();
  }

  /**
   * This handler invokes the action on an actions object
   * @param action the action object depending on which we will take action.
   */
  ActionTakenHandler(action: Action) {
    action.action();
  }

  /** fetches a node from grid on the basis of same row and column */
  getNode(point): Node {
    for (const row of this.nodes) {
      for (const node of row) {
        if (node.row === point.row && node.col === point.col) {
          return node;
        }
      }
    }
  }

  /**
   * Creates Nodes for each grid row and cols
   */
  CreateNodes() {
  /*  for (let i = 0; i < this.rows; i++) {
      const cols: Array<Node> = [];
      for (let j = 0; j < this.cols; j++) {
          
        cols.push(new Node(i, j, false, false, this.startNode, this.endNode));
      
    }
      this.nodes.push(cols);
    }

   */
 /*
 this.httpClient.get("assets/file.txt").subscribe(data =>{
    this.test=data;
    console.log(this.test[0][0].isWall);
    const col: Array<Node> = [];

     //console.log("bbbb",this.test);
     for (let i = 0; i < this.rows; i++) {
      const col: Array<Node> = [];

      for (let j = 0; j < this.cols; j++) {
       // 
         col.push(new Node(i, j, false, this.test[i][j].isWall, this.startNode, this.endNode));
         // this.nodes[i][j].isWall=true;
        
      //}



      }
      this.nodes.push(col);

    }
  });
 // console.log("testteqst",this.matriceIsWall[0][0].isWall);
 */

      
    /*  
    for (let i = 0; i < this.rows; i++) {
      const cols: Array<Node> = [];
      for (let j = 0; j < this.cols; j++) {
       // let x = this.map[i][j];
        //console.log("dddddd",x.isWall);
        cols.push(new Node(i, j, false,  this.map[i][j].isWall, this.startNode, this.endNode));
      }       
     
      this.nodes.push(cols);
    }
    */
   /*this.httpClient.get("assets/file.txt").subscribe(data =>{
  console.log(data);
   this.test=data;
  });
  console.log(this.test);
  */
  for (let i = 0; i < this.rows; i++) {

    const cols: Array<Node> = [];
    for (let j = 0; j < this.cols; j++) {
    if (i == 0 || j == 0 || i == this.rows-1 || j == this.cols-1 ||((i >= 2 && j>2 && j<4 && i<=7)) || ((i >=2 && j>5 && j<7 && i<=7))  || ((i >=2 && j>8 && j<10 && i<=7))){
      cols.push(new Node(i, j, false, true, this.startNode, this.endNode));
  }else if(i>=2 && i<=3){
    cols.push(new Node(i, j, false, false, this.startNode, this.endNode));
    if( j>0 && j<3){
      cols[j].pattes=true;
     }
    if( j>3 && j<6){
     cols[j].utah=true;
    }
    if( j>6 && j<9){
      cols[j].chicago=true;
     }
     if( j>9 && j<12){
      cols[j].utah=true;
     }
     
  }else if(i>=4 && i<=5){
    cols.push(new Node(i, j, false, false, this.startNode, this.endNode));
    if( j>0 && j<3){
      cols[j].seattle=true;
     }
    if( j>3 && j<6){
     cols[j].ny=true;
    }
    if( j>6 && j<9){
      cols[j].hou=true;
     }
     if( j>9 && j<12){
      cols[j].chicago=true;
     }
    
  }else if(i>=6 && i<=7){
      cols.push(new Node(i, j, false, false, this.startNode, this.endNode));
      if( j>0 && j<3){
        cols[j].chicago=true;
       }
      if( j>3 && j<6){
       cols[j].lac=true;
      }
      if( j>6 && j<9){
        cols[j].portland=true;
       }
       if( j>9 && j<12){
        cols[j].portland=true;
      }
      
  }
  
  else{
    cols.push(new Node(i, j, false, false, this.startNode, this.endNode));

  }
}
  

    this.nodes.push(cols);
   }
  
  
}


  /**
   * CORE Of the component
   * this is the main part it runs the selected algorithm on the nodes currently only
   * works for djikstra wthis function will evolve as application evolves.
   * Currently it does following things
   * 1. Run the algo and obtain the final result which will be a set of nodes that will be visited.
   * 2. Once we have obtained the nodes which need to be modified we go through all the node components
   * which we have stored in the mycomponents and run the change detector on them. We also use setTimeout function
   * so to create a aesthetic effect.
   * 3. Then we iterate over again and try to contruct the path by looking at the previousNode Property. We use set
   * timeout to animate this also.
   */
  start() {
    // this.RunChangeDetector();

    //initialize the algorithm
    const dj = new DjikstraAlgrothim();

    //run algorithm and get visited nodes
    const visitedNodes = dj.start(this.nodes, this.startNode, this.endNode);

    //run change detection to create animated effect
    
 
    for (let i = 0; i < visitedNodes.length; i++) {
      this.mycomponents.forEach((cmp: NodeComponent) => {
        if (cmp.node == visitedNodes[i]) {
          setTimeout(() => {
            cmp.runChangeDetector();
          }, 5 * i);
        }
      });
    }
    let lastnode = visitedNodes[visitedNodes.length - 1];
    while (lastnode != null) {
      lastnode.inPath = true;
      
      lastnode = lastnode.previousNode;
    }

    let totalTime = 5 * (visitedNodes.length - 1);

    //update the nodes to reflect the shortest path
    setTimeout(() => {
      let i = 0;
      this.mycomponents.forEach((cmp: NodeComponent) => {
        setTimeout(() => {
          cmp.runChangeDetector();
        }, i * 2);
        i += 1;
      });
    }, totalTime);
  }

  /**
   * Resets the Board and restore it to its inital position;
   */
  Reset() {
    
    /*for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.nodes[i][j].reset();
      }
    }
    */
   this.httpClient.get("assets/test.json").subscribe(data =>{
    this.map=data;
    console.log(this.map);
   });
   for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.nodes[i][j].reset();
     // if (i == 0 || j == 0 || i == this.rows-1 || j == this.cols-1 || (i == 2 && j>17 && j<24)||(i == 20 && j>17 && j<24)|| (j == 23 && i>2 && i<20)||(j == 18 && i>2 && i<20)      || (i == 2 && j>27 && j<34)||(i == 20 && j>27 && j<34)|| (j == 33 && i>2 && i<20)||(j == 28 && i>2 && i<20)           || (i == 2 && j>37 && j<44)||(i == 20 && j>37 && j<44)|| (j == 43 && i>2 && i<20)||(j == 38 && i>2 && i<20)    || (i == 2 && j>7 && j<14)||(i == 20 && j>7 && j<14)|| (j == 13 && i>2 && i<20)||(j == 8 && i>2 && i<20)){
       // this.nodes[i][j].isWall=true;
      
    //}
    this.nodes[i][j].isWall= this.map[i][j].isWall;

    }
  }
 

    this.InitializeStartEndNodes();

    let newNodes = [];
    for (let i = 0; i < this.rows; i++) {
      newNodes.push([...this.nodes[i]]);
    }
   // delete this.nodes;
    this.nodes = newNodes;

    //run change detector to update the nodes
    
  this.RunChangeDetector();
  
  

  }
  Download() {
    var blob = new Blob([JSON.stringify(this.nodes)],{ type: 'text/json; charset=utf-8' });
			//window.open(url);
			//window.location.href = response.url;
			fileSaver.saveAs(blob, 'test.json');

   /* var blob = new Blob([JSON.stringify(this.nodes)], { type: "text/plain;charset=utf-8" });
    console.log(this.nodes);
  FileSaver.saveAs(blob, "file.txt");
  */
    /*
    var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "hello world.txt");
    */
  }
  //runs the change detection over all the node components to update them.
  //or on a given index.
  RunChangeDetector(type = 'all', index?) {
    if (type == 'all') {
      console.log('her');
      let toRun = [];
      this.mycomponents.forEach((cmp: NodeComponent) => {
        toRun.push(cmp.runChangeDetector());
      });
      Promise.all(toRun);
    }
  }
   
  getproducts(){
    this.httpClient.get("http://35.225.20.174:3000/getListe")
    .subscribe(data =>{
      console.log("dataproduits",data);
      
      this.items = data;    
    });

  }
  getAll(){
    this.httpClient.get("http://35.225.20.174:3000/getallproducts")
    .subscribe(data =>{
      console.log("alllproduits",data);
      
      this.products = data;    
    });

  }
  getpostion(x,y){
/*console.log("datax",x);
console.log("datay",y);




    
      this.nodes[3][7].isEndNode = true;
      this.endNode = this.nodes[3][3];
this.RunChangeDetector();
*/
/*
let previousNode: Node;
let newNode: Node ;

      this.nodes[x][y].isEndNode = false;
      previousNode.isEndNode = false;
      this.nodes[newNode.row][newNode.col].isEndNode = true;
      this.endNode = this.nodes[newNode.row][newNode.col];
      console.log('here');
    this.RunChangeDetector();
    */
  
   this.endNode = { row: x, col: y };
   let enNd = this.getNode(this.endNode);
    
    enNd.isEndNode = true;
    this.endNode = enNd;
this.RunChangeDetector();
  }
  poistion(){
    this.httpClient.get("http://35.225.20.174:3000/getposition")
    .subscribe(data =>{
      
      console.log(data);
      this.test=data;
      console.log(this.test.x);

      // this.startNode = { row: data[0].y, col: data[0].x};
      this.startNode = { row: this.test.y, col:this.test.x};

       console.log(this.startNode);

       this.CreateNodes();
       this.InitializeStartEndNodes();

     });
  }

}
