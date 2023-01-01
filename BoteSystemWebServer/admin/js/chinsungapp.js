// 제이쿼리를 이용한 ctrl + F... 구현. 출처 : http://blog.nachal.com/775
$("button[name='btnContSrch']").unbind('click').click(searchh);
$('#mySearch').keypress(function(event){
  if ( event.which == 13 ) {
    $("button[name='btnContSrch']").click();
    return false;
  }
});
function searchh(){
  var strContSrch=$('input[name="txtContSrch"]').val();
  // alert(strContSrch.length);
  
  if(strContSrch==0){
    alert('검색어를 입력하세요.');
    $('input[name="txtContSrch"]').focus();
    return false;}
  if(navigator.appName.indexOf("Microsoft")<0){
    if(!window.find(strContSrch,false,false,true,false,false,true)){
    }
    return false;
  }
  bodySearchAll('body'/*bodySideContent*/,strContSrch,'txtContSrch'/*bdySearch 버튼*/, 'down'/*chkMode*/);
  return false;
}

// <!-- 클릭하면 ch_app 을 보이고 내용을 쓴다 -->
function ch_window_app(i){
  i=i.children;
  var msg = document.getElementsByClassName("ch_app");
  msg[0].style.display = "block"; //div
  document.getElementById("nnn").innerHTML=i[1].innerHTML;
  document.getElementById("code").innerHTML=i[2].innerHTML;
  document.getElementsByTagName("xmp")[0].innerHTML=i[3].innerHTML;
  document.getElementById("preview").innerHTML=i[3].innerHTML;
}

// <!-- css변경 버튼 -->
function ch_css(i){
  var idx=0;
  var a;
  switch(i){
    case 0:
      a = document.getElementsByClassName("col-lg-3 asd")
      for (idx = 0; i < a.length; idx++) {
          a[i].className = "col-lg-3 super"
      }
    break;
    case 1:
      a = document.getElementsByClassName("col-lg-3 super")
      for (idx = 0; i < a.length; idx++) {
          a[i].className = "col-lg-3 asd"
      }
    break;
  }
}

// esc 누르면 창 끄기
window.onkeydown = function(event) {
  if(event.keyCode==27)
    myFunction();
}
function myFunction() {
  var msg = document.getElementsByClassName("ch_app");
  msg[0].style.display = "none";
  f=0;
  ff=0
}