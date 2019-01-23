// We read files. In the drag comes the collection of files because they can be
// select and drag several. Here we will only take the first one.
function leerArchivo3(files){
    if (files.length > 0){
        /*var radios = document.getElementsByName("read-as3");
        var opcion = "text";
        for (var i=0; i<radios.length; i++){
            if (radios[i].checked) {
                opcion = radios[i].value;
                break;
            }
        } */
        var opcion = "text";
        var archivo = files[0];
        /*if(archivo.type != 'text/html')
        {
          exit;
        } */
        //document.getElementById("tipo-mime3").textContent = archivo.type;
        //document.getElementById("longitud3").textContent = archivo.size;
        var lector = new FileReader();
        lector.addEventListener("load",
            function(evento){
                var cadena  = evento.target.result;
                /*if (cadena.length>50000){
                    cadena = cadena.substr(0,50000) +
                    "\r\n..........50000 bytes ......";
                } */
                //$("#contenido-archivo3").val(cadena);
                $("#styled").val(cadena);
                contar_lineas($( "#styled" ).val());
            }, false);
        if (opcion=="text"){
            lector.readAsText(archivo);
        } else if (opcion=="data-url"){
            lector.readAsDataURL(archivo);
        } else {
            lector.readAsArrayBuffer(archivo);
        }
    }
} 
function leerArchivo(){
    
    var inpute = document.getElementById("boton-file2");
    if (inpute.files.length > 0){
        
        var opcion = "text";
        var archivo = inpute.files[0];
        //document.getElementById("tipo-mime").textContent = archivo.type;
        //document.getElementById("longitud").textContent = archivo.size;
        var lector = new FileReader();
        lector.addEventListener("load",
            function(evento){
                
                var cadena  = evento.target.result;
                /*if (cadena.length>50000){
                    cadena = cadena.substr(0,50000) +
                    "\r\n..........50000 bytes ......";
                }*/                
                $("#styled").val(cadena);
                contar_lineas($( "#styled" ).val());
                $('#loadingBoxFull').addClass('hidden');
            }, false);
        if (opcion=="text"){
            lector.readAsText(archivo);
          
        } else if (opcion=="data-url"){
            lector.readAsDataURL(archivo);
        } else {
            lector.readAsArrayBuffer(archivo);
        }        
    }
}
function activaPrevia(id){
    $("#"+id).show();
    $("#"+id+"Codigo").hide();
}
function activaCodigo(id){
    $("#"+id).hide();
    $("#"+id+"Codigo").show();
}

function activa(id, id2){
  
   $("#resultIndiv div").each(function () {
        //$(this).addClass('hidden');
        if($(this)[0].id != id2)
          $(this).hide();
                
   });
   $("#"+id2+" div").each(function () {
        if($(this)[0].id != id)
          $(this).hide();
   });     
   
   $("#"+id2).toggle();     
   $("#"+id).toggle( "slow" );//removeClass('hidden');
   
   $("#cabeceraResul span").each(function () {
        $(this).removeClass('resulActivo');
   });
   $("#_"+id).addClass('resulActivo');
      
}
function ocultaMsg(){
     $('#fullMsg').addClass('hidden');
}
function contar_lineas(texto) 
{        
        var lineas = 1;
        $(".numLine").remove();
        $("#lineBox").append('<p class="numLine" style="padding-top:5px;!important">'+lineas+'</p>');
        for (var j = 0; j < texto.length; j++) {
                if (texto.charAt(j) == "\n") {
                        lineas++;
                    if(j == texto.length-1)
                      $("#lineBox").append('<p class="numLine" style="padding-bottom:5px;!important">'+lineas+'</p>');
                    else   
                      $("#lineBox").append('<p class="numLine">'+lineas+'</p>');
                }
        }
        $('#styled').css('height',$('#lineBox').css('height'));
        return lineas;
}  

$(document).ready(function(){
  
  $('#CheckImg').change(function (e) {
      if(this.checked)
         $("#Ruta").removeAttr('disabled');          
      else
         $('#Ruta').attr('disabled','disabled');  
  });
  
  
  //var ta3 = document.getElementById("contenido-archivo3");
  var ta3 = document.getElementById("styled");
  
    // We cancel the drag on the whole page (CH does not need this but FF, OP does)
  document.body.addEventListener("dragover",
      function (evento){
          //Pero no en botones file (CH y FF)
          if (evento.target.type!="file"){
              evento.preventDefault();
              return false;
          }
      }, true);
    // We cancel the drag on the whole page
  document.body.addEventListener("drop",
      function (evento){
          //Pero no en botones file (CH y FF)
          if (evento.target.type!="file"){
              evento.preventDefault();
              return false;
          }
      }, true);   
    // We handle DIV drop
  ta3.addEventListener("drop",
      function (evento){
          evento.stopPropagation();
          evento.preventDefault();
          leerArchivo3(evento.dataTransfer.files);
      } , false);
  
  $('#boton-file2').change(function (e) {
      $("#NomFich").val($('#boton-file2').val());
  });  
        
  $('#styled').css('height',$('#lineBox').css('height'));

  $( "#styled" ).focus(function() {
    contar_lineas($( "#styled" ).val());    
  });
  
  $('#styled').bind('input propertychange', function() { 
     contar_lineas($( "#styled" ).val());
  });
 
  /*$('#botonCargar').click(function() {
     if($('#boton-file2').val() != "")
     {
        $('#loadingBoxFull').removeClass('hidden');
        leerArchivo();
     }               
  });*/
  $('#boton-file2').change(function() {
      $('#loadingBoxFull').removeClass('hidden');
      leerArchivo();              
  });
  
  $('#boton').click(function() {
    var msgerr = '<p class="msgIni">Please, correct the following errors:</p>';    
    var flagErr = 0;
    var webIds = $('#websiteid').val();
    var aleat = ''; 
        
    //clean errors
    $('#textWebsite').removeClass('colorWarning');
    $('#textProg').removeClass('colorWarning');
    $('#textGe').removeClass('colorWarning');  
    $('#NomFichText').removeClass('colorWarning');   
    $('.rightBox').removeClass('HTMLWarning');
    
    // clean box messages   
    $('.msg').remove();
    $('.msgIni').remove();
    $('.buttonBck').remove();
    $('#aceptar').remove();
    
    // clean results  
    $('.result').remove();
    $('.enlaceResul').remove();
    if((document.getElementById('downloadFile') != null) && (typeof document.getElementById('downloadFile') !== "undefined"))
        aleat = document.getElementById('downloadFile').attributes['data'].nodeValue;
    $('#downloadFile').remove();
    $('#resultados').addClass('hidden');
    
       
    if( !$('#websiteid').val() ) {
        $('#textWebsite').addClass('colorWarning'); 
        flagErr = 1; 
        msgerr = msgerr + '<p class="msg">*Insert at least one websiteID</p>';  
    }
    else{       
       webIds = webIds.split(',');
       
       for (var i=0; i< webIds.length;i++)
       {
          webIds[i] = webIds[i].replace(/\s/g,"");
          if(isNaN(parseInt(webIds[i]))){
            $('#textWebsite').addClass('colorWarning');
            flagErr = 1;    
            msgerr = msgerr + '<p class="msg">*Website ID must be numeric</p>';
            break;
          }
       
       }    
    } 
    if( !$('#NomFich').val() ) {
          $('#NomFichText').addClass('colorWarning');
          flagErr = 1;    
          msgerr = msgerr + '<p class="msg">*Insert the newsletter name</p>';   
    }       
    if( !$('#progid').val() ) {
          $('#textProg').addClass('colorWarning');
          flagErr = 1;    
          msgerr = msgerr + '<p class="msg">*Insert the Program ID</p>';   
    }
    else if (isNaN($("#progid").val())){
          $('#textProg').addClass('colorWarning');
          flagErr = 1;    
          msgerr = msgerr + '<p class="msg">*Program ID must be numeric</p>';
    }
    if( !$( "#styled" ).val() ) {
          $('.rightBox').addClass('HTMLWarning');
          flagErr = 1;  
          msgerr = msgerr + '<p class="msg">*Include the code in the HTML box</p>';                              
    }
    if( $('#geid').val() ) {
      if (isNaN($("#geid").val())){
          $('#textGe').addClass('colorWarning');
          flagErr = 1;    
          msgerr = msgerr + '<p class="msg">*Ad ID must be numeric</p>';   
      }    
    }
    // check for errors
    if(flagErr == 1)
    {
       $('#fullMsg').css('height',window.innerWidth);        
       $('#fullMsg').removeClass('hidden');
       $('#msgB').append(msgerr);
       var aceptar = '<div class="buttonBck"> <button type="button" class="accept" id="aceptar" onClick="ocultaMsg();">I agree</button> </div>';
       $('#msgB').append(aceptar);
    }
    else
    {
      var clickURL = '';
      //bucle webIds.length               
      var contentHref ='';
      var ge = 0;
      var posiciones = [];
      var textResul = '';
      var contentUpdate='';
      var contentPHP = [];
      var parametros = {};
      var EPI = '';
      var images = '';
      if($('#Ruta').val() == '')
        images = 'http://hst.tradedoubler.com/file/'+$('#progid').val()+'/';
      else  
        images = 'http://hst.tradedoubler.com/file/'+$('#progid').val()+'/'+$('#Ruta').val()+'/';
        
        // we search for all the links
      for(var j=0; j<webIds.length; j++)    
      { 
        textResul = '';
                                
        if($('#geid').val())
        {
            ge = $("#geid").val();
        } 
        if($('#EPI').val())
        {
            EPI = $("#EPI").val();
        } 
        
        var contentImg = $( "#styled" ).val();
        // we replace images        
        if(!$('#Ruta').is(':disabled')) 
        { 
          var imgChange = $( "#styled" ).val().split('src=');
          contentImg = imgChange[0];                   
          for(var i=1; i<imgChange.length; i++)
          { 
            // goes with double quote
             if(imgChange[i][0] == '"')
             {
                //var imgsrc = imgChange[i].split('"');
                //imgsrc[0] -->Imagen
                //alert(imgsrc);              
                imgChange[i] = imgChange[i].replace('"', 'src="'+images);                          
             }
             //va con comilla simple
             else if(imgChange[i][0] == "'")
             {
                //alert(imgChange[i]);
                imgChange[i] = imgChange[i].replace("'", "href='"+images);              
             }
             
             contentImg = contentImg + imgChange[i]; 
          }
        }        
        // We assemble the impression
        var contentImp =  contentImg.split('<table');
        var contenttoTrack = contentImp[0]+"<img src='https://imp.tradedoubler.com/imp?type(inv)g("+ge+")a("+webIds[j]+")'>";
        
        for(var i=1; i<contentImp.length;i++)
        {
          contenttoTrack = contenttoTrack + '<table' + contentImp[i];
        }   
    
        contentHref = contenttoTrack.split('href=');
        contentUpdate = contentHref[0];
        //clickURL = 'https://clk.tradedoubler.com/click?p='+$('#progid').val()+'&a='+webIds[j]+'&g='+ge+'&epi='+EPI;
        for(var i=1; i<contentHref.length; i++)
        {              
             // goes with double quote
           if(contentHref[i][0] == '"')
           { 
              //alert(contentHref[i]);
              var URL = contentHref[i].split('"');
                  
                // first iteration == first support -> We ask!
              if(j == 0)
              {
                var msgEnlaces = '<span class="cabeceraTrackMsg">Links found: '+contentHref.length-1;
                msgEnlaces = msgEnlaces +'<br> You want to track '+i+'/'+contentHref.length-1+':';
                msgEnlaces = msgEnlaces +'<br><span class="trckEnlace">'+URL[1]+'</span>';
                msgEnlaces = msgEnlaces +'<div class="buttonBck">  <button type="button" class="accept" id="cancel">Delete</button><button type="button" class="accept" id="ok">I agree</button> </div>';
                                
                var c = confirm("Links to track "+i+"/"+((contentHref.length)-1)+"\n-----------------------------\nYou want to add tracking to:\n "+URL[1]);            
                if (URL[1] != '') clickURL = 'https://clk.tradedoubler.com/click?p='+$('#progid').val()+'&a='+webIds[j]+'&g='+ge+'&epi='+EPI+'&url=';
                else clickURL = 'https://clk.tradedoubler.com/click?p='+$('#progid').val()+'&a='+webIds[j]+'&g='+ge+'&epi='+EPI;            
                if (c == true)
                {
                    contentHref[i] = contentHref[i].replace('"', 'href="'+clickURL);
                    //solo guardamos en la primera iteracion
                    posiciones[posiciones.length] = 1;
                }
                else
                {                
                    contentHref[i] = contentHref[i].replace('"', 'href="');
                    posiciones[posiciones.length] = 0;
                }
              }

              else
              {
                if (posiciones[i-1] == 1)
                {
                  contentHref[i] = contentHref[i].replace('"', 'href="'+clickURL);
                } 
                else{
                  contentHref[i] = contentHref[i].replace('"', 'href="');
                }               
              }                
           }
            // goes with single quote
           else if(contentHref[i][0] == "'")
           { 
              //alert('comilla simple');
              var URL = contentHref[i].split("'");
              //primera iteracion == primer soporte -->Preguntamos!
              if(j == 0)
              {
                var c = confirm("Desea a\u00f1adir tracking a:\n "+URL[1]);
                if (URL[1] != '') clickURL = 'https://clk.tradedoubler.com/click?p='+$('#progid').val()+'&a='+webIds[j]+'&g='+ge+'&epi='+EPI+'&url=';
                else clickURL = 'https://clk.tradedoubler.com/click?p='+$('#progid').val()+'&a='+webIds[j]+'&g='+ge+'&epi='+EPI;
                if (c == true)
                {
                   contentHref[i] = contentHref[i].replace("'", "href='"+clickURL);
                   //solo guardamos en la primera iteracion
                   posiciones[posiciones.length] = 1;
                }
                else
                {   
                    contentHref[i] = contentHref[i].replace("'", "href='");             
                    posiciones[posiciones.length] = 0;
                }
              }

              else
              {
                if (posiciones[i-1] == 1)
                {
                  contentHref[i] = contentHref[i].replace("'", "href='"+clickURL);
                }
                else
                {
                  contentHref[i] = contentHref[i].replace("'", "href='");
                }                
              } 
           }
           
           contentUpdate = contentUpdate + contentHref[i];         
        }//loop for newsletter
        
        //guardamos resultados 
        parametros[j] = contentUpdate;    
        textResul = '<div class="result hidden" id="'+j+'"><button type="submit" class="botonResul" id="previa_'+webIds[j]+'" onClick="activaPrevia(\''+webIds[j]+'\')">Preview</button><button type="submit" class="botonResul" id="showCode_'+webIds[j]+'" onClick="activaCodigo(\''+webIds[j]+'\')">See code</button><div class="result hidden" id="'+webIds[j]+'">'+contentUpdate+'</div><div class="result hidden" id="'+webIds[j]+'Codigo"><textarea class="boxarea" style="resize:none">'+contentUpdate+'</textarea></div></div>'; 
        $("#resultIndiv").append(textResul);   
        $("#cabeceraResul").append('<span class="enlaceResul" id="_'+webIds[j]+'" onClick="activa(\''+webIds[j]+'\',\''+j+'\')" >Ver '+webIds[j]+'&nbsp;</span>');
        
      }//loop for supports
      $("#resultados").removeClass('hidden'); 
    }//else   
      
      parametros['numero'] = webIds.length;
      parametros['nombre'] = $( "#NomFich" ).val();
      parametros['soportes'] = $( "#websiteid" ).val();
      parametros['exist'] = aleat;
      
      $.ajax({
        data:  parametros,
        url:   'ficheros.php',
        type:  'post',

        success:  function (response) {
                $("#resultados").append(response);
        }
	    });
              
    return false;
  });
});
