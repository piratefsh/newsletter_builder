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

     //Preview Button Listener
    $('input[name="show_preview"]').click(function()
    {
        var $frame = $('iframe#preview');

        if(!$($frame).is(":visible"))
        {
            $frame.show();
            $(this).val("Hide Preview");
        }
        else
        {
            $(this).val("Show Preview");
            $frame.hide();
        }
    });
    
    
    $('input[name="build"]').click(function()
    {
        //create new window for preview
        // var previewWindow = window.open(null, "preview");
        var previewStyle = $('<style>');
        $(previewStyle).load("../newsletter_style.css") ;
        // $(previewWindow.document.head).append(previewStyle);
        // previewWindow.document.title = "Preview Newsletter";
        
        var previewContent = $('<body>');
        previewContent

        // var title = $('input[name="title"]', form).val();
        // $('h1', previewContent).html("Hello World");
        // console.log($('h1', previewContent).html());

        var $frame = $('iframe#preview');
        var doc = $frame[0].contentWindow.document;
        var $head = $('head', doc);
        var $body = $('body', doc);

        $head.html(previewStyle);
        $body.load("../newsletter_template.html");
    });
}