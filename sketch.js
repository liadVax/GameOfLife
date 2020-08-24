/////////////global vars////////////

let rows;
let cols;
let resSize=20;
let grid;
let offset=10;
let start;

/////////////util functions////////////

//create matrix 
function create2DArray(rows,cols){
  let arr=new Array(cols);
  for(let i=0;i<cols;i++)
      arr[i]=new Array(rows);
  return arr;
}

//updates the new states on cpyGrid and looking on the old states in grid ,returns cpyGrid
function nextGen(){
  let count=0;
   let cpyGrid=create2DArray(rows,cols);
   for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      let neighbors=0;
      let currState=grid[i][j];
      neighbors=neighborsCount(i,j,grid);
      if(currState == 0 && neighbors == 3){
         cpyGrid[i][j]=1;
      }
      else if(currState == 1 &&(neighbors <= 1||neighbors >= 4)){
        cpyGrid[i][j]=0;
      }else{
        cpyGrid[i][j]=currState;
      }
      count++;
    }
  }
  return cpyGrid;
}

//count the number of alive neighbors around a cell
function neighborsCount(x,y,grid){
  let cnt=0;
  for(i=-1;i<2;i++){
    for(j=-1;j<2;j++){
      let col=(x+i+cols)%cols;
      let row=(y+j+rows)%rows;
      cnt+=grid[col][row];
      }
    }
  cnt-=grid[x][y];//counting ourselves as neighbor
  return cnt;
}

//draw a cell
function drawCell(i,j,state){
    let x=i*resSize;
    let y=j*resSize;
    if(state==1){//cell alive fill with (x,y) color
      fill(x/2,y/2,100);
    }
    else
      fill(255);//cell dead fill white
    stroke(60);
    strokeWeight(2);
    rect(x,y,resSize,resSize);
  }

/////////////butoons functions////////////

//give to every cell in the grid a state (alive/dead) with probability 1/3=alive 2/3=dead  
function randomGrid(){
  start=false;
  button2.html('Start');
    for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      let state=floor(random(3));
      if(state == 0||state==1)
        grid[i][j]=0;
      else
        grid[i][j]=1;
    }
    }
}

//start the simulation
function switchStart(){
  start=!start;
  if(start)
    button2.html('Stop');
  else
    button2.html('Start');
}

//give to every cell in the grid state=0 (dead)
function clearFunc(){
  start=false;
  button2.html('Start');
    for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      grid[i][j]=0;
    }
  } 
}

/////////////main functions////////////

//change the pressed cell state
function mousePressed(){
     for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      let x=i*resSize;
      let y=j*resSize;
      if(mouseX>x && mouseX<x+resSize && mouseY>y && mouseY<y+resSize){
        grid[i][j]=abs(grid[i][j]-1);
      }
    }
   }
}

function setup() {
  createCanvas(800, 600);
  start=false;
  button1 = createButton('Random');
  button1.position(floor(width/2)-button1.width, height+offset);
  button1.mousePressed(randomGrid);
  
  button2 = createButton('Start');
  button2.position(button1.width+button1.x+offset, height+offset);
  button2.mousePressed(switchStart);
  
  button3 = createButton('Clear');
  button3.position(button2.width+button2.x+offset, height+offset);
  button3.mousePressed(clearFunc);
  
  button3 = createButton('Clear');
  button3.position(button2.width+button2.x+offset, height+offset);
  button3.mousePressed(clearFunc);
  
  
  cols=floor(width/resSize);
  rows=floor(height/resSize);
  grid=create2DArray(rows,cols);
  clearFunc();
}


function draw() {
  background(0);
  frameRate(7);
   for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      drawCell(i,j,grid[i][j]);
    }
  }
  if(start==true)
     grid=nextGen();
}
