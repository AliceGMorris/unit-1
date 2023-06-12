//When called, loads all other functions
function initialize(){
    cities(cityPop);
	addColumns(cityPop);
	addEvents();
	debugAjax();
};

var cityPop = [
	{ 
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];
//Creates a table using the city and population values in cityPop
function cities(cityPop){
    var table = document.createElement("table");

    var headerRow = document.createElement("tr");
	//Creates city header for the table
    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";
    headerRow.appendChild(cityHeader);
	//Creates population header for the table
    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);

    table.appendChild(headerRow);
	//Runs through every group in the cityPop array and appends it to the table
    for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population;
        tr.appendChild(pop);

        table.appendChild(tr);
    };
	//Places table in div with id of mydiv
    var mydiv = document.getElementById("mydiv");
    mydiv.appendChild(table);
};
//Adds City Size column to prexisting table
function addColumns(cityPop){
    
    document.querySelectorAll("tr").forEach(function(row, i){
		
    	if (i == 0){
			row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
			
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
    	};
    });
};

function addEvents(){
	//Makes text change colour as the mouse moves over it
	document.querySelector("table").addEventListener("mouseover", function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);
			
			color += random;
			
			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		}};

		document.querySelector("table").style.color = color;
	});
	//Makes it so a pop up box appears with text when text in the table was clicked.
	function clickme(){

		alert('Hey, you clicked me!');
	};

	document.querySelector("table").addEventListener("click", clickme)
};
//Loads the functions
window.onload = initialize();


function debugCallback(response){
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(response))
};

function debugAjax(){
	
	var myData;
	//Gets the data from MegaCities.geojson
	fetch('data/MegaCities.geojson')
		.then(function(response){
			return response.json();
			
		})
		//Stores the data from the .geojson file, then inputs the variable into the webpage
		.then(function(response){
			myData = response;
			
			document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data:<br>' + JSON.stringify(myData))
		}) 

};