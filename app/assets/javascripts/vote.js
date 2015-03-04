$(document).on('click', '.select', function(){

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
    data : {'check_items': things, 'select_item': select_item},
    success: function(data, textStatus, jqXHR)
    {
      // alert(data)
      // alert(data['check_items'][0]['count'])
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 
    }
  });


});