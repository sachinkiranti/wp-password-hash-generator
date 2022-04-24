(function ($) {

    var WphgManager = {
        init: function () {
            this.cacheDom();
            this.bind();
        },

        cacheDom: function () {
            this.$wphgWrapper = $('.wp-password-hash-generator-wrapper');
            this.generateBtn  = this.$wphgWrapper.find('.wphg-btn-generate');
            this.copyBtn  = this.$wphgWrapper.find('.wphg-btn-cp-clipboard');
        },

        bind: function () {
            this.generateBtn.on('click', this.xhr);
            this.copyBtn.on('click', this.copy);
        },

        xhr: function (e) {
            e.preventDefault()

            var $this = $(this), passwordElement = $('input[name=input_password]');

            // Check input validation
            if (!passwordElement[0].checkValidity()) {
                passwordElement.siblings('.wphg-error').show()
                $this.prop('disabled', false);
                return false;
            } else {
                passwordElement.siblings('.wphg-error').hide()
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