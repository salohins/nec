window.onload = function () {
    var d = document.getElementById('day');
    var m = document.getElementById('month');
    var y = document.getElementById('year');

    let months = ["Month", "January", "February", "March", "April", 
        "May", "June", "July", "August", "September", "October", 
        "November", "December"];

    var i;
    for (i = 0; i < 32; i++) {
        var opt = document.createElement('option');
        if (i == 0)
            opt.appendChild(document.createTextNode("Day"));
        else
            opt.appendChild( document.createTextNode(i));
        opt.value = i; 
        d.appendChild(opt); 
    }
    i = 0;
    for (mm in months) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(months[mm]));
        opt.value = i;
        i++;
        m.appendChild(opt);
    }
    const thisYear = new Date().getFullYear();
    for (i = 1919; i != thisYear; i++) {
        var opt = document.createElement('option');
        if (i == 1919)
            opt.appendChild(document.createTextNode("Year"));
        else
            opt.appendChild( document.createTextNode(i));
        opt.value = i; 
        y.appendChild(opt); 
    }
} 



