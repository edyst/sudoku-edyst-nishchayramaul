const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3---",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];
  
  
  var currentCell;
  var difficulty_level = easy[0];
  var difficulty = 1;
  let answer;
  
 
  var easyBtn=query("#easy-level");
  
  window.onload = function () {
      easyBtn.style.border="2px solid blue";
      startSudoku();
  }
  
  function checkNum(event){
    return event.keyCode>=49 && event.keyCode<=57;
  }
  function switchDifficultyLevel(num) {
    switch(num)
    {
        case 1 : difficulty_level = easy[0];
                  break;
        case 2 : difficulty_level = medium[0];
                 break;
        case 3 : difficulty_level = hard[0];
                  break;
        default: difficulty_level = easy[0];
    }
    difficulty = num;
    easyBtn.style.border="";
    for(let i=1;i<=81;i++){
        getId(i).classList.remove("instance");
    }
    
    startSudoku();
  }
  
  function startSudoku(){
    clearCells();
    let gameBoard;    
    gameBoard = difficulty_level;    
    generateBoard(gameBoard); 
  }

  function generateBoard(gameBoard) {
    
    clearCells();
    clearDisableInput();
  
    if (gameBoard == easy[0]) {
      answer = easy[1];
    }
    if (gameBoard == medium[0]) {
      answer = medium[1];
    }
    if (gameBoard == hard[0]) {
      answer = hard[1];
    }
    clearIncorrect();
  
    for(var i=0;i<81;i++)
      {
        let x=gameBoard.charAt(i);
        if(x!="-"){   
                getId((i+1)).value= x;
                getId((i+1)).disabled = true;
                getId("cell-"+(i+1)).classList.add("disable");
                getId(i+1).classList.remove("input-text");
                higlightedArea();
            }
        else{
              getId(i+1).setAttribute("onkeyup","checkInput()");
              getId(i+1).addEventListener("keyup",(event)=>{
                instances(event);
              })
              getId(i+1).addEventListener("keydown",(event)=>{
                removeInstance(event);
              })
              
            }
      }
  }
  
  function instances(event){
      let val=event.target.value;
      for(let i=1;i<=81;i++)
      {
        if(val==getId(i).value && getId(i).value!="")
        {
          getId(i).classList.add("instance");
        }
      }
  }
  function removeInstance(event){
    for(let i=1;i<=81;i++){
        if(event.keyCode==8){
          getId(i).classList.remove("instance");
        }
    }
  }
  function clearCells() {
    for(let i=1;i<=81;i++)
    {
      getId(i).classList.remove("highlight","incorrect");
      getId(i).value="";
    }
  }
  function higlightedArea() {
    for (let j = 1; j <= 81; j++) {
      getId(j).classList.remove("highlight","current-cell");
    }
  }
  function clearDisableInput()
  {
    for(var i=1;i<=81;i++)
    {
        getId(i).disabled=false;
       
    }
  }
  
  
  const onClick = function () {
    let y = this.id;
  
    higlightedArea(); 
    for(let i=1;i<=81;i++){
      getId(i).classList.remove("instance");
    }
    getId(y).classList.add("current-cell"); 
    
    
  
  
    // Higlighting rows and columns of the celected cell
    for (let q = 0; q < 81;) {
      let c = y % 9;
      if (c == 0) { c = 9; }
      let e = q + c;
      getId(e).classList.add("highlight");
      q = q + 9;
      for (let x = 1; x <= 81; x++) {
        for (i = 0; i < 9; i++) {
          let j = i + 1;
          if (y / 9 > i && y / 9 <= j && x / 9 > i && x / 9 <= j) {
            getId(x).classList.add("highlight");
          }
        }
      }
    }
  
    // (function for selecting 3x3 grid)
    box(y);
    
      //getId(y).classList.remove("current-cell");
  
  }
  for (let l = 1; l <= 81; l++) {
    getId(l).onclick = onClick;
  }


 
  function clearIncorrect() {
    for (let j = 1; j <= 81; j++) {
      getId(j).classList.remove("incorrect");
    }
  }
function sudokuSolver(){
    var s=0;
    for(var i=1;i<=81;i++)
      {
        getId(i).value=answer.charAt(s);
        s++;
                   
      }
}
  function box(y) {
    for (let i = 1; i <= 81; i++) {
      let d = y % 9;
      let s = i % 9;
      if (d == 1 || d == 2 || d == 3) {
        if (s == 1 || s == 2 || s == 3) {
          if (y <= 21 && i <= 21) {
            getId(i).classList.add("highlight");
          }
          else if (y > 21 && y <= 48 && i > 21 && i <= 48) {
            getId(i).classList.add("highlight");
          }
          else if (y > 48 && y <= 75 && i > 48 && i <= 75) {
            getId(i).classList.add("highlight");
          }
        }
      }
      if (d == 4 || d == 5 || d == 6) {
        if (s == 4 || s == 5 || s == 6) {
          if (y <= 24 && i <= 24) {
            getId(i).classList.add("highlight");
          }
          else if (y > 24 && y <= 51 && i > 24 && i <= 51) {
            getId(i).classList.add("highlight");
          }
          else if (y > 51 && y <= 78 && i > 51 && i <= 78) {
            getId(i).classList.add("highlight");
          }
        }
      }
      if (d == 7 || d == 8 || d == 0) {
        if (s == 7 || s == 8 || s == 0) {
          if (y <= 27 && i <= 27) {
            getId(i).classList.add("highlight");
          }
          else if (y > 27 && y <= 54 && i > 27 && i <= 54) {
            getId(i).classList.add("highlight");
          }
          else if (y > 54 && y <= 81 && i > 54 && i <= 81) {
            getId(i).classList.add("highlight");
          }
        }
      }
    }
  }
  
  function checkRow() {
    for (let x = 1; x <= 81; x++) {
      for (let y = 1; y <= 81; y++) {
        if ((x % 9 == y % 9) && x != y) {
          if (getId(x).value == getId(y).value) {
            getId(x).classList.add("incorrect");
            getId(y).classList.add("incorrect");
          }
        }
      }
    }
  }
  
  function checkColumn() {
    for (let x = 1; x <= 81; x++) {
      for (let y = 1; y <= 81; y++) {
        for (let i = 0; i < 9; i++) {
          let j = i + 1;
          if (x / 9 <= j && y / 9 <= j && x / 9 > i && y / 9 > i && x != y) {
            if (getId(x).value == getId(y).value) {
              getId(x).classList.add("incorrect");
              getId(y).classList.add("incorrect");
            }
          }
        }
      }
    }
  }
  function checkBox(){
    let val="";
    var idx=[];
    var a=0;
    for(var i=1;a<3;i+=9)
      {
        a++;
        if((getId(i).value)!=""){
        val+=getId(i).value;
        idx.push(i);    
    }
      else{
      val+="-";
      idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
      
      //2nd box
       val="";
    var idx=[];
    var a=0;
      for(var i=4;a<3;i+=9)
      {a++;
        if((getId(i).value)!=""){
      val+=getId(i).value;
    idx.push(i);    
    }
      else{
      val+="-";
    idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
      //3rd box
      val="";
    var idx=[];
    var a=0;
      for(var i=7;a<3;i+=9)
      {a++;
        if((getId(i).value)!=""){
      val+=getId(i).value;
    idx.push(i);    
    }
      else{
      val+="-";
    idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
//4th box
val="";
    var idx=[];
    var a=0;
      for(var i=28;a<3;i+=9)
      {a++;
        if((getId(i).value)!=""){
      val+=getId(i).value;
    idx.push(i);    
    }
      else{
      val+="-";
    idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
      //5th box
      val="";
    var idx=[];
    var a=0;
      for(var i=31;a<3;i+=9)
      {a++;
        if((getId(i).value)!=""){
      val+=getId(i).value;
    idx.push(i);    
    }
      else{
      val+="-";
    idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
      //6th box//
      val="";
    var idx=[];
    var a=0;
      for(var i=34;a<3;i+=9)
      {a++;
        if((getId(i).value)!=""){
      val+=getId(i).value;
    idx.push(i);    
    }
      else{
      val+="-";
    idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
      //7th box//
      val="";
    var idx=[];
    var a=0;
      for(var i=55;a<3;i+=9)
      {a++;
        if((getId(i).value)!=""){
      val+=getId(i).value;
    idx.push(i);    
    }
      else{
      val+="-";
    idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
//8th box//
val="";
    var idx=[];
    var a=0;
      for(var i=58;a<3;i+=9)
      {a++;
        if((getId(i).value)!=""){
      val+=getId(i).value;
    idx.push(i);    
    }
      else{
      val+="-";
    idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
      //9th box//
      val="";
    var idx=[];
    var a=0;
      for(var i=61;a<3;i+=9)
      {a++;
        if((getId(i).value)!=""){
      val+=getId(i).value;
    idx.push(i);    
    }
      else{
      val+="-";
    idx.push(i) ; 
    }
    if((getId(i+1).value)!=""){
      val+=getId(i+1).value;
    idx.push(i+1);    
    }
      else{
      val+="-";
    idx.push(i+1) ; 
    }
    if((getId(i+2).value)!=""){
      val+=getId(i+2).value;
    idx.push(i+2);    
    }
      else{
      val+="-";
    idx.push(i+2) ; 
    }
   
      }
     
      
    for(var j=0;j<val.length;j++)
     {
       var check=val[j];
       if(check=="-")
       continue;
       for(var k=0;k<val.length&&k!=j;k++)
       {
           if(val[k]==check)
           {console.log(idx[j],idx[k]);
          
            getId(idx[j]).classList.add("incorrect");
            getId(idx[k]).classList.add("incorrect");
           }
       }
      }
  }
  function checkInput() {
    clearIncorrect();
    checkRow();
    checkColumn();
    checkBox();
  }
  
  
  
  function validate() {
    let count=0;
    for (let i=0; i<81;i++){
      if(answer.charAt(i) == getId(i+1).value){
        count++;
      }
    }
    
    if(count==81){
      alert("Yes! Great Work ");
      clearCells();
      clearDisableInput();
    }
    else 
        alert("Something Incorrect!! Try Again");


  }
  
  
  
  //helper functions/
  function getId(id) {
    return document.getElementById(id);
  }
  function query(selector) {
    return document.querySelector(selector);
  }
  function queryAll(selector) {
    return document.querySelectorAll(selector);
  }