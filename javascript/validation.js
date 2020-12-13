var errors = new Set();



document.getElementById("email").oninput = function() {
    $.ajax({
        type : "POST",
        url  : "/php/reg_validation.php",
        data : {uname : document.getElementById("email").value},
        success: function(res) {
            document.getElementbyId("email-data").innerHTML = res;
            if (res != "") {
                errors.add("email");
            }
            else
                errors.delete("email");

        }
    });
};

/*var errors = new Set();

jQuery('#uname').on('input', function() {
    $.post('../php/reg_validation.php', {
        uname: $('#uname').val()
    }, function(data) {
        $('div#name-data').text(data);
        if (data != "")     
            errors.add("name");
        else 
            errors.delete("name");
    });
});



jQuery('#email').on('input', function() {
    $.post('../php/reg_validation.php', {
        email: $('#email').val()
    }, function(data) {
        $('div#email-data').text(data);
        if (data != "")
            errors.add("email");
        else    
            errors.delete("email");    
    });
});

jQuery('#pw').on('input', function() {
    $('div#pw-data').text("");
});


$('#reg').submit(function(event) {
    if ($('#uname').val() == "") {
        $('#name-data').text("*");
        event.preventDefault();
    }
        
    if ($('#email').val() == "") {
        $('#email-data').text("*");
        event.preventDefault();
    }
  
    if ($('#pw').val() == "") {
        $('#pw-data').text("*");
        event.preventDefault();
    }
    else
        $('#pw-data').text("");   

    if (errors.size > 0)
        event.preventDefault();
}); */
