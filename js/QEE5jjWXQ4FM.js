$(function () {
    if (shouldDisplayPopup()) {
        $("#popup_overlay").popup({
            transition: "all 0.3s",
            autoopen: true,
            scrolllock: true,
            onclose: function () {
                setCookie("emailme-do-not-show-popup");
            }
        });
    }
    if (shouldDisplayModal()) {
        $("#popup_modal").popup({
            transition: "all 0.3s",
            autoopen: true,
            scrolllock: true,
            onclose: function () {
                setCookie("hide-modal");
            }
        });
    }

    if (displaySuccessMessage()) {
        $('#overlay_content').addClass('hide');
        $('#successMessage').removeClass("hide").addClass('alert alert-success');
        $('#overlay_close').removeClass("hide").addClass('btn btn-primary pull-right');
        $('#successMessage').html("Thank you for signing up, you will begin receiving updates soon.");
        $('#trigger-emailme-popup').remove;
    }
    else if (displayErrorMessage()) {
        $('#privacyMessage').removeClass("hide").addClass('alert alert-danger');
        $('#overlay_close').removeClass("hide").addClass('btn btn-primary pull-right');
        $('#privacyMessage').html("Sorry there has been an error and we haven't been able to sign you up. Please try again.");
    }

    $(".beta_emailme").click(function (e) {
        e.preventDefault();
        setCookie("emailme-do-not-show-popup", 365);
        window.location = "//www.nottinghamshire.gov.uk/emailme";
    });

    $("#formSubmit").click(function (e) {
        if ($('#email').val().length === 0) {
            $('#email').addClass('alert-danger');
            e.preventDefault();
        }
        if (!$('#privacy').is(":checked")) {
            $('#privacyMessage').removeClass("hide").addClass('alert alert-danger');
            $('#privacyMessage').html("To sign up you must enter your email address and check the box to confirm that you consent to our data privacy policy");
            e.preventDefault();
        }
        if ($('#privacy').is(":checked") && $('#email').val().length > 0) {
            displaySuccessMessage();
        }
    });

    $("#signUp").click(function (e) {
        if ($('#email').val().length === 0) {
            $('#email').addClass('alert-danger');
            $('#privacyMessage').removeClass("hide").addClass('alert alert-danger');
            $('#privacyMessage').html("To sign up you must enter your email address");
            e.preventDefault();
        }

        if ($('#email').val().length > 0) {
            $("#popup_overlay").popup("hide");
            setCookie("emailme-do-not-show-popup", 365);
        }
    });

    $(".beta_block").click(function (e) {
        e.preventDefault();
        $("#popup_overlay").popup("hide");
        setCookie("emailme-do-not-show-popup", 365);
    });

    $(".beta_delay").click(function (e) {
        e.preventDefault();
        $("#popup_overlay").popup("hide");
        setCookie("emailme-do-not-show-popup");
    });

    $(".beta_info_close").click(function (e) {
        $("#popup_overlay").popup("hide");
    });

    $("#overlay_close").click(function (e) {
        $("#popup_overlay").popup("hide");
        setCookie("emailme-do-not-show-popup", 365);
    });

    $(".modal_block").click(function (e) {
        e.preventDefault();
        $("#popup_modal").popup("hide");
        setCookie("hide-modal", 365);
    });

    $(".modal_delay").click(function (e) {
        e.preventDefault();
        $("#popup_modal").popup("hide");
        setCookie("hide-modal");
    });
});

function setCookie(cookieName, duration) {
    $.cookie(cookieName, "true", { expires: duration });
    console.log($.cookie());
}

function clearCookie(cookieName) {
    $.removeCookie(cookieName, { path: "/" });
}

function shouldDisplayPopup() {
    var cookie = $.cookie("emailme-do-not-show-popup");
    var trigger = $("#trigger-emailme-popup");
    //if ($.cookie("emailme-do-not-show-popup")) {
    //	console.log("Cookie path is: " + $.cookie("emailme-do-not-show-popup"));
    //} else {
    //	console.log("no cookie!");
    //}
    //console.log("Location path is: " + window.location.pathname);
    if ((cookie === undefined) && trigger.length > 0) {
        return true;
   }

    return false;
}
function shouldDisplayModal() {
    var cookie = $.cookie("hide-modal");
    var trigger = $("#trigger-modal");
    //if ($.cookie("hide-modal")) {
    //	console.log("Cookie path is: " + $.cookie("hide-modal"));
    //} else {
    //	console.log("no cookie!");
    //}
    //console.log("Location path is: " + window.location.pathname);
    if ((cookie === undefined) && trigger.length > 0) {
        return true;
    }

    return false;
}
function displaySuccessMessage() {
    var cookie = $.cookie("emailme-do-not-show-popup");
    var signedUp = $.cookie("emailme");
    if (cookie === undefined && signedUp === "autosigned=OK") {
        return true;
    }

    return false;
}

function displayErrorMessage() {
    var cookie = $.cookie("emailme-do-not-show-popup");
    var signedUp = $.cookie("emailme");
    if (cookie === undefined && (signedUp !== undefined && signedUp.length > 13)) {
        return true;
    }
    return false;
}
