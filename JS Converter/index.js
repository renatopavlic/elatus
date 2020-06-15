var xmlFile = 'tecaj.xml';
var podaci = {};
var selektirano = {
  jedinica: 1,
  kupovni: 1,
  srednji: 1,
  prodajni: 1
};

function loadDoc() {
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", xmlFile, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      xmlParser(this.response);
    }
  };

}

function xmlParser(xml) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xml, "text/xml");
  var table = `<tr>
  <th>Datum</th>
</tr>
<tr>
  <th>Valuta</th>
  <th>Jedinica</th>
  <th>Kupovni</th>
  <th>Srednji</th>
  <th>Prodajni</th>
</tr>`; //subcategory heading
  var x = xmlDoc.getElementsByTagName("tecajna_lista")[0].childNodes;
  var valute = "";
  for (var elem of x) {
    var datum = elem.getElementsByTagName("datum_primjene")[0].innerHTML;
    var valuta = elem.getElementsByTagName("valuta")[0].innerHTML;
    var jedinica = elem.getElementsByTagName("jedinica")[0].innerHTML;
    var kupovni = elem.getElementsByTagName("kupovni_tecaj")[0].innerHTML;
    var srednji = elem.getElementsByTagName("srednji_tecaj")[0].innerHTML;
    var prodajni = elem.getElementsByTagName("prodajni_tecaj")[0].innerHTML;
    //var titles = elem.getElementsByTagName("tecajna_lista")[0].childNodes[0].nodeValue;
    //var cats = elem.getElementsByTagName("tecajna_lista")[0].childNodes[1].nodeValue;
    //var subCats = elem.getElementsByTagName("tecajna_lista").length === 0 ? "..." : elem.getElementsByTagName("SUBCATEGORY")[0].childNodes[0].nodeValue;
    //var subCats = "test";
    //table += "<tr><td>" + datum + "</td><td>" + titles + "</td><td>" + subCats + "</td></tr>";
    table += "<tr><td>" + datum + "</td></tr>";
    table += "<tr><td>" + valuta + "</td><td>" + jedinica + "</td><td>" + kupovni + "</td><td>" + srednji + "</td><td>" + prodajni + "</td></tr>";
    valute += " <option value="+valuta+">"+valuta+"</option>"
    podaci[valuta]={
      valuta: valuta,
      jedinica: parseFloat(jedinica.replace(',', '.')),
      kupovni: parseFloat(kupovni.replace(',', '.')),
      srednji: parseFloat(srednji.replace(',', '.')),
      prodajni: parseFloat(prodajni.replace(',', '.'))
    }
  }
  document.getElementById("zadatak").innerHTML = table;
  document.getElementById("valute").innerHTML = valute;
}
loadDoc();


document.addEventListener('input', function (event) {
	if (event.target.id === 'valute'){
    console.log(event.target.value, podaci[event.target.value]);
    selektirano = podaci[event.target.value];
  } else if(event.target.id === 'kolicina'){
    console.log("preracunaj", event.target.value);
    var konverzija = `<tr>
      <th>Valuta</th>
      <th>Jedinica</th>
      <th>Kupovni</th>
      <th>Srednji</th>
      <th>Prodajni</th>
    </tr>
    <tr>
      <td>${selektirano.valuta}</td>
      <td>${event.target.value}</td>
      <td>${event.target.value*selektirano.kupovni}</td>
      <td>${event.target.value*selektirano.srednji}</td>
      <td>${event.target.value*selektirano.prodajni}</td>
      <td></td>
    </tr>`
    document.getElementById("konverzija").innerHTML = konverzija;
  }
}, false);
