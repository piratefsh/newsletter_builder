// JavaScript Document

var templateLocation = "../ce_template/newsletter_template.html";
var templateStyleLocation = "../ce_template/newsletter_style.css";
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

        var $frame = $('iframe#preview');
        var doc = $frame[0].contentWindow.document;
        var head = $('head', doc);
        var body = $('body', doc);

        //set css in head
        var previewStyle = $('<style>');
        $(previewStyle).load(templateStyleLocation) ;
        $(head).html(previewStyle);


        //set body content
        $(body).load(templateLocation, function()
        {
            var bod = $frame.contents().find('body');

            var title = $('input[name=title]').val();
            var issue = $('input[name="issue"]').val();
            $('h1#title', bod).html(title);
            $('p#issue', bod).html(issue);

            //grab stories
            var stories = $('div.story').get();

            //content table to add stories to
            var content = $("<table class='content'></table>")
            for(var i = 0; i < stories.length; i++)
            {
                var currStory = stories[i];

                var storyTitle = $('input[name=title]', currStory).val();
                var storyDesc = $('textarea[name=description]', currStory).val();
                var storyEventDate = $('input[name=date]', currStory).val();
                var storyEventTime = $('input[name=time]', currStory).val();
                var storyEventVenue = $('input[name=venue]', currStory).val();
                var storyImageURL = $('input[name=imageurl]', currStory).val();

                var htmlTr = $('<tr></tr>');
                var htmlTd = $('<td></td>');
                var storyTable = $('<table class="innerstorytable"></table>');

                //TITLE AND DESCRIPTION
                var thisRow = $(storyRowTemplate);
                $('h2#storyTitle', thisRow).html(storyTitle);
                $('p#storyDesc', thisRow).html(storyDesc);
                
                
                //DATE TIME VENUE TABLE
                var dateTable = $(dateTimeVenueTemplate);
                if((storyEventTime != null && storyEventTime.length > 0)||(storyEventDate != null && storyEventDate.length > 0)||(storyEventVenue != null && storyEventVenue.length > 0))
                {
                    $('td.date', dateTable).html(storyEventDate);
                    $('td.time', dateTable).html(storyEventTime);
                    $('td.venue', dateTable).html(storyEventVenue);

                     //add datetime table
                    $('> td:first-child', thisRow).append(dateTable);
                }

                //IMAGE
                if(storyImageURL != undefined && storyImageURL.length > 0)
                {
                    var image = $(storyRowImageTemplate);
                    $('img', image).attr('src', storyImageURL); 

                    $(thisRow).append(image);
                }


                $(thisRow).appendTo($(storyTable));
                $(storyTable).appendTo($(htmlTd));
                $(htmlTd).appendTo($(htmlTr));

                $(content).append(htmlTr);
            }
			
			//add footer
			$('tbody.maintable').append($('tr.tfoot'));
			$('td#contentrow', bod).html(content);
			
            //populate HTML output
            var newsletterHTML = $frame.contents().find('html').html();
            $("#output").val(newsletterHTML);
        });
    });
};

var dateTimeVenueTemplate = '<table class="dates"><tr><td>Date</td> <td class="date">N/A</td></tr><tr><td>Time</td> <td class="time">N/A</td></tr><tr><td>Venue</td> <td class="venue">N/A</td></tr></table>';

var storyRowTemplate = '<tr><td><h2 id="storyTitle">Untitled</h2><p id="storyDesc">No description</p></td></tr>';

var storyRowImageTemplate ='<td id="storyImage"><img width=200px src="#"/></td>';
