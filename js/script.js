
$( document ).ready(function(){
    // $('select').material_select();

    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .9, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function() {

        }, // Callback for Modal open
        complete: function() {

        } // Callback for Modal close
    });
    $('.slider').slider({full_width: true});
    $(".button-collapse").sideNav();
    $('.button-collapse').sideNav();

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true // Displays dropdown below the button
    });



    //var $radios = $('input:radio[name=gender]');
    //if($radios.is(':checked') === false) {
    //    $radios.filter('[value='+$scope.UserData.talent.gender+']').prop('checked', true);
    //}



    $('.lean-overlay').fadeOut();



})
