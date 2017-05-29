$(function () {
    var $tabs = $('.tabs')
    var $forms = $('.forms')
    var $formSignIn = $forms.find('#sign-in')
    var $formSignUp = $forms.find('#sign-up')
    var $signInInput = $('input[data-input="signIn"]')

    $tabs.on('click', 'div', function (e) {
        if (this === document.querySelector('div[data-tab="sign-in"]')) {
            $tabs.addClass('left').removeClass('right')
            // 存在连续点击bug
            $formSignUp.removeClass('active')
            setTimeout(function () {
                $formSignIn.addClass('active')
            }, 300);
        } else if (this === document.querySelector('div[data-tab="sign-up"]')) {
            $tabs.removeClass('left').addClass('right')
            $formSignIn.removeClass('active')
            setTimeout(function () {
                $formSignUp.addClass('active')
            }, 300);
        }
    })

    $signInInput.on('input change', (e) => {
        if ($signInInput.eq(0).val() !== "" && $signInInput.eq(1).val() !== "") {
            $formSignIn
                .find('button[data-button="sign-in"]')
                .prop('disabled', false)
                .removeClass("disabled")
        } else {
            $formSignIn
                .find('button[data-button="sign-in"]')
                .prop("disabled", true)
                .addClass("disabled")
        }
        if ($(e.currentTarget).val() === "") {
            $(e.currentTarget).removeClass('active')
        } else {
            $(e.currentTarget).addClass('active')
        }
    })
})
