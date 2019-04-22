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

$(".close-btn").on("click",function(event){

  $(this).closest(".modal").hide()
})

$(".taskForm").on("submit",function(e){
  e.preventDefault();
  post_title = $(this).find("#taskTitle").val()
  post_content = $(this).find("#taskContent").val()
  post_user_id = $(this).find("#user").val()
  post_status_id = $(this).find("#status").val()
  post_token = $(this).find('input[name=csrfmiddlewaretoken]')[0].value

  $.ajax({
    type:"POST",
    cache:false,
    url:'/newtask',
    dataType: "json",
    data:{title:post_title,content:post_content,user_id:post_user_id,status_id:post_status_id,csrfmiddlewaretoken:post_token},    // multiple data sent using ajax
    success: function (html) {
      console.log("Success..!!")
      $(this).closest(".modal").hide()
      debugger
    }
    });

})

$(".tagForm").on("submit",function(e){
  e.preventDefault();
  post_title = $(this).find("#tagTitle").val()
  post_token = $(this).find('input[name=csrfmiddlewaretoken]')[0].value

  $.ajax({
    type:"POST",
    cache:false,
    url:'/newtag',
    dataType: "json",
    data:{title:post_title,csrfmiddlewaretoken:post_token},    // multiple data sent using ajax
    success: function (html) {
      console.log("Tag Created..")
      alert("------------")
    },
    failure: function (html) {
      console.log("Tag Creation Failed ..")
      alert("------------")
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
  $(ref_element).attr('contenteditable','true')
  }

// Call this function to update task status
function onTaskChange(task_status_id,task_id,order){
  var token = jQuery("[name=csrfmiddlewaretoken]").val();
  $.ajax({
    type:"POST",
    cache:false,
    url:'/update',
    dataType: "json",
    data:{taskstatusid:task_status_id, taskid:task_id,taskorder:order,csrfmiddlewaretoken:token},    // multiple data sent using ajax
    success: function (html) {
      debugger
    }
    });
  }

// Call this function to change content or title of task
function onContentChange(task_id,updated_content,title){
  var token = jQuery("[name=csrfmiddlewaretoken]").val();
  $.ajax({
    type:"POST",
    cache:false,
    url:'/updatecontent',
    dataType: "json",
    data:{taskid:task_id,updatedcontent:updated_content,is_title:title,csrfmiddlewaretoken:token},    // multiple data sent using ajax
    success: function (html) {
      debugger
    }
    });
  }

  function newTask(ref_element){
    $(ref_element).parent().parent().find(".modal").show()
  }
  
  function newTag(ref_element){
    $("#mytagmodal").show()
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