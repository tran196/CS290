

/* 
    A 4x4 table (including the header row)
    The top row should be a header row with header cells
    The 4 header cells, from left to right should say "Header 1", "Header 2" ... "Header 4
    The non header cells should contain their position. 
    The upper left cell should contain the text "1, 1", 
    the cell to its right "1, 2", the cell below it "2, 1" and so on.
*/

function generateTable()
{
    
    var body = document.getElementsByTagName("body")[0]; //This creates a reference so we can add the table to the body at the end of the function

    var createTable = document.createElement("table");  //Creating the table
    
    
    var createTableBody = document.createElement("tbody");   //Creating the body of the table

    for(var i = 0; i < 4; i++)
    {
        var createRow = document.createElement("tr");   //Creating the rows of the 4x4 table
        
        for(var j = 0; j < 4; j++)
        {
            if(i == 0)                                  //Logic to create the header rows of the table. It adds the text plus the index + 1 (since j is set to 0)
            {
                var tableHead = document.createElement("th");
                var tableHeadText = document.createTextNode("Header " + (j + 1));
                tableHead.appendChild(tableHeadText);   //Append the text node to each header cell
                createRow.appendChild(tableHead);
            }
            
            else
            {
                var normalCell = document.createElement("td");  //The logic that will run to create the rest of the table
                var normalCellText = document.createTextNode((i) + ', ' + (j + 1));     //The location of each cell
                normalCell.appendChild(normalCellText);     //Add the location text to the cell
                createRow.appendChild(normalCell);          //Add the cell to the table itself
            }
        }
        
        createTableBody.appendChild(createRow);             //Append each row to the table
    }
    
    createTable.appendChild(createTableBody);
    body.appendChild(createTable);                       //Puts the table in the document
    createTable.setAttribute("border", "1.5px");            //Sets the default border for the table
}

generateTable();