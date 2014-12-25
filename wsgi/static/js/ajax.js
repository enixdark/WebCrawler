$(function(){
    $('#search').keyup(function(){
        $.ajax({
            type:'POST',
            url:'/accounts/search/',
            data:{
                'search_text': $('#search').val(),
                'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val()
            },
            'success':searchSuccess,
            'dataType':'html'
        });
    });
});

function searchSuccess(data, textStatus, jqXHR){
    $('#search_resutls').html(data);
}

function searchText(data){
    $('#search_resutls');
}


//event fro datetimepicker
$('.form_date').click(function() {
    $(this).datetimepicker({
        language:  'en',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
});

//event for dropdown box on search page
$(document).ready(
                     function() {
                         $("select#Class_Number").change(function() {
                             if ($(this).val() == '*') {

                                 $("select#Class_Id").html("<option>Please select a Class</option>");
                                 $("select#Class_Id").attr('disabled', true);
                             }
                             else {
                                 var url = "/brand/" + $(this).val() + "/all_json_models";
                                 var brand = $(this).val();
                                 $.getJSON(url, function(models) {
                                     var options = '<option value="*">Please select Class</option>';
                                     for (var i = 0; i < models.length; i++) {
                                        options += '<option value="' + models[i].fields['class_id'] + '">' + models[i].fields['class_id'] + '</option>';
                                     }
                                     $("select#Class_Id").html(options);
                                     $("select#Class_Id option:first").attr('selected', 'selected');
                                     $("select#Class_Id").attr('disabled', false);
                                 });
                             }
                         });


                         $("select#Class_Id").change(function(vent) {
                             if ($(this).val() == -1) {
                                 return;
                             }
                             //myAwesomeFunctionToCallWhenAModelIsSelected();
                         });
                     });
//$('#d2').change(function(e) {
//    index = $(this).prop('selectedIndex');
//  $('#d1 option:eq(' + index + ')').css('display','none').siblings().css('display','block');
//});
