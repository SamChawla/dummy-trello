$(document).ready(function(){
$(onPageLoad);

// Saves text in 'portlet-content' on pressing ENTER
$(".portlet-content").keypress(function (e) {
  if (e.which == 13) {
    updated_content = e.currentTarget.innerText
    task_id = e.currentTarget.parentElement.id
    onContentChange(task_id,updated_content,false);
    $(e.currentTarget).removeAttr('contenteditable')
  }
});

// Saves text in 'portlet-header' on pressing ENTER
$(".portlet-header").keypress(function (e) {
  if (e.keyCode ==13 || e.which == 13) {
    updated_title = e.currentTarget.innerText
    task_id = e.currentTarget.parentElement.id
    onContentChange(task_id,updated_title,true);
    $(e.currentTarget).removeAttr('contenteditable')
  }
});


// $('.edit').click(function(){
//   $(this).hide();
//   $(this).parent().addClass('editable');
//   $(this).closest('.portlet').find('.portlet-content').attr('contenteditable', 'true');  
//   $(this).closest('.portlet').find('.save').show();
//   $(this).parent().find('.portlet-toggle').hide()
//   // .portlet-toggle
// });

// $('.save').click(function(){
//   $(this).hide();
//   $(this).parent().removeClass('editable');
//   $(this).closest('.portlet').find('.portlet-content').removeAttr('contenteditable');  
//   $(this).closest('.portlet').find('.edit').show();
//   // Extracting Text and task Id
//   var task_id = $(this).closest('.portlet').data('id')
//   var temp = $(this).closest('.portlet').find('.portlet-content')[0]
//   var updated_content = $(temp).text() 

//   onContentChange(task_id,updated_content);
//   $(this).parent().find('.portlet-toggle').show()
// });

})

// Call this function to update task status
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

// To enable content editing
function EditContent(ref_element){
  console.log(ref_element)
  $(ref_element).attr('contenteditable','true')
  }

// To enable header Editing
function EditHeader(ref_element){
  console.log(ref_element);
  // debugger
  $(ref_element).attr('contenteditable','true')
  }

// Call this function to change content or title of task
function onContentChange(task_id,updated_content,title){
  $.ajax({
    type:"GET",
    cache:false,
    url:'/updatecontent',
    dataType: "json",
    data:{taskid:task_id,updatedcontent:updated_content,is_title:title},    // multiple data sent using ajax
    success: function (result) {
      console.log(result['task'])
    }
    });
  }


// Called on Page Load
function onPageLoad()
{
  $( ".column" ).sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".contenteditable,.portlet-content,.portlet-header-content",
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
      .addClass( "ui-widget-header ui-corner-all" );
      // .prepend( "<span ondblclick='EditContent(this)' class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

  // $( ".portlet-toggle" ).click(function() {
  //                                         });
  //   var icon = $( this );
  //   // icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
  //   icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
  //   if ($(icon).hasClass('ui-icon-plusthick')){
  //       $(icon).closest(".portlet").find(".edit").hide()
  //   }
  //   else{
  //     $(icon).closest(".portlet").find(".edit").show()
  //   }
  // });
}