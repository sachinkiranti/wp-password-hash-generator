(function ($) {

    var WphgManager = {
        init: function () {
            this.cacheDom();
            this.bind();
        },

        cacheDom: function () {
            this.$wphgWrapper = $('.wp-password-hash-generator-wrapper');
            this.generateBtn  = this.$wphgWrapper.find('.wphg-btn-generate');
            this.generateRandomBtn  = this.$wphgWrapper.find('.wphg-btn-generate-random');
            this.copyBtn  = this.$wphgWrapper.find('.wphg-btn-cp-clipboard');
            this.passwordEl  = this.$wphgWrapper.find('input[name=input_password]');
        },

        bind: function () {
            this.generateBtn.on('click', this.xhr);
            this.generateRandomBtn.on('click', this.generateRandomPassword);
            this.copyBtn.on('click', this.copy);
            this.passwordEl.on('blur', this.calculateStrength);
        },

        generateRandomPassword: function (e) {
            var passwordElement = $('input[name=input_password]');
            var password = Array(20).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$')
                .map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)]).join('');
            passwordElement.val(password)
            passwordElement.parents('.td-parent').find('.wphg-error').hide()
            WphgManager.calculateStrength()

            $('textarea[name=generated_hash]').val('')
            $('textarea[name=generated_sql]').val('')
        },

        calculateStrength: function () {
            var password = $('input[name=input_password]').val(),
                passwordMeter   = $('.wphg-password-strength')

            if(password.length <= 6) {
                passwordMeter
                    .css({
                        "background-color": "#F5BCA9",
                        "color": 'white'
                    })
                    .text("Very Weak")
                    .animate({width:'100%'},300);
            }

            if(password.length > 6 && (password.match(/[a-z]/) || password.match(/\d+/)
                || password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))){
                passwordMeter
                    .css({
                        "background-color": "#F5BCA9",
                        "color": 'white'
                    })
                    .text("Weak")
                    .animate({width:'100%'},300);
            }

            if(password.length > 6 && ((password.match(/[a-z]/) && password.match(/\d+/))
                || (password.match(/\d+/) && password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) || (password.match(/[a-z]/) && password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)))) {
                passwordMeter
                    .css({
                        "background-color": "#FF8000",
                        "color": 'black'
                    })
                    .text("Good")
                    .animate({width:'100%'},300);
            }

            if(password.length > 6 && password.match(/[a-z]/) && password.match(/\d+/)
                && password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
                passwordMeter
                    .css({
                        "background-color": "#00FF40",
                        "color": 'black'
                    })
                    .text("Strong")
                    .animate({width:'100%'},300);
            }

            passwordMeter.show()
        },

        xhr: function (e) {
            e.preventDefault()

            var $this = $(this), passwordElement = $('input[name=input_password]');

            // Check input validation
            if (!passwordElement[0].checkValidity()) {
                passwordElement.parents('.td-parent').find('.wphg-error').show()
                $this.prop('disabled', false);
                return false;
            } else {
                passwordElement.parents('.td-parent').find('.wphg-error').hide()
            }

            $this.prop('disabled', true);

            $.ajax({
                url: wphg_data.ajaxurl,
                type: 'POST',
                data: {
                    action: wphg_data.action,
                    password: passwordElement.val()
                },
                success: function (response) {
                    $('textarea[name=generated_hash]').val(response.hash)
                    $('textarea[name=generated_sql]').val(response.sql)
                    $this.prop('disabled', false);
                }
            });
        },

        copy: function (e) {
            e.preventDefault();

            var textData = $(this).parents('tr').find('input, textarea').val()

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(
                    textData
                );
            } else {
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val(textData).select();
                document.execCommand("copy");
                $temp.remove();
            }

        }
    }
    WphgManager.init();
}) (jQuery);