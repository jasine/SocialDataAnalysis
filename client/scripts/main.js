/// <reference path="../../typings/jquery/jquery.d.ts"/>
/* global sigma */
'use strict';
var type=1;
var node=2;
var file='';
var fileName='';
function dispLoading(display) {
  if(display){
    $('#loading-img').show();
    $('#btn-calc').addClass('disabled').text('Calculating');

  }else{
    $('#loading-img').hide();
    $('#btn-calc').removeClass('disabled').text('Calculate');
  }
}
function calc() {
   dispLoading(true);
   $.ajax({
      url:'calc/'+file+'/'+type+'/'+node,
      type:'GET',
      timeout:600000,
      success:function (data) {
        //清除以前的
        dispLoading(false);
        console.log(data);
        sigma.parsers.json(JSON.stringify(data), {
         container: 'graph-container'
        });
      }    
    });
}
(function() {
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

            }
            else{
              $($(this).parent().children()[i]).removeClass('active');
            }
          }         
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
     type=0;

     //loadfile.
     console.log(data);
     calc();
     //$('#loadfile').val(data.files[0]);
});

  
})();

