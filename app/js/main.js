$(document).ready(function() {
	console.log("Document ready!");

	$('#galileoForm iframe').attr('id', 'myFrameHole');

    // $('#myFrameHole').resize(function(){
    //     console.log('I\'m work');
    // });

    var myHeight = $('#galileoForm iframe').outerHeight();
    console.log(myHeight);
    $('#galileoForm iframe .for-iframe #main').css('min-height', '450px');

    $('#galileoForm iframe').on('resize', function(){ 
        console.log('work');
    });


    var myEmail = 'laurel.true-mccarthy@thomsonreuters.com';
    console.log(myEmail.length); 

});