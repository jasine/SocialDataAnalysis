/// <reference path="../../typings/jquery/jquery.d.ts"/>
/* global sigma */
'use strict';
var type=0;
var node=0;
var file='';
var fileName='';
var count='-1';
var sg;
var inti=0;

function dispLoading(display) {
  if(display){
    $('#loading-img').show();
    $('#graph-container').hide();
    $('#btn-calc').addClass('disabled').text('Calculating');

  }else{
    $('#loading-img').hide();
    $('#graph-container').show();
    $('#btn-calc').removeClass('disabled').text('Calculate');
  }
}
function calc() {
   dispLoading(true);
   if($('#nodeCount').val()==""){
     count='-1';
   }else{
     count=$('#nodeCount').val();
   }
   
   if(type==5){
     inti=setInterval(function name(params) {
       $.ajax({
      url:'calc/'+file+'/'+type+'/'+node+'/'+count,
      type:'GET',
      timeout:600000,
      success:function (data) {
        if(type===0){
          $('#title').text('Please select an algorithm');
        }
        dispLoading(false);
        //console.log(data);
        sigma.parsers.json(JSON.stringify(data.graph), sg);
        sg.graph.nodes('n'+node).size=6;
        sg.refresh();      
        console.log(JSON.stringify(data.data));
        var str ="";
        for(var j=0;j<data.data.length;j++){
          str+="<p><strong>Community "+(j+1)+":</strong> ";
          var comms=data.data[j].split(',');
          for(var k=0;k<comms.length;k++){
            str+=comms[k].toString()+", ";
          }
          str=str.substring(0,str.length-4);
          str+="</p>";
        }
        $("#datacontain").html(str);
      }    
    });
     },6000);
   }
   else{
     clearInterval(inti);
     setTimeout(function (params) {
      $.ajax({
      url:'calc/'+file+'/'+type+'/'+node+'/'+count,
      type:'GET',
      timeout:600000,
      success:function (data) {
        if(type===0){
          $('#title').text('Please select an algorithm');
        }
        dispLoading(false);
        //console.log(data);
        sigma.parsers.json(JSON.stringify(data.graph), sg);
        sg.graph.nodes('n'+node).size=6;
        sg.refresh();      
        console.log(JSON.stringify(data.data));
        var str ="";
        for(var j=0;j<data.data.length;j++){
          str+="<p><strong>Community "+(j+1)+":</strong> ";
          var comms=data.data[j].split(',');
          for(var k=0;k<comms.length;k++){
            str+=comms[k].toString()+", ";
          }
          str=str.substring(0,str.length-4);
          str+="</p>";
        }
        $("#datacontain").html(str);
      }    
    });
   },1500);
   }
   
  
}
(function() {
  sg=new sigma({renderers:[{
         type:'canvas',
         container: 'graph-container'
       }]});
//        sg.addRenderer({
//          type:'canvas',
//         container: 'graph-container'
//        });
     sg.bind('clickNode',function (e) {
       console.log(e.data.node.id);
       sg.graph.nodes('n'+node).size=3;
       node=e.data.node.id.substring(1);
       //e.data.node.color='rgb(0,0,0)';
       e.data.node.size=6;
       //sigma.graph.

       sg.refresh();
       
     });
     
     sg.bind('doubleClickNode',function (e) {
       console.log(e.data.node.id);
       node=e.data.node.id.substring(1);
       calc();
     });
  
  
  dispLoading(false);
  $('#btn-calc').addClass('disabled');
  $('#btn-calc').click(function (params) {
    calc();
  });
  $('#nav-bar li').click(function (e) { 
          e.preventDefault();//阻止a链接的跳转行为 
          //$(this).tab('show');//显示当前选中的链接及关联的content 
          for(var i=0;i<$(this).parent().children().length;i++){
            if($(this).parent().children()[i]===this){
                            $(this).addClass('active');
                            type=i+1;
                            $('#title').text($(this).text());
            }
            else{
              $($(this).parent().children()[i]).removeClass('active');

            }
          }
          
          //sg.graph.clear();   

        }) ;
  
  //console.log('Welcome to Yeogurt');
  $('#loadfile').fileinput({
  	'showUpload':true,
  	'showRemove':false, 
  	'showPreview':false,
  	'uploadUrl': 'upload', // server upload action
    'maxFileCount': 1,
    'uploadAsync':true,
    'allowedFileExtensions':['txt']

  });

  $('#loadfile').on('filebatchpreupload', function(event, data, previewId, index) {
    dispLoading(true);
    fileName=$('#loadfile').text();
    console.log('File batch pre upload');
});

  $('#loadfile').on('filebatchuploadsuccess', function(event, data, previewId, index) {
     file = data.response;
     for(var i=0;i<$("#nav-bar").children().length;i++){
        $($("#nav-bar").children()[i]).removeClass('active');
     }
     type=0;
     //loadfile.
     console.log(data); 
     calc();

 

     //$('#loadfile').val(data.files[0]);
});

  
})();

