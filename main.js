let $tabs = $('.tabs')
let $form = $('.forms')
var $formSignIn = $form.find('#sign-in')
var $formSignUp = $form.find('#sign-up')
console.log($formSignIn, $formSignUp)
$tabs.on('click', 'div', function (e) {
    if (this === document.querySelector('div[data-tab="sign-in"]')) {
        $tabs.addClass('left').removeClass('right')
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