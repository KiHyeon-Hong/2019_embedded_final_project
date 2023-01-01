// 처음 접속하면 나오는 스크롤 가이드 화면
function scrollGuide()        {
  $(".scroll_guide").css("opacity", 0);
  $(".scroll_guide").css("display", "block");

  $(".scroll_bg").css("opacity", 0.8);
  TweenMax.to($(".scroll_guide"), 0.5, { opacity: 0.8});
  self.setTimeout("guideEnd()",1500);
}
function guideEnd()        {
  TweenMax.to($(".scroll_guide"), 0.5, { opacity: 0, onComplete: function() { 

    $(".scroll_guide").css("display", "none");
    $("body").css("overflow", "auto");


    $("body").focus();
  }});
}

// TweenMax사용한 이미지 스왑
function swapimg()  {
  TweenMax.to($(".imgswap img:first-child"), 0.25, { opacity: 0.5});
  self.setTimeout("a()",100);
}
function a(){
  var x = document.getElementsByClassName("imgswap");
  var y = x[0].getElementsByTagName("img");
  y[0].setAttribute("src", "img/swap2.jpg");
  TweenMax.to($(".imgswap img:first-child"), 0.25, { opacity: 1});
}
function swapimg2()  {
  TweenMax.to($(".imgswap img:first-child"), 0.25, { opacity: 0.5});
  self.setTimeout("aa()",100);
}
function aa(){
  var x = document.getElementsByClassName("imgswap");
  var y = x[0].getElementsByTagName("img");
  y[0].setAttribute("src", "img/swap1.jpg");
  TweenMax.to($(".imgswap img:first-child"), 0.25, { opacity: 1});
}

// 북마크 버튼 클릭
function bookmark(){
    alert("Ctrl+D로 즐겨찾기!")
}

// 스크롤 프로그레스 https://www.w3schools.com/howto/howto_js_scroll_indicator.asp
window.onscroll = function() {myFunction()};
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// 코멘트버튼
function regist(){
  var userimg = document.getElementById("userimg").className;
  var msg = document.getElementById("myTextarea").value
  document.getElementById("ruserimg").className = userimg;
  document.getElementById("result").style = "color: black;font-size: 30px;"
  var fix = "<p style='font-size: 5px;color:rgb(167, 167, 167);'>" +Date()+"</p>";
  document.getElementById("result").innerHTML=msg +fix;
}
// 코멘트이미지 변경 //클릭하면 바꾼다.
function chuserimg(msg){  document.getElementById("userimg").className = msg;}

// 글들 마우스 올라가면 띄울 새로운창
function ch_window(i){
  var msg = document.getElementsByClassName("ch_win");
  msg[0].style.display = "block";
  switch(i)  {
    case 0:  msg[0].innerHTML="<img src='http://postfiles14.naver.net/20110110_29/150020715k2_1294622039644n9UsY_JPEG/%B8%CE%C0%BD%B8%BB.jpg?type=w1'><br>게임을 정말 좋아해요~<hr>10초안에 4개의 덧셈을 풀어라!!";  break;
    case 1:  msg[0].innerHTML="<img src='http://postfiles14.naver.net/20110110_29/150020715k2_1294622039644n9UsY_JPEG/%B8%CE%C0%BD%B8%BB.jpg?type=w1'><br>강력한 도구들을 좋아해요~<hr>콘텐츠가 부족하여 아무말 텍스트로 대체합니다...";  break;
    case 2:  msg[0].innerHTML="<img src='http://postfiles14.naver.net/20110110_29/150020715k2_1294622039644n9UsY_JPEG/%B8%CE%C0%BD%B8%BB.jpg?type=w1'><br>윈도우 꿑팁 좋아해요~<hr>콘텐츠가 부족하여 아무말 텍스트로 대체합니다...";  break;
    case 3:  msg[0].innerHTML="<img src='http://postfiles14.naver.net/20110110_29/150020715k2_1294622039644n9UsY_JPEG/%B8%CE%C0%BD%B8%BB.jpg?type=w1'><br>동영상도 잘 만들고 싶어요~<hr>생명과 나눔 시간에 만든 공정무역 관련 UCC입니다!";  break;
  }
}
function ch_window2(){
  var msg = document.getElementsByClassName("ch_win");
  msg[0].style.display = "none";
}

// 유튭창 열기, 끄기 // http://jsfiddle.net/jide/gxn1xgof/ ; 유튜브 일시정시 방법 소스 참고
function youtube(){
  var msg = document.getElementsByClassName("youtubebox");
  msg[0].style.display = "block";
  var iframe = document.getElementsByClassName("youtube")[0].contentWindow
  iframe.postMessage('{"event":"command","func":"playVideo","args":""}','*');
}
function stopVideo() {
  var iframe = document.getElementsByClassName("youtube")[0].contentWindow
  iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
  var msg = document.getElementsByClassName("youtubebox");
  msg[0].style.display = "none";
}
window.onkeydown = function(event) {  //esc 누르면 창 꺼짐
  if(event.keyCode==27)
    stopVideo();
}

//랜덤산수게임창 띄우기
function gogogame(){  window.open("game.html", "myWin", "left=300, top=300, width=300, height=300");}

//느낀점 버튼 토글
function show_think(){  $("#think").toggle();}

// 작은 유튭창 띄우기
function playmusic(){  window.open('https://www.youtube.com/watch?v=hEdvvTF5js4', "myWin", "left=300, top=300, width=300, height=300")}