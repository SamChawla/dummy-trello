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

$(".close").on("click",function(event){

  $(this).closest(".modal").hide()
})

$("#task-form").on("submit",function(e){
  debugger
  $.ajax({
    type:"GET",
    cache:false,
    url:'/new-task',
    dataType: "json",
    data:{},    // multiple data sent using ajax
    success: function (result) {
      console.log(result['task'])
    }
    });

})

})

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

// Call this function to update task status
function onTaskChange(task_status_id,task_id,order){
  $.ajax({
    type:"GET",
    cache:false,
    url:'/update',
    dataType: "json",
    data:{taskstatusid:task_status_id, taskid:task_id,taskorder:order},    // multiple data sent using ajax
    success: function (result) {
      console.log(result['task'])
    }
    });
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

  function newTask(ref_element){
    $(ref_element).parent().parent().find(".modal").show()
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
      var task_status_id = $(task_item.parent()[0]).data("task-id")
      var order = ($(task_item.parent()).sortable("toArray"))
      var json_order = JSON.stringify(order)
      console.log(task_id)
      console.log(task_status_id) 
      console.log(json_order)
      onTaskChange(task_status_id,task_id,json_order);

    }
  });

  $( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
      .addClass( "ui-widget-header ui-corner-all" );
      // .prepend( "<span ondblclick='EditContent(this)' class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
}