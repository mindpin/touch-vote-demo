function is_correct_vote(check_items, select_item) {
  select_item_count = select_item['count']
  // alert(select_item_count)

  for (var i = 0; i < check_items.length; i++) {
    item = check_items[i]
    if (item['count'] > select_item_count) {
      return false
    }
  }

  return true
}

function ajax_get_list(result) {
  result = typeof result !== 'undefined' ? result : true;


  var number = $('#number').val()
  var prepare_fields = $('#prepare_fields').val()
  var type = $('#type').val()

  $.ajax({
    url : '/home/show_game',
    type: "GET",
    data : {
      'number': number, 
      'type': type, 
      'prepare_fields': prepare_fields
    },

    success: function(data, textStatus, jqXHR)
    {
      $('#list').html(data)

    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 
    }
  });
}

var current_level = 1
$(document).on('click', '.select', function(){

  var number = $('#number').val()
  var prepare_fields = $('#prepare_fields').val()
  var type = $('#type').val()
  var compare_field = $('#compare_field').val()

  // alert(compare)

  
  select_item = $(this).data('id')
  // alert(id)

  // alert($('input[name="things[]"]'))
  var things = []
  $('input[name="things[]"]').each(function() {
    id = $(this).val()
    // alert(id)
    things.push(id)
  });
  // alert(things)

  $.ajax({
    url : '/home/receive',
    type: "POST",
    data : {
      'check_items': things, 
      'select_item': select_item, 
      'number': number, 
      'type': type, 
      'prepare_fields': prepare_fields,
      'compare_field': compare_field
    },

    success: function(data, textStatus, jqXHR)
    {
      // alert(data)
      // alert(data['check_items'][0]['count'])
      check_items = data['check_items']
      select_item = data['select_item']

      if (is_correct_vote(check_items, select_item)) {
        $('#game-error-notice').hide()
        $('#game-correct-notice').show()
        $('li a').removeAttr("href");
        
        window.setTimeout(function(){
          current_level += 1
          $('#level').html(current_level)
          $('#game-correct-notice').hide()
          
          ajax_get_list()
          
        }, 2000);

      } else {
        // alert('答错了, 重来')
        $('#game-correct-notice').hide()
        $('#game-error-notice').show()

        $('li a').removeAttr("href");
        current_level = 1
        // $('#list').html('')
        // ajax_get_list()
      }

    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 
    }
  });


});