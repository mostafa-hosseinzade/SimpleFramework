
        
$(document).ready(function() {
    $('button').click(function(){
		$('#nav').slideToggle('slow');	
	})
     $(function () {
  $('[data-toggle="popover"]').popover()
}) 


  //////////////////////////////////// show more //////////////////////////////////      
         $('#beauty_more').click(function(){
             var star=$('#star').val();
            $.get("http://localhost/barber/public/beauty/more",{star:star},function(data){
            $('#beauty').append(data);
            if(data=='')
            {
              $('#beauty_more').hide();
            }
          });
         });
         
        $('#health_more').click(function(){
            var star=$('#star').val();

            $.get("http://localhost/barber/public/health/more",{star:star} ,function(data){
                $('#health').append(data);
                if(data=='')
                {
                    $('#health_more').hide();
                }
            });
        });

         $('#play_more').click(function(){
             var star=$('#star').val();
            $.get("http://localhost/barber/public/play/more",{star:star},function(data){
            $('#play').append(data);
             if(data=='')
            {
              $('#play_more').hide();
            }
          });
         });

         $('#movie_more').click(function(){
             var star=$('#star').val();
            $.get("http://localhost/barber/public/movie/more",{star:star},function(data){
            $('#movie').append(data);
             if(data=='')
            {
              $('#movie_more').hide();
            }
          });
         });

         $('#news_more').click(function(){
             var star=$('#star').val();
            $.get("http://localhost/barber/public/news/more",{star:star},function(data){
            $('#news').append(data);
             if(data=='')
            {
              $('#news_more').hide();
            }
          });
         });

         $('#other_more').click(function(){
             var star=$('#star').val();
            $.get("http://localhost/barber/public/other/more",{star:star},function(data){
            $('#other').append(data);
             if(data=='')
            {
              $('#other_more').hide();
            }
          });

         });
         
         $('.google').mouseenter(function(){
           
            $('.google').animate({
                "right":"-=50px"
            },"slow") 
         });
          $('.google').mouseleave(function(){
           
            $('.google').animate({
                "right":"+=50px"
            },"slow") 
         });
         
         
///////////////////////////////////////////////////////// end show more /////////////////////////////////////////////
});

//----------------------------------------------------------------------------
// search advanced
//----------------------------------------------------------------------------
$(document).on("submit", ".ajax-form", function() {
  var form = $(this),
      action = form.attr('action'),
      method = form.attr('method'),
      dataSerialize = form.serialize();
   
  var request = $.ajax({
    type: method,
    url: action,
    data: dataSerialize
  });
   
  request.done(function(data) {
      $('#search').css('display','block');
     $('#search').append(data);
       $('html, body').stop().animate({
                        scrollTop: $('#search').offset().top - 54
                    }, 1200);
  });
   
  request.fail(function() {
      alert('اشکال در ارسال اطلاعات لطفا صفحه را دوباره بارگزاری کنید و عبارت مورد نظر را جستجو کنید');
  });
   
  return false;
});
/////////////////////////////////////////////////////// end search advanced /////////////////////////////////////////////////


            


//  function pagination_health()
// {
//  value='2';
//  $.get('../show_result/search',{search:value},function(data){
//
//    $('.health22').html(data);
//
// });
// } 
  $(document).ready(function(){
      $('.asli').click(function(){
          $('.show_search').css("display","none");
          
      })
      
      $('#show_search').click(function(){
          $('.show_search').css("display","block")
          
      })
      

     
  })          




