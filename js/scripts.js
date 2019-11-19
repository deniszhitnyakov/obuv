$( document ).ready( function () {

    /* scroll */

    // $("a[href^='#']").click(function(){
    // 	var _href = $(this).attr("href");
    // 	$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    // 	return false;
    // });

    /* timer */

    function update () {
        var Now = new Date(), Finish = new Date();
        Finish.setHours( 23 );
        Finish.setMinutes( 59 );
        Finish.setSeconds( 59 );
        if (Now.getHours() === 23 && Now.getMinutes() === 59 && Now.getSeconds === 59) {
            Finish.setDate( Finish.getDate() + 1 );
        }
        var sec = Math.floor( (Finish.getTime() - Now.getTime()) / 1000 );
        var hrs = Math.floor( sec / 3600 );
        sec -= hrs * 3600;
        var min = Math.floor( sec / 60 );
        sec -= min * 60;
        $( ".timer .hours" ).text( pad( hrs ) );
        $( ".timer .minutes" ).text( pad( min ) );
        $( ".timer .seconds" ).text( pad( sec ) );
        setTimeout( update, 200 );
    }

    function pad ( s ) {
        return ('00' + s).substr( -2 )
    }

    update();

    /* sliders */

    $( ".owl-carousel" ).owlCarousel( {
        items: 1,
        loop: true,
        smartSpeed: 300,
        mouseDrag: false,
        pullDrag: false,
        dots: false,
        nav: true,
        navText: ""
    } );

    /* selects */

    var model_select = $( "select[name='model']" );
    var size_select = $( "select[name='size']" );

    function Comment () {
        var model = model_select.find( "option:selected" ).val();
        var size = size_select.find( "option:selected" ).val();
        if (model && size) {
            var comment = model + " / Размер: " + size;
        } else if (model) {
            var comment = model;
        } else {
            var comment = "";
        }
        $( "input[name='comment']" ).val( comment );
    }

    model_select.change( function () {
        size_select.find( "option:first-child" ).prop( "selected", "true" );
        var model = model_select.find( "option:selected" ).val();
        var model_type = model_select.find( "option:selected" ).attr( "data-model" );
        if (model) {
            size_select.find( "option" ).removeAttr( "disabled" );
            if (model_type == "female") {
                size_select.find( "option[data-model='male']" ).attr( "disabled", "disabled" );
            } else {
                size_select.find( "option[data-model='female']" ).attr( "disabled", "disabled" );
            }
        } else {
            size_select.find( "option:not(:first-child)" ).attr( "disabled", "disabled" );
        }
        Comment();
    } );

    $( "select[name='size']" ).change( function () {
        Comment();
    } );

} );