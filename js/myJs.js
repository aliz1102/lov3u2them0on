const textConfig={
text1:"He luu my cutie cat!",
text2:"There's something I want to ask uuu",
text3:"Will you be my valentine <3 ._.",
text4:":3",
text5:"Nope :))",
text6:"YESSSS <3",
text7:"Tell me a reason why you love me? :vvvv",
text8:"Send me <3",
text9:"Because Alice is super handsome super cool super cute:)))",
text10:"Ehehehe",
text11:"I love u",
text12:"Love u too <3"
};

$(function(){

setTimeout(function(){
firstQuestion();
$(".spinner").fadeOut();
$("#preloader").delay(350).fadeOut("slow");
$("body").css({overflow:"visible"});
},600);

$("#text3").text(textConfig.text3);
$("#text4").text(textConfig.text4);
$("#no").text(textConfig.text5);
$("#yes").text(textConfig.text6);

function firstQuestion(){
$(".content").hide();
Swal.fire({
title:textConfig.text1,
text:textConfig.text2,
imageUrl:"img/cuteCat.jpg",
imageWidth:300,
imageHeight:300,
background:'#fff url("img/iput-bg.jpg")'
}).then(function(){
$(".content").fadeIn(200);
});
}

function switchButton(){
$("#no").css({
left:$("#yes").css("left"),
top:$("#yes").css("top")
});
$("#yes").css({
left:Math.random()*300+"px",
top:Math.random()*300+"px"
});
}

$("#no").on("mouseenter touchstart",function(e){
e.preventDefault();
switchButton();
});

$("#yes").on("click",function(){
Swal.fire({
title:textConfig.text7,
input:"text",
inputValue:textConfig.text9,
confirmButtonText:textConfig.text8,
background:'#fff url("img/iput-bg.jpg")'
}).then(function(){
Swal.fire({
title:textConfig.text10,
text:textConfig.text11,
confirmButtonText:textConfig.text12,
background:'#fff url("img/iput-bg.jpg")'
}).then(function(){
window.location="https://i.pinimg.com/originals/0c/da/2f/0cda2f2d00fcdfb94e6efd7aeec005e0.gif";
});
});
});

});
