function buscarPeliculas() { 
 
    var nombre_pelicula=document.getElementById("peliculas").value;

    console.log(nombre_pelicula);
       
  
        if (window.XMLHttpRequest) { 
            // code for IE7+, Firefox, Chrome, Opera, Safari 
            xmlhttp = new XMLHttpRequest(); 
        } else { 
            // code for IE6, IE5 
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
        } 
        xmlhttp.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200) { 
                //alert("llegue"); 
                /* document.getElementById("informacion").innerHTML = this.responseText;  */
                cargarData(this.response);
            } 
        }; 
        /* xmlhttp.open("GET","../../controladores/user/insertarInvitados.php?r_codigo="+r_codigo+"&u_codigo="+u_codigo,true);  */
        xmlhttp.open("POST","http://www.omdbapi.com/?apikey=648317f1&s="+nombre_pelicula);
        xmlhttp.send(); 
        /* document.getElementById("tabladatos").disabled=true; */
        //document.getElementById("anterior").disabled = true;
    return false; 
} 

function cargarData(jsonString){    
    
    var cadena=jsonString.substring(jsonString.indexOf("["),jsonString.indexOf("]")+1);
    console.log(cadena);
    var datos=JSON.parse(cadena);//convierte una cadena en objeto JSON
    console.log(datos.length)
    var detalle="";
    for(var i=0; i<datos.length; i++){
        console.log("entre al bucle")
        detalle+="<tr>"+
        "<td>"+datos[i].imdbID+"</td>"+
        "<td>"+datos[i].Title+"</td>"+
        "<td>"+datos[i].Year+"</td>"+       
        "<td><img src="+datos[i].Poster+"></td>"+
        "</tr>"; 
        console.log(datos[i].Year);
    }
    document.getElementById("tabladatos").innerHTML=detalle;

}