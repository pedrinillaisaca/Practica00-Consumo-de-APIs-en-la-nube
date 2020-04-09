function buscarPeliculas() {
    var nombre_pelicula = document.getElementById("peliculas").value;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari 
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5 
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            /* document.getElementById("informacion").innerHTML = this.responseText;  */
            creadTable(this.responseText);

        }
    };
    /* xmlhttp.open("GET","../../controladores/user/insertarInvitados.php?r_codigo="+r_codigo+"&u_codigo="+u_codigo,true);  */
    xmlhttp.open("POST", "http://www.omdbapi.com/?apikey=648317f1&s=" + nombre_pelicula + "&r=json", true);
    xmlhttp.send();
    /* document.getElementById("tabladatos").disabled=true; */
    //document.getElementById("anterior").disabled = true;
    return false;
}

function cargarData(jsonString) {

    var cadena = jsonString.substring(jsonString.indexOf("["), jsonString.indexOf("]") + 1);
    /* var datos = JSON.parse(cadena);//convierte una cadena en objeto JSON  */
    /*var code="<input type='text' id='objson' value='"+cadena+"' style='display: none;' />";  */
    document.getElementById("informacion").innerHTML = code;

    return false;
}


function creadTable(jsonString) {
    var cadena = jsonString.substring(jsonString.indexOf("["), jsonString.indexOf("]") + 1);
    /* var cadena=document.getElementById("objson").value; */
    console.log(cadena);
    var datos = JSON.parse(cadena);//convierte una cadena en objeto JSON

    var detalle = "<table id='tablax' class='table table-striped table-bordered' style='width:100%'>" +
        "<thead>" +
        "<th>DETALLES</th>" +
        "<th>NOMBRE</th>" +
        "<th>AÑO</th>" +
        "<th>POSTER</th>" +
        "</thead>" +
        "<tbody>";

    for (var i = 0; i < datos.length; i++) {
        detalle += "<tr>" +/* href='masDetalles.html' */
            "<td> <a  id='" + datos[i].imdbID + "' onclick='cargarInfPelicula(this.id)' class='btn btn-more'>Ver mas</a></td>" + //onclick='ver_mas_detalles(this.innerText)'
            "<td> <p class='claseRegistros' >" + datos[i].Title + "</p></td>" +
            "<td> <p class='claseRegistros'>" + datos[i].Year + "</p></td>" +
            "<td><img src=" + datos[i].Poster + " style='width: 220px; height: 270px;'></td>" +
            "</tr>";

    }
    document.getElementById("pincheTabla").innerHTML = detalle + "</tbody></table>";

    $(document).ready(function () {
        $('#tablax').DataTable({
            language: {
                processing: "Tratamiento en curso...",
                search: "Buscar&nbsp;:",
                lengthMenu: "Agrupar de _MENU_ items",
                info: "Mostrando del item _START_ al _END_ de un total de _TOTAL_ items",
                infoEmpty: "No existen datos.",
                infoFiltered: "(filtrado de _MAX_ elementos en total)",
                infoPostFix: "",
                loadingRecords: "Cargando...",
                zeroRecords: "No se encontraron datos con tu busqueda",
                emptyTable: "No hay datos disponibles en la tabla.",
                paginate: {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "Ultimo"
                },
                aria: {
                    sortAscending: ": active para ordenar la columna en orden ascendente",
                    sortDescending: ": active para ordenar la columna en orden descendente"
                }
            },
            scrollY: 400,
            lengthMenu: [[5, 25, -1], [5, 25, "All"]],
        });
    });
    return false;
}


function cargarInfPelicula(id_pelicula) {
    console.log("cod peliculeon es: " + id_pelicula);
    window.location = "masDetalles.html?id_pelicula=" + id_pelicula;
}



function ver_mas_detalles(id_pelicula) {

     var id_pelicula=window.location.search.substr(1);
     id_pelicula=id_pelicula.substring(id_pelicula.indexOf("=")+1, id_pelicula.length);
     console.log(id_pelicula);    

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari 
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5 
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert("llegue"); 
            //document.getElementById("informacion").innerHTML = this.responseText;              
            ver_mas_detalles2(this.responseText);
        }
    };

    xmlhttp.open("POST", "http://www.omdbapi.com/?apikey=648317f1&i=" + id_pelicula + "&r=json&plot=full", true);
    xmlhttp.send();
    /* QUE VERGA AQUI NO DEBE ESTAR ESCRITO NADA PORQUE CASO CONTRARIO NO HACE NADA */    
    return false;
}

function ver_mas_detalles2(stringJson) {
    var objetoJson = JSON.parse(stringJson);    
    var htmlImagen="<img src='"+objetoJson.Poster+"' style='width: 250px; height: 350px;' >"
    console.log(typeof (objetoJson));    
    document.getElementById("fechalanzamiento").innerHTML=objetoJson.Released;
    document.getElementById("genero").innerHTML=objetoJson.Genre;
    document.getElementById("director").innerHTML=objetoJson.Director;
    document.getElementById("escritores").innerHTML=objetoJson.Writer;
    document.getElementById("actores").innerHTML=objetoJson.Actors;
    document.getElementById("sinopsis").innerHTML=objetoJson.Plot;    
    document.getElementById("calificacion").innerHTML=objetoJson.Ratings[0].Value;
    document.getElementById("imagenes").innerHTML=htmlImagen;

}

