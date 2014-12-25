$("p").click(function() {
        $("body").css("background", "red");
    }
);
//s

//function onReady() {
//alert("READY TO GO!");
//}
//$(document).ready(onReady);
//$(function() {
//var box = $("#box");
//box.fadeOut("slow", function() {
//alert("box finished fading out");
//});
//});

$(function() {
var box = $("#box");
var para = $("p");
var i = 0;

para.text(i);
function toggleBox(i) {
box.fadeToggle(1000, function() {
i = i + 1;
if(i < 10) {
para.text(i);
toggleBox(i);
};
});
};

toggleBox(i);
});