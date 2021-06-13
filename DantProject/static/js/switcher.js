
{% load static %}
/*
	Delex by TEMPLATE STOCK
	templatestock.co @templatestock
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

/*-----------------------------------------------------------------------------------
/* Styles Switcher
-----------------------------------------------------------------------------------*/
{% block color% %}
<script type="text/javascript">

window.console = window.console || (function(){
	var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
	return c;
})();


jQuery(document).ready(function($) {
	

		$("ul.pattern .color1" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/green.css' %}" );
			return false;
		});
		
		$("ul.pattern .color2" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/pink.css' %}" );
			return false;
		});
		
		$("ul.pattern .color3" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/red.css' %}" );
			return false;
		});

		$("ul.pattern .color4" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/blue.css' %}" );
			return false;
		});
		$("ul.pattern .color5" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/violet.css' %}" );
			return false;
		});
		$("ul.pattern .color6" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/orange.css' %}" );
			return false;
		});
		$("ul.pattern .color7" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/dark-green.css' %}" );
			return false;
		});
		$("ul.pattern .color8" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/dark-blue.css' %}" );
			return false;
		});
		$("ul.pattern .color9" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/yellow.css' %}" );
			return false;
		});
		$("ul.pattern .color10" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/maroon.css' %}" );
			return false;
		});
		$("ul.pattern .color11" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/dark-gray.css' %}" );
			return false;
		});
		$("ul.pattern .color12" ).click(function(){
			$("#color-opt").attr("href", "{% static 'css/dark-orchid.css' %}" );
			return false;
		});
		
		$("#style-switcher .bottom a.settings").click(function(e){
			e.preventDefault();
			var div = $("#style-switcher");
			if (div.css("left") === "-189px") {
				$("#style-switcher").animate({
					left: "0px"
				}); 
			} else {
				$("#style-switcher").animate({
					left: "-189px"
				});
			}
		})
		
		$("ul.pattern li a").click(function(e){
			e.preventDefault();
			$(this).parent().parent().find("a").removeClass("active");
			$(this).addClass("active");
		})

		$("#style-switcher").animate({
			left: "-189px"
		}); 
				
	});

