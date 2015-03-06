function is_correct_vote(check_items, select_item) {
  select_item_count = select_item['count']
  alert(select_item_count)

  for (var i = 0; i < check_items.length; i++) {
    item = check_items[i]
    if (item['count'] > select_item_count) {
      return false
    }
  }

  return true
}

function ajax_get_list() {
  var number = $('#number').val()
  var compare = $('#compare').val()
  var type = $('#type').val()

  alert(compare)

  $.ajax({
    url : '/home/show_game',
    type: "GET",
    data : {'number': number, 'type': type, 'compare': compare},
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
  var compare = $('#compare').val()
  var type = $('#type').val()

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
      'compare': compare
    },

    success: function(data, textStatus, jqXHR)
    {
      // alert(data)
      // alert(data['check_items'][0]['count'])
      check_items = data['check_items']
      select_item = data['select_item']

      if (is_correct_vote(check_items, select_item)) {
        $('#game-notice').hide()
        current_level += 1
        ajax_get_list()
        $('#level').html(current_level)
      } else {
        // alert('答错了, 重来')
        $('#game-notice').show()
        current_level = 1
        $('#list').html('')

        // $('#level').html(current_level)
        // ajax_get_list()
      }

    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 
    }
  });


});