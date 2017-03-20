
var listaNumber;
var tableWidth;
var span;
var translatedLine;




exports.decode = function(WDOldLine,temp){
      temp = WDOldLine.text();
      var params = temp.split(" ");
      if(temp.slice(0,1) == "i")
      {
        params= myHelpers.getImage(temp);
      }
      if(temp.slice(0,2) == "->")
      {
        params = myHelpers.getLink(temp);
      }

      switch(params[0]){
                                                                                                                                      // 1- header decoder
              case 'h': {
                span = $("<span></span>").addClass("icon icon-link");
                translatedLine = $("<h3></h3>").html(span);
                translatedLine.append(temp.slice(1));
                WDOldLine.html(translatedLine);
                WDOldLine.addClass("apuntes-title")
              }
              break;
                                                                                                                                      //2- image decoder
              case 'i': {
                var src = params[1];
                var pos = params[2];
                temp = $("<img></img>");
                temp.attr("src",src);
                temp.addClass("img-apuntes ");
                WDOldLine.html(temp);
                WDOldLine.addClass("img-line " + pos);
              }
              break;
                                                                                                                                     //3-numered list start decoder
              case '-':{
                listaNumber = 1;
                temp = listaNumber + ". " + temp.slice(1);
                listaNumber++;
                WDOldLine.html(temp);
                WDOldLine.addClass("linea-lista")
              }
              break;
                                                                                                                                  //3.1 numered list cotinuation decoder
              case '--':{
                temp =listaNumber + ". " + temp.slice(2);
                listaNumber++;
                WDOldLine.html(temp);
                WDOldLine.addClass("linea-lista")
              }
              break;
                                                                                                                                   //4-checklist decoder
              case 'c':{
                temp = " <input type='checkbox' class='filled-in'>" + temp.slice(2);
                listaNumber++;
                WDOldLine.html(temp);
                WDOldLine.addClass("linea-lista")
              }
              break;
                                                                                                                                   //5-Line
              case '_':{
                temp = $("<hr>");
                temp.css({"height":"2px","width":"98%"});
                listaNumber++;
                WDOldLine.html(temp);
              }
              break;
                                                                                                                                  //6 -header colorful
              case 'hc': {
                temp = $("<h3></h3>");
                temp.css({"color":params[1]});
                console.log(params[0]+ " " + params [1] + " " + params[2]);
                for(i = 2; i < params.length; i++){
                  temp.append(params[i] + " ");
                }
                WDOldLine.html(temp);
                WDOldLine.addClass("apuntes-title")
              }
              break;
                                                                                                                                  //7 - tags decoder (one of mi favorites xD)
              case 'tags': {
                temp = "";
                for(i = 1; i < params.length; i++){
                  temp += ("<span class='icon icon-tag tag'> " + params[i] + " </span>");
                }
                WDOldLine.html(temp);
                WDOldLine.addClass("tags-container");
              }
              break;
                                                                                                                                  //8 - tables Header decoder
              case 'th': {
                temp = temp.slice(2);
                params = temp.split("|");
                temp = $("<table></table>").addClass('apuntes-table');
                for(i = 0; i < params.length; i++){
                  temp.append("<th>" + params[i].trim() + "</th>");
                }
                tableWidth = 100 / params.length;
                temp.children().css({"width":tableWidth + "%"});
                WDOldLine.html(temp);
              }
              break;
                                                                                                                                    // 8.1- Tables decoder
              case 't': {
                temp = temp.slice(1);
                params = temp.split("|");
                temp = $("<table></table>").addClass('apuntes-table body');
                for(i = 0; i < params.length; i++){
                  temp.append("<td>" + params[i].trim() + " </td>");
                }              
                temp.children().css({"width": tableWidth + "%"});
                console.log(temp.children());
                WDOldLine.html(temp);
              }
              break;

              case '->': {
                var src = params[1];
                var name = params[2];
                span = $("<span></span>").addClass("icon icon-link");
                translatedLine = $("<a></a>").attr({"href":src});
                translatedLine.text(name);
                translatedLine.prepend(span);
                WDOldLine.html(translatedLine);
                WDOldLine.addClass("apuntes-link");
              }
              break;


            } // end of switch

          temp = null;
}