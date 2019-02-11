

/* 
    A 4x4 table (including the header row)
    The top row should be a header row with header cells
    The 4 header cells, from left to right should say "Header 1", "Header 2" ... "Header 4
    The non header cells should contain their position. 
    The upper left cell should contain the text "1, 1", 
    the cell to its right "1, 2", the cell below it "2, 1" and so on.
*/


// Citing source on how to create a table from stack overflow
// https://stackoverflow.com/questions/14643617/create-table-using-javascript

function generateTable()
{
    var body = document.getElementsByTagName("body")[0]; 

    var tbl =  document.createElement("table");
    
    var tblBody = document.createElement("tbody");   

    for(var i = 0; i < 4; i++)
    {
        var createNewRow = document.createElement("tr");

        for (var j = 0; j < 4; j++)
        {
            if (i == 0)
            {
                var tblHead = document.createElement("th");
                var tableHeadText   = document.createTextNode("Header " + (j + 1));
                tblHead.append(tableHeadText);
                createNewRow.appendChild(tblHead);
            }

            else
            {
                var regularCell = document.createElement("td");  
                var regularCellText = document.createTextNode((i) + ', ' + (j + 1));     
                regularCell.appendChild(regularCellText);    
                createNewRow.appendChild(regularCell);          
            }
        }

        tblBody.appendChild(createNewRow); 
    }
    
    tbl.appendChild(tblBody);
    body.appendChild(tbl);                       
    tbl.setAttribute("border", "4px");         
}


/*
This criterion is linked to a Learning Outcome the form: 4 directional buttons (up, down, left right)
•	‘selected’ section moves with the buttons pushing ---- 0.5 point each (2 points in total) 
•	If you are already on the top row and hit 'up' nothing should happen 
        (you should not be able to move into the header cells). 
        Likewise if you are all the way right and hit right or all the way at the bottom and hit down 
        ---- 0.5 point each (2 points in total)
*/


function upMove()
{
    current = document.getElementById("this");            
    if(current.parentNode.rowIndex <= 1)                  
    { 
        return;                                             
    }
    var holder = current.cellIndex;                      
    current.style.borderWidth = "1px";    
    current.removeAttribute("id");                        
    current = current.parentNode;
    current = current.previousElementSibling;
    current = current.firstElementChild;                  
    for(var i =0; i < holder; i++)                        
    {                         
        current = current.nextElementSibling;
    }
    current.style.borderWidth = "8px";                   
    current.id = "this";   

}

function downMove(){
    current = document.getElementById("this"); 
    if(current.parentNode.rowIndex == 3)                        
    { 
      return;
    }
    var holder = current.cellIndex; 
    current.style.borderWidth = "1px"; 
    current.removeAttribute("id"); 
    current = current.parentNode;
    current = current.nextElementSibling;
    current = current.firstElementChild;                 
    for(var i = 0; i < holder; i++)
    { 
      current = current.nextElementSibling;
    }
    current.style.borderWidth = "8px";
    current.id = "this"; 
  }

function leftMove(){
    current = document.getElementById("this"); 
    if(current.cellIndex == 0)                        
    { 
      return;
    }
    current.style.borderWidth = "1px"; 
    current.removeAttribute("id"); 
    current = current.previousElementSibling; 
    current.style.borderWidth = "8px"; 
    current.id = "this"; 
  }


function rightMove(){
    current = document.getElementById("this"); 
    if(current.cellIndex == 3)                        
    { 
      return;
    }
    current.style.borderWidth = "1px"; 
    current.removeAttribute("id"); 
    current = current.nextElementSibling; 
    current.style.borderWidth = "8px"; 
    current.id = "this"; 
  }

/*
This criterion is linked to a Learning Outcome The form: A button labeled "Mark Cell"
•	Hitting the "Mark Cell" button should permanently change the background of the selected cell to yellow 
        ---- 0.5 point 
•	This should persist even after other cells are selected or marked ---- 0.5 point
*/

function markCell(){
    current = document.getElementById("this");      
    current.style.backgroundColor = "yellow";      
}



    //  UP
    var upButton = document.createElement("button");      
    upButton.id = "up";
    var upButtonText = document.createTextNode("Up");
    upButton.appendChild(upButtonText);
    document.body.appendChild(upButton);  

    //  DOWN
    var downButton = document.createElement("button");    
    downButton.id = "down";
    var downButtonText = document.createTextNode("Down");
    downButton.appendChild(downButtonText);
    document.body.appendChild(downButton);

    //  LEFT
    var leftButton = document.createElement("button");     
    leftButton.id = "left";
    var leftButtonText = document.createTextNode("Left");
    leftButton.appendChild(leftButtonText);
    document.body.appendChild(leftButton);

    //  RIGHT
    var rightButton = document.createElement("button");       
    rightButton.id = "right";
    var rightButtonText = document.createTextNode("Right");
    rightButton.appendChild(rightButtonText);
    document.body.appendChild(rightButton);

    //  MARKBUTTON
    var markButton = document.createElement("button");        
    markButton.id = "mark";
    var markButtonText = document.createTextNode("Mark Cell");
    markButton.appendChild(markButtonText);
    document.body.appendChild(markButton);

generateTable();


var current = document.getElementsByTagName("td")[0];  
current.id = "this"; 
current.style.borderWidth = "8px"; 

document.getElementById("up").addEventListener("click", upMove); 
document.getElementById("down").addEventListener("click", downMove); 
document.getElementById("left").addEventListener("click", leftMove); 
document.getElementById("right").addEventListener("click", rightMove); 
document.getElementById("mark").addEventListener("click", markCell); 