//この端末が、タッチできる環境かどうか→タッチ環境だったらtrue
        var isTouch = ('ontouchstart'in window);

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
// キャンバスの割合
var H_Per = 0.76;

// 選択した線画
var can1 = document.getElementById('can1-line1');
var can2 = document.getElementById('can2-nuri');
var can3 = document.getElementById('can3-line2');
var can4 = document.getElementById('can4-bg');
var ctx1 = can1.getContext('2d');
var ctx2 = can2.getContext('2d');
var ctx3 = can3.getContext('2d');
var ctx4 = can4.getContext('2d');
var pic = document.getElementById('pic');
var paletto = document.getElementById('paletto');
//線の設定
var oldX = 0;
var oldY = 0;
var drawFlag = false;
var penSize = 2;

pencolor = 'rgba(255,0,0,1)';
//セッションストレージの読み込み
if (sessionStorage.memo !== null) {
    sline = JSON.parse(sessionStorage.memo);//配列の取得
}
var linenum = sline.select;




$("canvas.canall").css("width", '100%');
$("canvas.canall").css("height", '100%');//76%はtoolバーの高さ（12%*2-100）
init();
/* 初期設定 */
function init(){
	// ペンのサンプルサイズ表示位置の設定
	samplePosition(2);
}
// ペンのサンプルサイズ表示位置の設定
function samplePosition(size){
	$("#sizeSample").css("height",size);
	$("#sizeSample").css("width",size);
	var margin = (40 - size) / 2;
	$("#sizeSample").css("margin-top",margin);
	$("#sizeSample").css("margin-left",margin);
}
/*
 can1.setAttribute('width',WIDTH);
 can1.setAttribute('height',HEIGHT);
 ctx1.translate(WIDTH,HEIGHT);
 can2.setAttribute('width',WIDTH);
 can2.setAttribute('height',HEIGHT);
 ctx2.translate(WIDTH,HEIGHT);
 can3.setAttribute('width',WIDTH);
 can3.setAttribute('height',HEIGHT);
 ctx3.translate(WIDTH,HEIGHT);
 can4.setAttribute('width',WIDTH);
 can4.setAttribute('height',HEIGHT);
 ctx4.translate(WIDTH,HEIGHT);
 */

//カラーピック用のキャンバス設定
pic.style.backgroundColor = pencolor;



//ここから２番canvas（ぬるキャンバス）の設定
//ctx2.fillStyle = 'rgb(255,255,200)';
//ctx2.fillRect(0,0,WIDTH,HEIGHT);
can2.setAttribute('width', WIDTH);
can2.setAttribute('height', HEIGHT);

//線を引く
$('#can1-line1').bind('touchstart mousedown', function (e) {
    oldX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
    oldY = (isTouch ? event.changedTouches[0].pageY - 40 : e.pageY - 40);
    e.preventDefault();
    drawFlag = true;

});

$('#can1-line1').bind('touchmove mousemove', draw);
function draw(e) {
    e.preventDefault();
    if (!drawFlag){
        return;
    }
    var x = (isTouch ? event.changedTouches[0].pageX : e.pageX);
    var y = (isTouch ? event.changedTouches[0].pageY - 40 : e.pageY - 40);
    ctx2.lineWidth = penSize;
    ctx2.lineCap = 'round';
    ctx2.strokeStyle = pencolor;
    ctx2.beginPath();
    ctx2.moveTo(oldX, oldY);
    ctx2.lineTo(x, y);
    ctx2.stroke();
    oldX = x;
    oldY = y;
}


$('#can1-line1').bind('touchend mouseup', function (e) {
    drawFlag = false;
});

//パレットのディスプレイnone と blockを切り替える
//JavaScript&jQuery/1216/No5/loopanime_start.html
/*
 $('dd:not(:first)').css('display','none');

 $('#paletto').click(function(){
 //クリックした次のタグが閉じているときだけ、動かす
 if($(this).next().css('display') == 'none')	{
	 $('#paletto').css('display','');
	 $('dd').slideUp(600);
	 $(this).next().slideDown(600);
 }
 });

 $('#pic').click(function(){
	 //クリックした次のタグが閉じているときだけ、動かす
	 if($('#paletto').css('display') == 'none')	{
		 $('#paletto').css('display','');
		 $('dd').slideUp(600);
		 $(this).next().slideDown(600);
		 $('#paletto').css('display','none');
		 $('dd').slideUp(600);
		 $(this).next().slideDown(600);
	 } else {

	 }
 });

$('li#pic').bind('touchstart mousedown', function (e) {
    paletto.style.display  =  "block";
});
 */
//ペンの色を変える
$('li#pic').bind('touchstart mousedown', function (e) {
    pencolor = $(this).css('background-color');
});
//ペンの色を変える(消しゴム)
$('#eraser').bind('touchstart mousedown', function (e) {
    pencolor = "#fff";
});

//ペンの太さを変える
$('#size').bind('touchstart mousedown', function (e) {
	$('#sizeSetter').show();
});

//画面をクリアする
$('li#clear').bind('touchstart mousedown', function (e) {

    answer = confirm('クリアしますか');
    if (answer == true) {
        ctx2.clearRect(0, 0, WIDTH, HEIGHT);
        ctx2.fillStyle = 'rgb(255,255,255)';
        ctx2.fillRect(0, 0, WIDTH, HEIGHT);
    }

});


//画像を保存する
$('li#save').bind('touchstart mousedown', function (e) {
    //console.log(canvas.toDataURL());
    answer = confirm('保存しますか');
    if (answer === true) {
        var img = document.getElementById('image');
        img.src = canvas.toDataURL();
        }
});

//線画を１番のcanvasに表示
can1.setAttribute('width', WIDTH);
can1.setAttribute('height', HEIGHT);
var img = new Image();
img.src = "./line/p0" + linenum + ".png";
img.onload = function () {
    var size = imageSizeMesser(img);
    var position = imagePosisionMesser(size);
    ctx1.drawImage(img, position[0], position[1], size[0] , size[1]);
};
// 画像のサイズを取得する 配列にして、横・縦の順に返却
function imageSizeMesser(targetImage){
    var width = targetImage.width;
    var height = targetImage.height;
    var widthPercent = can1.width/width;
    var heightPercent = (can1.height/height)*0.76;
    var per = 0;
    if (heightPercent < widthPercent){
    	per = heightPercent;
    } else {
    	per = widthPercent;
    }
    return [targetImage.width * per,targetImage.height * per];
}
// 画像の表示位置を返却する 配列でleft topの順で渡す
function imagePosisionMesser(size){
    var top = (HEIGHT * H_Per - size[1] ) / 2;
    var left = (can1.width - size[0]) / 2;
    return [left, top];
}
// ペンサイズをテキストで変更した場合
function onChangeTextValue(target){
	if(target.value >= 45){
		target.value = 45;
	}
	$("#rangeValue").val(target.value);
	samplePosition(target.value);
}
// ペンサイズをレンジで変更した場合
function onChangeRangeValue(target){
	$("#textValue").val(target.value);
	samplePosition(target.value);
}
// ペンサイズのOKボタンをクリック
function onClickOKBtn(){
	penSize = $("#textValue").val();
	$("#sizeSetter").hide();
}
// ペンサイズのキャンセルボタンをクリック
function onClickCancelBtn(){
	$("#rangeValue").val(penSize);
	$("#textValue").val(penSize);
	samplePosition(penSize);
	$("#sizeSetter").hide();
}