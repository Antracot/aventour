 $(document).ready(function() {

    // setting id for element all column 
    $('#avia-form-shoot .row .column').each( function( index, element) {	
	    $(element).attr('id', 'column_child' + index);
    });
        
    // setting id for all rows element
     $('#rezon-forms .row').each( function( index, element) {	
	    $(element).attr('id', 'row_child' + index);
    });
    
    //setting id for passengers popup     
    $('#column_child8 .select-age tbody tr').each( function( index, element) {	
	    $(element).attr('id', 'tr_child' + index).css('display', 'none');
    });
         
    // change placeholder
    $('#column_child0 .item .inside .book-from').attr('id', 'input_to');
    $('#input_to').attr('placeholder', '');
    
    // add/remove missing date 
    $('#row_child0 .radio-group label:first-child').on("click", function(e) {
        $('#column_child1 .calendar').append('<p id="miss_date_remove" class="missing_sec_date">відсутня</p>');
    });
    $('#row_child0 .radio-group label').not(':first').on("click", function(e) {
        $('.missing_sec_date').remove();
    });
    
    // setting search btn
    $('#column_child11 button').removeClass('yellow').addClass('search_btn_new');
        
        // rubber container on click. Catch changes in divs
        // $('#row_child1 #column_child0 .book-date, #column_child8 .passengers .switch').on("click", function(e){
        //     console.log('clicker');
        //     $('body #rezon-forms').css('min-height', '450px');
        // });
        // $('#column_child8 .book-class').on("click", function(e){
        //     $('body #rezon-forms').css('min-height', '300px');
        // });

        // $("row_child1 .book-date-wrapper").bind('attrchange csschange',function(event){
        //     console.log('changes'); 
        // });
        
        // setting error box
        // $('#row_child1 #column_child0 .twitter-typeahead').on('click', function(){
        //     console.log('click on this');
        //     $('#row_child1 #column_child0 .error-box').hide();
        // });
        // $('#column_child0 .has-error .error-box').css({
        //     'position': 'absolute',
        //     'top': '40px',
        //     'width': '234px',
        //     'height': '25px'
        // });

    // #column_child1 .has-error .error-box{
    //     position: absolute;
    //     top: 40px;
    //     width: 231px;
    //     height: 26px;
    //     left: -83px;
    // }
        
    // end js     
    });