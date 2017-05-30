$(function () {
    var $tabs = $('.tabs'),
        $forms = $('.forms'),
        $formSignIn = $forms.find('#sign-in'),
        $formSignUp = $forms.find('#sign-up'),
        $signInInput = $('input[data-input="signIn"]'),
        $signUpInput = $('input[data-input="signUp"]'),
        $signUpButton = $formSignUp.find('button[data-button="sign-up"]'),
        $signInButton = $formSignIn.find('button[data-button="sign-in"]')

    let leanCloudErrorCodeMsg = {
        124: "网络异常，请刷新页面",
        125: "此邮箱地址无效",
        126: "用户名错误",
        200: "用户名为空",
        201: "密码为空",
        202: "用户名已存在",
        203: "邮箱已存在",
        210: "用户名或密码错误",
        211: "找不到该账号",
        216: "未验证的邮箱地址",
        217: "无效用户名，不允许为空",
        218: "无效的密码，不允许为空",
        219: "登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码",
        502: "服务器维护"
    }

    // leancloud
    var APP_ID = 'xydukidyw7kNN86XS9JlXVg4-gzGzoHsz';
    var APP_KEY = 'JQJmE5Wz2lSAxwinXtNVDDvy';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    var user = new AV.User();

    $formSignUp.on('submit', function (e) {
        e.preventDefault()
        let $username = $(this)[0].username.value,
            $email = $(this)[0].email.value,
            $password = $(this)[0].password.value;

        leanCloudSignUp($username, $email, $password)

    })


    // tabs animation
    $tabs.on('click', 'div', function (e) {
        if (this == document.querySelector('div[data-tab="sign-in"]')) {
            $tabs.addClass('left').removeClass('right')
            // 存在连续点击bug
            $formSignUp.removeClass('active')
            setTimeout(function () {
                $formSignIn.addClass('active')
            }, 300);
        } else if (this == document.querySelector('div[data-tab="sign-up"]')) {
            $tabs.removeClass('left').addClass('right')
            $formSignIn.removeClass('active')
            setTimeout(function () {
                $formSignUp.addClass('active')
            }, 300);
        }
    })
    // sign in | sign up input animation 
    $signInInput.on('input change', (e) => {
        $signInInput.removeClass("error")
        resetErrorMsg()

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
        if ($(e.currentTarget).val() == "") {
            $(e.currentTarget).removeClass('active')
                .siblings('p').removeClass('active')
        } else {
            $(e.currentTarget).addClass('active')
                .siblings('p').addClass('active')
        }
    })
    $signUpInput.on('input change', (e) => {
        $signUpInput.removeClass("error")
        resetErrorMsg()

        if ($signUpInput.eq(0).val() !== "" && $signUpInput.eq(1).val() !== "" && $signUpInput.eq(2).val() !== "") {
            $formSignUp
                .find('button[data-button="sign-up"]')
                .prop('disabled', false)
                .removeClass("disabled")
        } else {
            $formSignUp
                .find('button[data-button="sign-up"]')
                .prop("disabled", true)
                .addClass("disabled")
        }
        if ($(e.currentTarget).val() == "") {
            $(e.currentTarget).removeClass('active')
                .siblings('p').removeClass('active')
        } else {
            $(e.currentTarget).addClass('active')
                .siblings('p').addClass('active')
        }
    })

    function leanCloudSignUp(username, email, password) {
        let whichForm = "sign-up"
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email)
        user.signUp().then(function (loginedUser) {
            console.log(loginedUser);
        }, (function (error) {
            console.log(typeof (error), typeof (error.code))
            setError(error.code, whichForm)
        }));

    }

    function setError(code, whichForm) {
        let errorInputs = (whichForm === "sign-in") ? $signInInput : $signUpInput
        setErrorStyle(errorInputs)
        setErrorMsg(code, errorInputs)

    }
    function setErrorStyle(whichInput) {
        whichInput.addClass("error")
        whichInput.addClass("error")
    }

    function setErrorMsg(code, errorInputs) {
        let msg = leanCloudErrorCodeMsg[code]
        let $span
        if (/125|203|216/.test(code)) {
            // email error
            $span = errorInputs.filter('input[type="email"]').parent().find('span')
        } else if (/126|200|202|211|217/.test(code)) {
            // username error
            $span = errorInputs.filter('input[type="text"]').parent().find('span')

        } else if (/201|210|218/.test(code)) {
            // password error
            $span = errorInputs.filter('input[type="password"]').parent().find('span')
        }
        $span.text(msg).addClass('error')
    }
    function resetErrorMsg() {
        $forms.find('p span').removeClass("error")
    }


})
