$(document).ready(function() {

    //
    // Close Navigation Menu when links are clicked
    //
    var $toggle = $("#menu-button");
    var $links = $(".menu-link");
    var $main = $("#site-main");

    $links.on("click", function() {
      $toggle.prop("checked", false);
    });
    
    $main.on("click", function(event) {
      if (!$(event.target).closest("nav").length && $toggle.prop("checked")) {
        $toggle.prop("checked", false);
      }
    });

    // 
    // Navigation scrolling effect
    //
    $('#site-header a').click(function(e) {
      e.preventDefault();
      var jumpId = $(this).attr('href');
      var targetOffset = $(jumpId).offset().top - 5 * parseFloat($('body').css('font-size'));
      $('html, body').animate({scrollTop: targetOffset}, 'slow');
    });

    // 
    // Opens external links in new tabs
    //
     $('a').each(function() {
      var a = new RegExp('/' + window.location.host + '/');
      if (!a.test(this.href) || this.href.endsWith('.pdf')) {
        $(this).click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          window.open(this.href, '_blank');
        });
      }
    });
    

    // 
    // Contact Form
    //
    $("#contact-form").submit(function(event) {
      // Stop form from submitting normally
      event.preventDefault();
      
      // Get form data
      var formData = {
        'name': $('input[name=name]').val(),
        'email': $('input[name=email]').val(),
        'message': $('textarea[name=message]').val()
      };
      
      // Send form data to server using AJAX
      $.ajax({
        type: 'POST',
        url: 'contact-form-email.php',
        data: formData,
        dataType: 'json',
        encode: true
      })
      .done(function(data) {
        // Display success message
        alert(data.message);
        
        // Clear form fields
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        // Display error message
        alert(data.responseJSON.message);
      });
    });

    //
    // Photo Gallery Modal
    //
    const $gallery = $('#photo-gallery');
    const $modal = $('#modal');
    const $modalImage = $('#modal-image');
    const $closeModalButton = $('#close-modal');
  
    $gallery.on('click', 'img', function () {
      const imageSrc = $(this).attr('src');
      const altText = $(this).attr('alt');
      openModal(imageSrc, altText);
    });
  
    $closeModalButton.on('click', closeModal);
  
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  
    $modal.on('click', function (e) {
      if ($(e.target).is('#modal')) {
        closeModal();
      }
    });
  
    function openModal(imageSrc, altText) {
      if (shouldShowModal()) {
        $modal.addClass('show');
        $modalImage.attr('src', imageSrc);
        $modalImage.attr('alt', altText);
      }
    }
  
    function closeModal() {
      $modal.removeClass('show');
    }   
    
    function shouldShowModal() {
      return window.innerWidth >= 600;
    }

});