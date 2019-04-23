// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery.turbolinks

var filterList;

var divId = "div-for-add-input"

var xmlToFilters = function (filterResponseXML) {
  var filters = [];
  var filterListXML = filterResponseXML.getElementsByTagName("object");

  for (var i = 0; i < filterListXML.length; i++) {
    var filterXML = filterListXML[i];
    var filter = {
      id: filterXML.getElementsByTagName("id")[0].textContent,
      name: filterXML.getElementsByTagName("name")[0].textContent,
      function_name: filterXML.getElementsByTagName("function-name")[0].textContent,
      description: filterXML.getElementsByTagName("description")[0].textContent,
      num_parameters: filterXML.getElementsByTagName("num-parameters")[0].textContent,
      example: filterXML.getElementsByTagName("example")[0].textContent
    };
    filters.push(filter);

  }
  return filters;
};


var populateSelect = function (filters) {
  $('#selectFilters').empty();
  $('#selectFilters').append($('<option></option>').html('Select a filter'));
  $.each(filters, function (i, p) {
    $('#selectFilters').append($('<option></option>').val(p.id).html(p.name));
  });
};

var getFilters = function () {
  var ajax = new XMLHttpRequest();
  console.log("Click!");

  // Replace URL below with the URL for your server.
  ajax.open("GET", '/filters.xml');
  ajax.onreadystatechange = function () {
    console.log("Ajax state: " + ajax.readyState);
    if (ajax.readyState === 4 && ajax.status === 200) {
      console.log("Complete AJAX object:");
      console.log(ajax);
      filterList = xmlToFilters(ajax.responseXML);
      //insertBugs(filters);
      console.log(filterList);
      populateSelect(filterList);

    } else if (ajax.readyState === 4 && ajax.status !== 200) {
      console.log("There was a problem.  Status returned was " + ajax.status);
    }
  };

  ajax.onerror = function () {
    console.log("There was an error!");
  };

  // Notice that send is asynchronous.  This method does not block,
  // instead, the code in onreadystatechange above runs when the call
  // is complete.
  ajax.send();
};

var loadFilterDetails = function () {
  var form = document.getElementById('input-fields');

  function removeDiv(divId) {
    var elem = document.getElementById(divId);
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
  }

  function addDiv(divId) {
    var div_open = document.createElement('div');
    div_open.setAttribute('id', divId);
    form.appendChild(div_open);
  }

  function addField(divId, i) {
    var div_open = document.getElementById(divId);
    var input = document.createElement('input');
    input.setAttribute('placeholder', 'Parameter ' + i);
    input.setAttribute('class', 'form-control');
    var lineBreak = document.createElement('br');
    div_open.appendChild(input);
    div_open.appendChild(lineBreak);
    //form.appendChild(div_open)
  }

  var mySelection = document.getElementById('selectFilters');

  if (mySelection) {
    mySelection.addEventListener('change', function (event) {
      var obj = filterList.find(o => o.id === mySelection.value);
      if (obj) {
        document.getElementById('filter-description').innerHTML = "Function Description: " + obj.description;
        document.getElementById('num-parameters').innerHTML = "Number of Parameters:  " + obj.num_parameters;
        document.getElementById('input-example').innerHTML = "Example of Parameters:  " + obj.example;
        removeDiv(divId);
        addDiv(divId);
        for (var i = 1; i <= obj.num_parameters; i++) {
          addField(divId, i);
        }
      } else {
        document.getElementById('filter-description').innerHTML = "";
        document.getElementById('num-parameters').innerHTML = "";
        document.getElementById('input-example').innerHTML = "";
        removeDiv(divId);
      }

    })
  } else { console.log("mySelection is null") };
}

var textFileString = {};
var textFileContect;
//TODO: check parameters before insert and give appropriate message
var submitTheFilter = function () {
  var dict;
  var selectedItem = document.getElementById('selectFilters');
  var selectedFilterID = selectedItem.options[selectedItem.selectedIndex].value;
  console.log("The id of the selected:" + selectedFilterID);
  var obj = filterList.find(o => o.id === selectedFilterID);
  if (obj) {
    var parametrs = "";
    console.log("selectedItem-name:" + obj.name)
    var inputDiv = document.getElementById(divId)
    console.log(inputDiv.getElementsByTagName('input')[0].value);
    for (var i = 0; i < obj.num_parameters; i++) {
      parametrs += inputDiv.getElementsByTagName('input')[i].value;
          if (i !== obj.num_parameters - 1){
            parametrs += " & ";
          }
        }
    if (!textFileString[obj.function_name]){
      textFileString[obj.function_name] = new Array(); 
    }
    // check if parameter exista in textFileString[obj.function_name]
    var parameterExists = false;
    for (i in textFileString[obj.function_name]){
      //console.log("the value in key:"+textFileString[obj.function_name][i]);
      if (parametrs === textFileString[obj.function_name][i]){
        parameterExists = true;
      }
    }
    if (parameterExists) {
      document.getElementById('js-message').innerHTML = "This function has already been selected with the same parameters. Please input different parameters.";
    }
    else {
      textFileString[obj.function_name].push(parametrs);
      document.getElementById('js-message').innerHTML = "Function has been added.";
    }
  }
  console.log(JSON.stringify(textFileString));
  textFileContect = JSON.stringify(textFileString);
  textFileContect = textFileContect.split("\],\"").join("\n");
  textFileContect = textFileContect.split("\",\"").join("&&");
  textFileContect = textFileContect.split("[").join("");
  textFileContect = textFileContect.split("\"").join("");
  textFileContect = textFileContect.split("{").join("");
  textFileContect = textFileContect.split("}").join("");
  textFileContect = textFileContect.split("]").join("");
  textFileContect = textFileContect.split(" ").join("");

  document.getElementById('text-file-content').innerHTML = "";
  document.getElementById('text-file-content').innerHTML = textFileContect.replace("\n","<br>");
  console.log(textFileContect);
}

var submitImages = function() {
  var imageNames = "image: " + document.getElementById("image-names").value;
  var filterNumber = "num_filters: " + document.getElementById("filter-number").value;
  textFileContect = imageNames + "\n" + filterNumber + "\n" + textFileContect;
  console.log(textFileContect);
  document.getElementById('text-file-content').innerHTML = "";
  document.getElementById('text-file-content').innerHTML = textFileContect.split("\n").join("<br>");
}

var generateTextFile = function() {
  var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL || function(){}; 
  var blob = null;
  var content = textFileContect;
  var mimeString = "application/octet-stream"; 
  window.BlobBuilder = window.BlobBuilder || 
                       window.WebKitBlobBuilder || 
                       window.MozBlobBuilder || 
                       window.MSBlobBuilder;  


  if(window.BlobBuilder){
     var bb = new BlobBuilder();
     bb.append(content);
     blob = bb.getBlob(mimeString);
  }else{
     blob = new Blob([content], {type : mimeString});
  }
  var url = createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url
  a.download = "file.txt";
  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}

//TODO: generate a text file 
//TODO: add image names and number of parameters to be used in each image



