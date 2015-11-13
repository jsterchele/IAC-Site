var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];

$(window).resize(function() {
  sizeLayerControl();
  if ($(this).width() <  768)
  {
     $(".halfs").height("50%");
  }
  else
  {
     $(".halfs").height("100%");
  }
});

  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
   });


$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});


function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

$("#passage-max").on("click", function(e){
  $("#left-container").show();
  width = $("#left-container").width() / $(document).width() * 100; 
  if(width < 90)
  {
      $("#left-container").width("100%");
      $("#reading-container").hide();
  }
  else
  {
      $("#left-container").attr( "style", "" );
      $("#reading-container").attr( "style", "" );
      $("#reading-container").show();
  }
  map.invalidateSize();
});


$("#reading-max").on("click", function(e){
  $("#reading-container").show();
  width = $("#reading-container").width() / $(document).width() * 100; 
  if(width < 90)
  {
      $("#reading-container").width("90%");
      $("#left-container").hide();
  }
  else
  {
      $("#left-container").attr( "style", "" );
      $("#reading-container").attr( "style", "" );
      $("#left-container").show();
  }
  map.invalidateSize();
});


/***
This function will hide the story/theme if it does not exist in the passage.  It will also make the passage number centered
***/
function checkStory()
{
  if( $("#passage-name").html() == "" )
  {
     $("#passage-name").hide();
     $("#passage-number").removeClass("col-xs-6").addClass("col-xs-12");
  }
  else
  {
     $("#passage-name").show();
     $("#passage-number").removeClass("col-xs-12").addClass("col-xs-6"); 
  }
}
     
    /***
    This function will opne a modal when a view media button has been clicked
     ***/ 
 function mediaButtons(){     
    $(".mBtn").click(function(){
        console.log("YUPPP");
        $("#modal-title").html("");
        $("#modal-media").html("");
        $("#modal-body").html("");
        $("#modal-footer").html("");
    
    //gets the id of the button.  Also this id doubles as the array of the media object
        var id = $(this).attr('id');
        //adds info to the modal
        if( id == "media1")
        {
           media = media1;
        }
        else if( id == "media2")
        {
           media = media2;
        }
        else if( id == "media3")
        {
           media = media3;
        }
        else if( id == "media4")
        {
           media = media4;
        }
        
       //setting all of the text for the modal
       
       
        $(".modal-title").html(media[0]);
        $(".modal-body").html(media[2]);
        $(".modal-footer").html(media[3]);
        
        //creating the proper format for the media
        var source = "";
        
        //if it is not a youtube video/pdf/txt, put it in a img tag
        if( null == ( media[1].match(/pdf/i) || media[1].match(/txt/i) || media[1].match(/youtube.com/) ) )
        {
           source = "<img src='"+ media[1] + "'></img>";
        }
        else //throw it in a iframe tag
        {
           source = "<iframe height='100%' width='100%' class='notInline' src='"+ media[1] + "'></iframe>";
    	}
    	$(".modal-media").addClass("frame");
        $(".modal-media").html(source);
  
        //opens the modal
        $("#mediaModal").modal();   
    });
 }




   

//If the "next" button is clicked, it will load the next passage.
$("#next").on("click", function(e){
  passageId++;
  getPassage(passageId);
});

//If the "Previous" button is clicked, it will load the previous passage.
$("#previous").on("click", function(e){
  passageId--;
  getPassage(passageId);
});



/*
This function should be loaded everytime a new passage is loaded. It will check if there is a next passage.
*/
function disableButtons(){

  
  if(passageId == numPassages)
  {
    $('#next').prop('disabled', true); //Disables the next button if the user is at the end of the book.
  }
  else
  {
    $('#next').prop('disabled', false);
  }
  
  if(passageId == 0)
  {
    $('#previous').prop('disabled', true); //Disables the previous button if the user is at the beginning of the book.
  } 
  else
  {
    $('#previous').prop('disabled', false);
  }
}


/**This function grabs a passage by its Passage Number.
It will then set all of the HTML reading container fields.
@param pasId the number of the passage.*/
function getPassage(passageId){

//resets media-container
$( " #media-container " ).html("");


//saves the passageIdNum into local storage if possible.
savePassageID(passageId);
//Changes the passage ID into a passage Number
pasNum = passageNumbers[passageId].passage_number;
//This grabs a Service that given a passage number, will return all of the infomration regarding the passage.
$.getJSON('http://imaginingancientcorinth.com/cms/rest/views/rest_api?filters[num]='+pasNum , function (data) {
console.log(data);
    $("#passage-number").html(data[0].passage_number);
    $("#passage-name").html(data[0].story);
    $("#pre-content").html(data[0].pre_q);
    $("#post-content").html(data[0].post_q);
    $("#passage-content").html( glossWords(data[0].words, data[0].body) );
    $("#question-content").html(data[0].question);
    var content = $('#passage-content').html();
    $("#text-content").html(content);
    mediaToDiv(data[0].media, data[0].media2, data[0].media3, data[0].media4);
    //if the site has gps data, pan to the site.
    if(data[0].lat != null && data[0].lon != null)
     { 
        map.panTo([data[0].lon, data[0].lat], 
        {
            animate:true, 
            duration:3
        });
     }  //checks if any of the buttons must be disabled.
        disableButtons();
        checkStory();
        mediaButtons();
  });
  map.invalidateSize();
  $(" #text-content ").hide();
}

/**This function grabs a passage by its Passage Number.
It will then set all of the HTML reading container fields.
@param pasId the number of the passage.*/
function getPassage1(pasNum){
console.log('dogballs');
savePassageID(0);
//This grabs a Service that given a passage number, will return all of the infomration regarding the passage.
$.getJSON('http://imaginingancientcorinth.com/cms/rest/views/rest_api?filters[num]='+pasNum , function (data) {
    $("#passage-number").html(data[0].passage_number);
    $("#passage-name").html(data[0].story);
    $("#pre-content").html(data[0].pre_q);
    $("#post-content").html(data[0].post_q);
    $("#passage-content").html( glossWords(data[0].words, data[0].body) );
    $("#question-content").html(data[0].question);
    var content = $('#passage-content').html();
    $("#text-content").html(content);
    mediaToDiv(data[0].media, data[0].media2, data[0].media3, data[0].media4);
    //if the site has gps data, pan to the site.
    if(data[0].lat != null && data[0].lon != null)
     { 
        map.panTo([data[0].lon, data[0].lat], 
        {
            animate:true, 
            duration:3
        });
     }  //checks if any of the buttons must be disabled.
        disableButtons();
        checkStory();
  });
  map.invalidateSize();
  $(" #text-content ").hide();
  mediaButtons();

}


/***
This function will save the passageID via HTML 5's internal storage feature 
 ***/
function savePassageID(id){ 
 // Check browser support
if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("passageIdNum", id);
  }
}


/***
This function will retrieve the PassageID via HTML 5's internal storage feature
 ***/
 function getPassageID(){
  // Check browser support
if (typeof(Storage) !== "undefined") {
  //return the passageIdNum
    var passid = localStorage.getItem("passageIdNum");
    if ( passid < 0 )
    {
       passid = 0;
    }
    return passid;
 }
 else
 {
    return 0;
 }
}

/**Retrieves the passage **/
function retrievePassage(){
    if(getPassageID() ==  ('null' || 'NaN') )
    {
      getPassage1('1.1.1');
    }
    else
    {
      console.log('not one');
      getPassage(getPassageID());
    }
}

/***
This function is used for glossing words.
@param str a string of the words that needs to be glossed, with their definition.
@param body the text that contains words that needs to be glossed.
@return body the body with tags included so words can become glossed.
***/
function glossWords(str, body) {
if( str != null )
   {
   //replacing all of the '&#039;' with quotation marks.
    str = str.replace(/&#039;/g, '"');
    str = str.replace(/&quot;/g, '"');
    //matching from first quotation mark to second quotation mark.
    var res = str.match(/".*?"/gi);

    //creating two arrays to hold the words that should become glossed, and their definitions.
    glossedWords = [];
    tidyWords = [];

    for (var i = 0; i < res.length; i++)
    {
      //strips spaces and takes away quotation marks
      res[i] = res[i].replace(/"\s+/, "");
      res[i] = res[i].replace(/\s+"/, "");
      res[i] = res[i].replace(/"/g, "");
      if(i % 2 == 0 )
      {
        glossedWords.push( res[i] ); 
      }
      else
      {
        tidyWords.push( res[i] );
      }
    }

    for(var j = 0; j < glossedWords.length; j++)
    {
      body = body.replace(glossedWords[j], '<a href="#" data-toggle="tooltip" title="' + tidyWords[j] + '">' + glossedWords[j] + '</a>');
    }
  }
    return body;
}

/**
This function will take the service provided from Drupal and break it into its 4 seperate parts -- Title, URL, Description, Credits -- and return them in an array
@param str the services string returned
@return picture an array that contains Title, URL, Description, Credits of file
**/
function getMedia(str){
	str = str.split("<a href=");
        	
        //getting the title
        t = str[1].match(/>.*</);
        title = t[0].replace(/>/, "").replace(/<\/a></, "");
        
        var index = 5;
        if( str.length == 5 )
        {
        	index = 2;
        }
        
        
        //getting file url
        u = str[index].match(/".*?"/);
        url = u[0].replace(/"/g, "");
        if( url.match(/watch?/) != null )
        {
            url = url.replace(/watch\?/, "v?");
        }
        
       
        dc = str[index].split(":&nbsp;");
        //getting description
        desc = dc[1].replace(/Credits/, "").replace(/<br.*\/>/g, "").trim();
        
        //getting credits
        if( dc[2] != null )
        {
        	cred = dc[2].replace(/<br.*\/>/g, "").trim();
        }
        else
        {
        	cred = null;
        } 
        
        
        picture = [title, url, desc, cred];
        return picture;
} 
    
/***
This function will take 4 media strings and convert them into divs to display in the media container.
@param m1 m2 m3 m4 Strings from services call back
****/
function mediaToDiv(m1, m2, m3, m4){
    var count = 0;
    media1 = null;
    media2 = null;
    media3 = null;
    media4 = null;	
    
    if( m1 != null )
    {
    	media1 = getMedia(m1);

  	count++;
    }

    
    if( m2 != null )
    {
    	media2 = getMedia(m2);
    	console.log(media2);
    	count++;
    }

    
    if( m3 != null )
    {
    	media3 = getMedia(m3);
    	console.log(media3);
    	count++;
    }

    
    if( m4 != null )
    {
    	media4 = getMedia(m4);
    	console.log(media4);
    	count++;
    }
    
    for( var i = 1; i <= count; i++ )
    {
        if( i == 1)
        {
           media = media1;
        }
        else if ( i == 2)
        {
           media = media2;
        }
        else if ( i == 3 )
        {
           media = media3;
        }
        else
        {
           media = media4;
        }
        
        var width = 100 / count ;
        var style = "style='align:center; float:left; height:95%; width:" + width + "%;'";
        var source = null;
        
        //if there is only one media item.
        if ( width == 100 )
        {
           style = "style='align:center; height:95%; width:50%; margin:auto;'";
           //if it is not a youtube video/pdf/txt, put it in a img tag
           if( null == ( media[1].match(/pdf/i) || media[1].match(/txt/i) || media[1].match(/youtube.com/) ) )
           {
              source = "<div " + style + "><img class='modz' id='m" + i + "'src='"+ media[1] + "' height='82%' width='100%' align='top middle'></img><button id='media" + i  + "' class=' mBtn btn btn-inverse btn-large'>View Media</button></div>";
           }
           else //throw it in a iframe tag
           {
              source = "<div " + style + "><iframe class='modz' id='m" + i + "'src='"+ media[1] + "' height='80%' width='100%'></iframe><button id='media" + i + "' class='mBtn btn btn-inverse btn-large'>View Media</button></div>";
    	   }
        }
        else
        { 
           //if it is not a youtube video/pdf/txt, put it in a img tag
           if( null == ( media[1].match(/pdf/i) || media[1].match(/txt/i) || media[1].match(/youtube.com/) ) )
           {
              source = "<div " + style +"><img class='modz' id='m" + i + "'src='"+ media[1] + "'  height='82%' width='100%' align='top'></img><button id='media" + i  + "' class=' mBtn btn btn-inverse btn-large'>View Media</button></div>";
           }
           else //throw it in a iframe tag
           {
              source = "<div " + style + "><iframe class='modz' id='m" + i + "'src='"+ media[1] + "' height='80%' width='100%'></iframe><button id='media" + i + "' class='mBtn btn btn-inverse btn-large'>View Media</button></div>";
    	   }
    	} 
    	var div = $(source);
	$("#media-container").append(div);
    }
}
    