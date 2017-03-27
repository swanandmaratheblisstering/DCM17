function onMenuButtonClick(e){
    $.index.toggleLeftView();
}

function onDrawerOpen(e) {
    Ti.API.info($.index.isLeftDrawerOpen);
}

function onDrawerClose(e) {
    Ti.API.info($.index.isLeftDrawerOpen);
}

Alloy.Globals.index = $.index;

$.menuC.on('menuclick',function(e){
    $.index.toggleLeftView({animated:false}); //animated option only work on ios
    
    switch(e.itemId){
      case 'sponsors':
      	$.index.setCenterView(Alloy.createController(e.itemId).getView()); //Arg shold be View(not window)
      	break;
      case 'sessions':
        $.index.setCenterView(Alloy.createController(e.itemId).getView()); //Arg shold be View(not window)
      break;
      case 'attendies':
        $.index.setCenterView(Alloy.createController(e.itemId).getView()); //Arg shold be View(not window)
      break;
      case 'volunteers':
        $.index.setCenterView(Alloy.createController(e.itemId).getView()); //Arg shold be View(not window)
      break;
      default:
        $.index.setCenterView(Alloy.createController(e.itemId).getView()); //Arg shold be View(not window)
      break;
    }
});

$.index.open();
