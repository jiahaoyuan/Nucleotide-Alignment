var N1 = [null, "T","G","C","T","C","G","T","A"];
var N2 = [null, "T","T","C","A","T","A"];



var path = [
[null, null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null, null]
]
var count = path[0].length-1;

var result = [
[null, null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null, null]
]

var plate = [
[0, -6, -12, -18, -24, -30, -36, -42, -48],
[-6, null, null, null, null, null, null, null, null],
[-12, null, null, null, null, null, null, null, null],
[-18, null, null, null, null, null, null, null, null],
[-24, null, null, null, null, null, null, null, null],
[-30, null, null, null, null, null, null, null, null],
[-36, null, null, null, null, null, null, null, null],
];


var judge = function(i, j){
   if (N2[i]==N1[j])
      return 5;
   else 
      return -2;
};

var max = function(a, b, c){
   if (a>b)
   {
      if (a>c)
         return a;
      else 
         return c;
   }
   else
   {
      if (b>c)
         return b;
      else
         return c;
   }
};




var Score = function(i, j){
   if (plate[i][j]!=undefined)
      return plate[i][j];
      
   else
   {
      plate[i][j] = max(
         (Score(i-1, j-1)+judge(i,j)),
         (Score(i-1, j) -6 ),
         (Score(i, j-1) -6));
         
   return plate[i][j];  
   }
};



var destiny = function(){
   var h;
   var k;
   
   var MAX = plate[plate.length-1][0];
   for (var i=0; i<plate[0].length; i++){
      if (MAX<plate[plate.length-1][i]){
         MAX = plate[plate.length-1][i];
         h = plate.length-1;
         k = i;
      }
   }
      for (var i=0; i<plate.length; i++){
      if (MAX<plate[i][plate.length-1]){
         MAX = plate[i][plate.length-1];
         h = i;
         k = plate.length-1;
      }   
   }
   
   path[0][count]= h;
   path[1][count]=k;
   count--;
   return MAX;
};



var printBoard = function(s) { // display the beginning board
 
  var row;       
  var col;

  
  for (row=1; row<=s.length; row++){
    for(col=1; col<=s[0].length; col++){
      var test = document.getElementById('r'+row+col);
      test.innerHTML = s[row-1][col-1];
      
      }
    }
};

var printResult = function(s) { // display the beginning board
 
  var row;       
  var col;

  
  for (row=1; row<=s.length; row++){
    for(col=1; col<=s[0].length; col++){
      var test = document.getElementById('JN'+row+col);
      test.innerHTML = s[row-1][col-1];
      
      }
    }
};


var findPath= function(i, j){
   var row;
   var col;
   
if(count>-1){

   if (plate[i][j]==plate[i-1][j]-6){
      row = i-1;
      col = j;
   }
   else 
      if (plate[i][j]==plate[i][j-1]-6){
         row = i;
         col = j-1;
      }
      
      else
         if (plate[i][j]==plate[i-1][j-1]+judge(i,j)){
            row = i-1;
            col = j-1;
         }
         
   path[0][count]= row;
   path[1][count]= col;  
   count--;  
   
   findPath(row, col);
   }
};



var getResult = function(){
   var c1 = 0;
   // row
   result[0][c1]= N2[c1];
   c1++;
   
   for (var x = 1; x< path[0].length; x++){
      if (path[0][x]==path[0][x-1])
         result[0][x]="_";
      else{
         result[0][x]= N2[c1];
         c1++;
      }
   }
   
   var c2 = 0;
   // col
   result[0][c2]= N2[c2];
   c2++;
   
   for (var x = 1; x< path[1].length; x++){
      if (path[1][x]==path[1][x-1])
         result[1][x]="_";
      else{
         result[1][x]=N1[c2];
         c2++;
      }
   }
   
   // score
   for (var x=0; x<result[0].length; x++){
   if ((result[0][x]==undefined)||(result[1][x]==undefined))
      result[2][x] = " ";
      else
      if ((result[0][x]=="_")||(result[1][x]=="_"))
         result[2][x] = "-6";
      else
         if (result[0][x]==result[1][x])
            result[2][x]="+5";
         else
            result[2][x]="-2";
   }
};


printBoard(plate);

Score(6,8);

printBoard(plate);


destiny();

findPath(path[0][count+1], path[1][count+1]);



getResult();
printResult(result);