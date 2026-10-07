$(function ($) {

    //Global cookie acceptance banner

    var cookieMessage = document.getElementById('cookie-message')
    var cookieAcceptBtn = document.getElementById('accept-cookies');
    if (document.cookie.indexOf('acceptCookies=1') === -1) {
        cookieMessage.style.maxHeight = cookieMessage.scrollHeight + 60 + "px";;
		var acceptCookies = function () {
			cookieMessage.style.maxHeight = null;
			document.cookie = "acceptCookies=1;path=/;max-age=31536000";
		};
        cookieAcceptBtn.addEventListener('click', acceptCookies);
    }

    //Global cookie acceptance banner end

	var $table = $('#councillor-table');

	$(".show_more_services").on("click", function (e) {
		e.preventDefault();
		$(".all-services").toggleClass("d-none");
		$(this).toggleClass("button-active");
		$(".trending_tasks_filter").toggleClass("filter-show");
		$("#task_filter").focus().toggleClass("filter-input-active");
		$(".show_more_services_inactive").toggleClass("visually-hidden");
		$(".show_more_services_active").toggleClass("d-block");
	});

	$(".show_steps").on("click", function (e) {
		$(".show_steps_icon").toggleClass("hide");
		$(".steps").toggle();
	});

	$(".switcher_browse, .switcher_tasks").on("click", function (e) {
		e.preventDefault();
		if ($(this).hasClass("active")) {
		}
		else {
			$(".trending_tasks_box").toggleClass("hide");
			$(".browse_box").toggleClass("hide");
			$(".switcher_browse, .switcher_tasks").toggleClass("active");
		}
	});

	$(".transaction-requirement").on("click", function () {
		$(this).children(".checked").toggleClass("hide");
		$(this).children(".unchecked").toggleClass("hide");
	});

	$(function () {
		var hash = window.location.hash;
		if (hash === "#browsehome") {
			$(".trending_tasks_box").toggleClass("hide");
			$(".browse_box").toggleClass("hide");
			$(".switcher_browse, .switcher_tasks").toggleClass("active");
		}
	});



	//Adding noreferrer to any link to a Firmstep form or to consultation or jobs so that Google Analytics will see the journey as one visit and can be tracked
    $('[href*="forms.nottinghamshire.gov.uk"]').attr('rel', 'noreferrer');
    $('[href*="consult.nottinghamshire.gov.uk"]').attr('rel', 'noreferrer');
    $('[href*="nottinghamshire.tal.net"]').attr('rel', 'noreferrer');	

	//Image gallery macro - uses glide.min.js plugin
	var galleries = document.getElementsByClassName('image-gallery');

	function imageGallerySetup() {
	  var glide = galleries[i].querySelector('.glide'),
		  overlay = galleries[i].querySelector('.gallery-overlay'),
		  closeButton = galleries[i].querySelector('.gallery-overlay-close'),
		  slideshow = new Glide(glide, {
			type: 'carousel',
			animationDuration: 1000,
			dragThreshold: false,
			peek: 400,
			breakpoints: {
			  1500: {
				peek: 200
			  },
			  1200: {
				peek: 150
			  },
			  992: {
				peek: 100
			  },
			  768: {
				peek: 50
			  },
			  576: {
				peek: 25,
				gap: 5
			  }
			}
		  }).mount();
	  galleries[i].addEventListener('click', function (e) {
		e.preventDefault();
		if (e.target.tagName !== 'IMG') return;
		overlay.style.display = 'flex';
		slideshow.update({
		  startAt: e.target.dataset.startAt
		});
	  });
	  closeButton.addEventListener('click', function () {
		overlay.style.display = 'none';
	  });
	};

	for (var i = 0; i < galleries.length; i++) {
		imageGallerySetup();
	}

});

//Fast filter any list (modern, native, 0deps) (Remember to pass the selectors!):
function initListFilter(inputSelector, itemSelector) {
	const input = document.querySelector(inputSelector);
	const items = document.querySelectorAll(itemSelector);

	if (!input || !items.length) return;

	input.addEventListener('input', () => {
		const search = input.value.toLowerCase().trim();

		items.forEach(item => {
			const match = item.textContent.toLowerCase().includes(search);
			item.parentElement.hidden = !match;
		});
	});
}