<?php

//Delete the old directory
$directorio = opendir(".");
while($archivo = readdir($directorio))
{    
    if(is_dir($archivo))
    {
        $nombreDir = explode("-",$archivo);
        if($nombreDir[1])
        {
          if($nombreDir[0] < date('Ymd'))
          {
              $objects = scandir($archivo);
              foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                  if (filetype($archivo."/".$object) == "dir") {} else unlink($archivo."/".$object);
                }
              } 
              reset($objects); 
              rmdir("$archivo");
              //echo "<li>".$nombreDir[0]." ".date('Ymd')."</li>";
          } 
        }                            
    }
}
closedir($directorio);

if (isset($_POST['numero']) && !empty($_POST['numero'])) {$numero = $_POST['numero'];}else{$numero=0;}
if (isset($_POST['nombre']) && !empty($_POST['nombre'])) {$nombre = $_POST['nombre'];}else{$nombre='';}
if (isset($_POST['soportes']) && !empty($_POST['soportes'])) {$soportes = $_POST['soportes'];}else{$soportes='';}
if (isset($_POST['exist']) && !empty($_POST['exist'])) {$exist = $_POST['exist'];}else{$exist='';} 

//Separated name and extension
$nombres = explode(".", $nombre);
$soportes = explode(",",$soportes); 

$nombreCarpeta = 'downloads/'. date('Ymd').'-'.rand(0,100000);

if($numero>0)
{
  //upload page for the first execution
  if($exist == '')
  {
    $oldmask = umask(0);
    mkdir("$nombreCarpeta", 0777);
    umask($oldmask);
  }      
  else
    $nombreCarpeta = $exist;
    
    $filename = $nombreCarpeta.'/'.$nombres[0].'.zip';
    if(file_exists($filename)){
      unlink($filename);
  } 
  
  $filename = str_replace(" ", "_", $filename);
  $zip = new ZipArchive;  
  $res = $zip->open("$filename", ZipArchive::CREATE);
 
  for($i=0; $i<$numero; $i++)
  { 
    if ($res === TRUE) {
        //$zip->addFromString('test.html', 'Put content here');
        $contenido = $_POST["$i"];
        $zip->addFromString("$nombres[0]_$soportes[$i].html", "$contenido");        
        
    }            
  }  
  if ($res === TRUE) {
    
    $zip->close();
    echo '<a href='.$filename.' id="downloadFile" data="'.$nombreCarpeta.'">DOWNLOAD ZIP </a>';
    
  } else {
      echo 'failed';
      exit;
  }  
} 

?>
