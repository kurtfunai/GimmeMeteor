Items = new Meteor.Collection('items');

if (Meteor.is_client) {
  Template.title.greeting = function () {
    return "GimmeGimme.";
  };

  Template.list.items = function() {
    return Items.find({});
  }

  Template.add_item.events = {
    'click input[type="button"], keyup input[type="text"]': function (event) {
      if (event.type === "click" ||
        (event.type === "keyup" && event.which === 13)) {
        var itemName = $('#item_name').val();
        var itemDescription = $('#item_description').val();
        var itemLink = $('#item_link').val();
        if (itemName) {
          Items.insert({
            name: itemName,
            description: itemDescription,
            link: itemLink,
          });
          $('#item_name').val('');
          $('#item_description').val('');
          $('#item_link').val('');
        }
      }
    }
  };

}

if (Meteor.is_server) {
  Meteor.startup(function () {
    if (Items.find().count() === 0) {
      var names = ["Boonanas"];
      for (var i=0; i<names.length; i++) {
        Items.insert({name: names[i]});
      }
    }
  });
  //Items.remove({});
}