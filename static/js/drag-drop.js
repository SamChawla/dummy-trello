$(document).ready(function(){
$(onPageLoad);
})    // End of document ready

// Saves text in 'portlet-content' on pressing ENTER
jQuery(document).on('keypress', '.portlet-content', function(e) {
  if (e.which == 13) {
    updated_content = e.currentTarget.innerText
    task_id = e.currentTarget.parentElement.id
    onContentChange(task_id,updated_content,false);
    $(e.currentTarget).removeAttr('contenteditable')
  }
});

// Saves text in 'portlet-header' on pressing ENTER
jQuery(document).on('keypress', '.portlet-header', function(e) {
  if (e.keyCode ==13 || e.which == 13) {
    updated_title = e.currentTarget.innerText
    task_id = e.currentTarget.parentElement.id
    onContentChange(task_id,updated_title,true);
    $(e.currentTarget).removeAttr('contenteditable')
  }
});

$(document).on("click",".close-btn",function(event){
  $(this).closest(".modal").hide()
})

$(document).on("submit",".tagForm",function(e){
  e.preventDefault();
  post_title = $(this).find("#tagTitle").val()
  post_token = $(this).find('input[name=csrfmiddlewaretoken]')[0].value

  $.ajax({
    type:"POST",
    cache:false,
    url:'/newtag',
    dataType: 'html',
    data:{title:post_title,csrfmiddlewaretoken:post_token},    // multiple data sent using ajax
    success: function (html) {
      console.log("Tag Created Successfully..!!")
      $("#mytagmodal").hide()
      $(".column-main").html(html)
      $(onPageLoad);
    }
    });
  }) // End of Tag Form


$(document).on("submit",".taskForm", function(e){
  e.preventDefault();
  post_title = $(this).find("#taskTitle").val()
  post_content = $(this).find("#taskContent").val()
  post_user_id = $(this).find("#user").val()
  post_status_id = $(this).find("#status").val()
  post_token = $(this).find('input[name=csrfmiddlewaretoken]')[0].value
  var that = this
  let data = {
    'title':post_title,
    'content':post_content,
    'user_id':post_user_id,
    'status_id':post_status_id,
    'csrfmiddlewaretoken':post_token,
  }
  $.ajax({
    type : "POST",
    url:'/newtask',
    dataType: 'html',
    data: data,    // multiple data sent using ajax
    success: function (html) {
        console.log("Task created Successfully..!!")
        $(that).closest(".modal").hide()
        $(".column-main").html(html)
        $(onPageLoad);
      }
    });
}) // End of Task Form

$(document).on("click",".confirm-delete-btn", function(e){
  task_id = parseInt($('input[name=delete-task]').val())
  url = "/deletetask/" + task_id
  $.ajax({
    type : "GET",
    url:url,
    dataType: 'html',
    success: function (html) {
        console.log("Task Deleted Successfully..!!")
        $("#confirm-delete").hide()
        $(".column-main").html(html)
        $(onPageLoad);
      }
    });
})  // End of Delete Task

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
    dataType: "html",
    data:{taskstatusid:task_status_id, taskid:task_id,taskorder:order,csrfmiddlewaretoken:token},    // multiple data sent using ajax
    success: function (html) {
      $(".column-main").html(html)
      $(onPageLoad);
    }
    });
  }

// Call this function to change content or title of task
function onContentChange(task_id,updated_content,title){
  var token = jQuery("[name=csrfmiddlewaretoken]").val();
  var title_id = "#title-"+ task_id.toString()
  var content_id = "#content-" + task_id.toString()
  $.ajax({
    type:"POST",
    cache:false,
    url:'/updatecontent',
    dataType: "json",
    data:{taskid:task_id,updatedcontent:updated_content,is_title:title,csrfmiddlewaretoken:token},    // multiple data sent using ajax
    success: function (data) {
      if(title){
        $(title_id).innerText = data
      }
      else {
        $(content_id).innerText = data
      }
    }
    });
  }

  function newTask(ref_element){
    $(ref_element).parent().parent().find(".modal").show()
  }
  
  function newTag(ref_element){
    $("#mytagmodal").show()
  }

  function deleteTask(ref_element){
    $(".delete-task-title")[0].innerText = $(ref_element).data("title");
    $('input[name=delete-task]').val($(ref_element).data("id"));
    $("#confirm-delete").show()

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