// JavaScript Document

$(document).ready()
{
    var form = $('#basic');
    var div = $('div#storyID1');
    var storyID = 1;
    
    //Remove Story Button Listener
    $('input[name="remove_story"]').click(function()
    {
        var all = $('div.story');
        
        if(all != null && all.length > 1)
        {
            var elem = all[all.length - 1];
            $(elem).fadeOut("fast", function()
            { 
                $(this).remove();
            }); 
        }
    });
    
    //Add Story Button Listener
    $('input[name="add_story"]').click(function()
    {
        var copy = $(div).clone(true, true);
        
        //Prep fields and IDs
        //empty fields  before appending
        $('input[type=text]', copy).val("");
        
        //set uniqueID
        $(copy).attr('id', "storyID" + ++storyID);
       
        //set event radio group ID
        $("div.event_details input[type=radio]", copy).attr('name', "eventID" + storyID);
        
        //add to form above add remove buttons
        copy.hide().appendTo(form).fadeIn("fast");
        form.append($('div#add_remove'));

    });


    //Event Radio Button Listener
    $('input[class="event"]').click(function()
    {
        console.log("clicked");
        var checked = $(this);

        //get parent  story div
        var parentStory = $(this).parents("div.story")[0];
 
       if(checked.val() == "no")
        {
            $('div.isevent', parentStory).fadeOut("fast", function()
            { 
                $(this).hide();
            }); 
        }
        else if(checked.val() == "yes")
        {
            $('div.isevent', parentStory).fadeIn("fast", function()
            { 
                $(this).show();
            }); 
        }
    });
    
    
    $('input[name="build"]').click(function()
    {
        //create new window for preview
        var previewWindow = window.open();
        var previewContent = $('<style>');

        console.log($(previewContent).html());
        $(previewWindow.document.body).load("../newsletter_template.html"); 

        $(previewContent).load("../newsletter_style.css") ;
        $(previewWindow.document.head).append(previewContent);
        previewWindow.document.title = "Preview Newsletter";

        $("section#preview").html($(previewContent).html())
    });
}