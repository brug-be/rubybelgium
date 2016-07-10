/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
$(function(){$(".page-scroll").click(function(t){var l=$(this);$("html, body").stop().animate({scrollTop:$(l.attr("href")).offset().top},1500,"easeInOutExpo"),t.preventDefault()})}),$("body").scrollspy({target:".navbar-fixed-top"}),$(".navbar-collapse ul li a").click(function(){$(".navbar-toggle:visible").click()});