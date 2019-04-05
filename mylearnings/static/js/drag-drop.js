$(document).ready(function(){
$(onPageLoad);

$('.edit').click(function(){
  $(this).hide();
  $(this).parent().addClass('editable');
  $(this).closest('.portlet').find('.portlet-content').attr('contenteditable', 'true');  
  $(this).closest('.portlet').find('.save').show();
  $(this).parent().find('.portlet-toggle').hide()
  // .portlet-toggle
});

$('.save').click(function(){
  $(this).hide();
  $(this).parent().removeClass('editable');
  $(this).closest('.portlet').find('.portlet-content').removeAttr('contenteditable');  
  $(this).closest('.portlet').find('.edit').show();
  // Extracting Text and task Id
  var task_id = $(this).closest('.portlet').data('id')
  var temp = $(this).closest('.portlet').find('.portlet-content')[0]
  var updated_content = $(temp).text() 

  onContentChange(task_id,updated_content);
  $(this).parent().find('.portlet-toggle').show()
});

})

function onTaskChange(taskchange,task_id,order){
$.ajax({
  type:"GET",
  cache:false,
  url:'/update',
  dataType: "json",
  data:{task:taskchange, taskid:task_id,taskorder:order},    // multiple data sent using ajax
  success: function (result) {
    console.log(result['task'])
  }
  });
}

function onContentChange(task_id,updated_content){
  $.ajax({
    type:"GET",
    cache:false,
    url:'/updatecontent',
    dataType: "json",
    data:{taskid:task_id,updatedcontent:updated_content},    // multiple data sent using ajax
    success: function (result) {
      console.log(result['task'])
    }
    });
  }



function onPageLoad()
{
  $( ".column" ).sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    start: function (event, ui) {
      ui.item.addClass('tilt');
    },
    stop: function (event, ui) {
      ui.item.removeClass('tilt');
      var task_item = ui.item
      var task_id = $(task_item[0]).data("id")
      var task = $(task_item.parent()[0]).data("task")
      var order = ($(task_item.parent()).sortable("toArray"))
      var json_order = JSON.stringify(order)
      console.log(task_id)
      console.log(task) 
      console.log(json_order)
      onTaskChange(task,task_id,json_order);

    }
  });

  $( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
      .addClass( "ui-widget-header ui-corner-all" )
      .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

  $( ".portlet-toggle" ).click(function() {
    var icon = $( this );
    icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
    icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    if ($(icon).hasClass('ui-icon-plusthick')){
        $(icon).closest(".portlet").find(".edit").hide()
    }
    else{
      $(icon).closest(".portlet").find(".edit").show()
    }
  });
}