$( document ).ready(function() {
  var query="https://yts.to/api/v2/list_movies.json";
  var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});


  $.ajax({
    dataType: "json",
    url:query,
    beforeSend: function() {
      $("#submit-btn").val('Sending....');
      $(".poster-container").empty();
      $(".poster-container").append(
        '<br><br>'+
        '<div class="three-quarters-loader">'+
        '</div>'
      );
       // change submit button text
    },
    success:function(data) {
      $(".poster-container").empty();
      $("#submit-btn").val('Search').fadeIn(100);
      console.log(data);
      if(data['data']['movie_count'] == 0 ) {
        $(".poster-container").append('<div class="error">'+
          '<br><br>'+
          '<h1>NO MOVIE FOUND</h1>'+
        '</div>'
          )
      }
      else{
        $.each(data['data']['movies'],function(i,movie) {
          $(".poster-container").append('<figure class="three columns wow fadeIn">'+
          '<img src="'+movie["medium_cover_image"]+'"/>'+
          '<figcaption><span class="tohide">'+movie["title_long"]+'</span>'+
          '<br><br>'+
          '<div class="caption-container">'+
            '<h4>'+movie['rating']+'</h4>'+
          '</div>'+
          '</figure>'

        )
      })
    }
   }
  });

  $("#axform").on('submit',function(e) {
    e.preventDefault();
    search=$(this).find("#exampleEmailInput").val();
    query = "https://yts.to/api/v2/list_movies.json?limit=50&query_term="+search;
    $.ajax({
      dataType: "json",
      url:query,
      beforeSend: function() {
        $('html, body').animate({
          scrollTop: $(".title").offset().top
        }, 1000);
        $("#submit-btn").val('Sending....');
        $(".poster-container").empty();
        $(".poster-container").append(
          '<br><br>'+
          '<div class="three-quarters-loader">'+
          '</div>'
        );
         // change submit button text
      },
      success:function(data) {

        $(".poster-container").empty();
        $("#submit-btn").val('Search').fadeIn(100);
        console.log(data);
        if(data['data']['movie_count'] == 0 ) {
          $(".poster-container").append('<div class="error">'+
            '<br><br>'+
            '<h1>NO MOVIE FOUND</h1>'+
          '</div>'
            )
        }
        else{
          $.each(data['data']['movies'],function(i,movie) {
            $(".poster-container").append('<figure class="three columns wow fadeIn">'+
              '<img src="'+movie["medium_cover_image"]+'"/>'+
            '<figcaption><span class="tohide">'+movie["title_long"]+'</span>'+
            '<br><br>'+
            '<div class="caption-container">'+
              '<h4>'+movie['rating']+'</h4>'+
              '<a class="button" href="'+movie['torrents']['url']+'">Download</a>'+
            '</div>'+
            '</figure>'

          )
        })
      }
     }
    });
  })
});
