var basic = document.getElementById('plan-title-basic');
document.getElementById('plan-button-basic').addEventListener("mouseover", function(){
	basic.style.background = "#49cbcd";
	this.addEventListener("mouseout", function(){
		basic.style.background = "";
	});
});

var pro = document.getElementById('plan-title-pro');
document.getElementById('plan-button-pro').addEventListener("mouseover", function(){
	pro.style.background = "#49cbcd";
	this.addEventListener("mouseout", function(){
		pro.style.background = "";
	});
});

var premium = document.getElementById('plan-title-premium');
document.getElementById('plan-button-premium').addEventListener("mouseover", function(){
	premium.style.background = "#49cbcd";
	this.addEventListener("mouseout", function(){
		premium.style.background = "";
	});
});


/*slider*/

$('.slider').slick({
    dots: false,
    draggable: false
  });

/*navigation*/

$( ".hide_nav" ).click(function() {
	$('.hide_nav').toggleClass('active');
  $( ".nav_list" ).slideToggle( "slow" ).css('display','block');
});

/*validation*/

$(function() {
	$('#js-form').validate({

		rules: {
			form_name: {
				required:true
			},
			form_email: {
				required: true,
				email: true
			},
			form_message: {
				required: true
			}
		}
	});
});


