$(function() {
  $(document).on('turbolinks:load', function() {
    function buildHTML(message) {
      var image = (message.image) ? `<img class="lower-message__image" src="${message.image}">` : "";
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div>`
      return html;
    }
    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.form__message').val('');
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('error');
      });
    });

    var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        $.ajax({
          url: location.href,
          type: 'GET',
          dataType: 'json'
        })
        .done(function(data) {
          var id = $('.message:last').data('messageId');
          var insertHTML = '';
          data.messages.forEach(function(message) {
            if (message.id > id) {
              insertHTML += buildHTML(message);
            }
          });
          $('.messages').append(insertHTML);
          if (insertHTML) {
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }
        })
        .fail(function(data) {
          alert('自動更新に失敗しました');
        });
      } else {
        clearInterval(interval);
      }
    }, 5 * 1000 );
  });
});













