let $tabs = $('.tabs')
$tabs.on('click','div',function(e){
    if(this === document.querySelector('div[data-tab="sign-in"]')){
        $tabs.addClass('left').removeClass('right')
    }else if (this === document.querySelector('div[data-tab="sign-up"]')){
        $tabs.removeClass('left').addClass('right')
    }
})