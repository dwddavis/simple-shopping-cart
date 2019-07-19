var eachItemTotal = function(ele) {
    var itemCost = parseFloat($(ele).find('.costpart').text());
    var itemQuantity = parseFloat($(ele).find('.quantity input').val());

    var itemTotal = itemCost * itemQuantity;

    $(ele).find('.itemTotal').html(itemTotal.toFixed(2));

    return itemTotal;
  }


var sum = function (acc, x){ return acc + x; };

var updateCart = function () {
  var cartTotalArray = [];

  $('tbody tr').each(function(i,ele){
    var itemTotal = eachItemTotal(ele);
    cartTotalArray.push(itemTotal);
  });

var cartTotalCondensed = cartTotalArray.reduce(sum);
  $('#cartTotal').html(cartTotalCondensed);
}





  $(document).ready(function(){
    updateCart();

  $(document).on('click', '.btn.remove', function (event) {
  $(this).closest('tr').remove();
  updateCart();
  });

      var timeout;
      $(document).on('input', 'tr input',function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          updateCart();
        }, 1000);
      });

    $('#addItem').on('submit', function (event) {
      event.preventDefault();
      var item = $(this).children('[name=item]').val();
      var cost = $(this).children('[name=cost]').val();
      var afterCost = parseFloat(cost).toFixed(2);

      $('tbody').append('<tr>' +
      '<td class="item">' + item + '</td>' +
      '<td class="cost"><span>$ </span><span class="costpart">' + afterCost + '</span></td>' +
      '<td class="quantity"><span id="qty">QTY </span><input type="number" value="1"/></td>' +
      '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
      '<td class="itemTotalTd">$ <span class="itemTotal"></span></td>' +
      '</tr>');

      updateCart();
      $(this).children('[name=item]').val('');
      $(this).children('[name=cost]').val('');

    });
  });
