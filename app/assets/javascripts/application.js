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


var populateSelect = function(filters) {
	$('#selectFilters').empty();
    $('#selectFilters').append($('<option></option>').html('Select a filter'));
	$.each(filters, function(i, p) {
	    $('#selectFilters').append($('<option></option>').val(p.id).html(p.name));
	});
};

var getFilters = function(){
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

var loadFilterDetails = function() {
    	var form = document.getElementById('input-fields');

        function removeDiv(divId) {
            var elem = document.getElementById(divId);
            if(elem){
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
            input.setAttribute('class' , 'form-control');
            var lineBreak = document.createElement('br');
            div_open.appendChild(input);
            div_open.appendChild(lineBreak);
            //form.appendChild(div_open)
    	}

    	var mySelection = document.getElementById('selectFilters');

    	if (mySelection) {
    		mySelection.addEventListener('change',function(event){
                var obj = filterList.find(o => o.id === mySelection.value);
                if(obj){
                    document.getElementById('filter-description').innerHTML = "Function Description: " + obj.description;
                    document.getElementById('num-parameters').innerHTML = "Number of Parameters:  " + obj.num_parameters;
                    document.getElementById('input-example').innerHTML = "Example of Parameters:  " + obj.example;
                    var divId = "div-for-add-input"
                    removeDiv(divId);
                    addDiv(divId);
                    for (var i = 1; i <= obj.num_parameters; i++) {
                        addField(divId, i);
                    }
                } else {
                    document.getElementById('filter-description').innerHTML = "";
                    document.getElementById('num-parameters').innerHTML = "";
                    document.getElementById('input-example').innerHTML = "";
                    var divId = "div-for-add-input"
                    removeDiv(divId);
                }
                
    	})
    	} else{ console.log("mySelection is null")};
    }




