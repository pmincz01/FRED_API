var request = require('request');
//gets utility to pull data from an API
var fs = require('fs');


console.log ("Matterhorn needs fixing")
var url = "https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&api_key=da8723c8b34a2d027d47f69a2e17d736&file_type=json";

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  var json = JSON.parse (body);
  //pul data from a specific URL into body; then I parsed body into the variable json
   console.log(json) //parse string of observations into JSON data

	var obs = json.observations;

	var GDP = []

	//create the crazy array type that highcharts needs
	var hcGdp = [
		{
			name: "GDP",
			data: []
		}
	]
	obs.forEach(function (data,index){
		GDP.push ({
			date:data.date,
			value: data.value	
		})
		hcGdp[0].data.push ({
			x: unixFormat(data.date),
			y: parseFloat(data.value)	
		})
		console.log(data.value);
		console.log(data.date);
	})

	fs.writeFileSync("hcformatGDP.json", JSON.stringify(hcGdp));

  }
})

function unixFormat(str){
	var r = str.split("-");
	r[0]=parseInt(r[0]);
	r[1]=parseInt(r[1])-1;
	//months being fed into a date object are indexed starting with zero.
	r[2]=parseInt(r[2])
	return Date.UTC(r[0],r[1],r[2])

}

