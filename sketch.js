
// 古川タクさんのドワーフ驚き盤を
// タッチホイールで動かす
// 18コマ10枚と12コマ１枚
// 音もつける

// by Toshio Iwai
// 2025/12/12

let uX, uY; // タッチしているポイントの座標
let cX, cY; // 回転検出のセンター座標
let pX, pY; // 表示のセンター座標
let circle_in, circle_out; // タッチする円の内径、外径
let circle_out2;
let touch_onoff;
let ball_size;
let count = 0;
let num;

let img = []; // 画像の配列をつくる
let snd = []; // 音の配列
let snd_timing = []; // 音のタイミング
let snd_timing2 = []; // 音のタイミング2
let snd_no = []; // 鳴らす音番号
let snd_no2 = []; // 鳴らす音番号2

let index = 0;
let index_old;

let a,d;
let image_no = 10;
let image_no_max = 10;

let frame_angle = 20;

let sc = 1.0;

let screen_w = 1000;  // 基準スクリーン幅
let screen_h = 1500;  // 基準スクリーン高さ

let phena_cx = 500;  // 驚き盤中心座標x
let phena_cy = 500;  // 驚き盤中心座標y
let phena_d = 950;  // 驚き盤直径
let wheel_cx = 500;  // ホイール中心座標x
let wheel_cy = 1250;  // ホイール中心座標y
let wheel_outd = 460;  // ホイール外側直径
let wheel_ind = 200;  // ホイール内側直径
let ball_d = 120;  // さわるボール直径
let ball_cx = 165;  // さわるボールのホイール中心からの距離

let txt_cy1 = 900;
let txt_cy2 = 1100;
let txt_cy3 = 1200;

let bY1, bY2; // ボタンのY座標

let screen_scale;

let auto_zoom = 1;
let time = 0;
let time2 = 0;
let spin_dir = []; // 回転方向
let tint_val = 255;

let sound_onoff = -1;

// 画像を読み込む
function preload() 
{
  img[0] = loadImage("image00002.jpg"); 
  img[1] = loadImage("image00003.jpg"); 
  img[2] = loadImage("image00004.jpg"); 
  img[3] = loadImage("image00005.jpg"); 
  img[4] = loadImage("image00006.jpg"); 
  img[5] = loadImage("image00007.jpg"); 
  img[6] = loadImage("image00008.jpg"); 
  img[7] = loadImage("image00009.jpg"); 
  img[8] = loadImage("image00011.jpg");
  img[9] = loadImage("image00001.jpg");
  img[10] = loadImage("image00010.jpg");
  
  // 音を読み込む
  snd[0] = loadSound('01a.wav');
  snd[1] = loadSound('02.wav');
  snd[2] = loadSound('03a.wav');
  snd[3] = loadSound('04a.wav');
  snd[4] = loadSound('05.wav');
  snd[5] = loadSound('06.wav');
  snd[6] = loadSound('07.wav');
  snd[7] = loadSound('08a.wav');
  snd[8] = loadSound('09a.wav');
  snd[9] = loadSound('10.wav');
  snd[10] = loadSound('11.wav');
  snd[11] = loadSound('01b.wav');
  snd[12] = loadSound('04b.wav');
  snd[13] = loadSound('08b.wav');
  snd[14] = loadSound('03b.wav');
  snd[15] = loadSound('09b.wav');

  // 音を鳴らすタイミング
  snd_timing[0] = 0;
  snd_timing[1] = 0;
  snd_timing[2] = 12;
  snd_timing[3] = 0;
  snd_timing[4] = 0;
  snd_timing[5] = 13;
  snd_timing[6] = 0;
  snd_timing[7] = 15;
  snd_timing[8] = 7;
  snd_timing[9] = 0;
  snd_timing[10] = 0;
  
  // 音を鳴らすタイミング2（音を鳴らさない場合は20）
  snd_timing2[0] = 9;
  snd_timing2[1] = 20;
  snd_timing2[2] = 14;
  snd_timing2[3] = 9;
  snd_timing2[4] = 20;
  snd_timing2[5] = 20;
  snd_timing2[6] = 20;
  snd_timing2[7] = 7;
  snd_timing2[8] = 15;
  snd_timing2[9] = 20;
  snd_timing2[10] = 20;

  // 鳴らす音番号
  snd_no[0] = 0;  // カヌー
  snd_no[1] = 1;  // なべ
  snd_no[2] = 2;  // ドラゴン
  snd_no[3] = 3;  // 階段
  snd_no[4] = 4;  // 馬跳び
  snd_no[5] = 5;  // カメラズーム
  snd_no[6] = 6;  // 笑い顔
  snd_no[7] = 7;  // カラス
  snd_no[8] = 8;  // 宝石
  snd_no[9] = 9;  // ダンス
  snd_no[10] = 10;  // 玉運び
  
  // 鳴らす音番号2
  snd_no2[0] = 11;
  snd_no2[1] = 1;
  snd_no2[2] = 14;
  snd_no2[3] = 12;
  snd_no2[4] = 4;
  snd_no2[5] = 5;
  snd_no2[6] = 6;
  snd_no2[7] = 13;
  snd_no2[8] = 15;
  snd_no2[9] = 9;
  snd_no2[10] = 10;
  
  //回転方向
  spin_dir[0] = -1;
  spin_dir[1] = -1;
  spin_dir[2] = -1;
  spin_dir[3] = 1;
  spin_dir[4] = 1;
  spin_dir[5] = 1;
  spin_dir[6] = 1;
  spin_dir[7] = -1;
  spin_dir[8] = 1;
  spin_dir[9] = 1;
  spin_dir[10] = -1;
  
}

function setup() 
{

  //スクロールを固定
  
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  createCanvas(windowWidth, windowHeight);
  ww = windowWidth;
  wh = windowHeight;
  
  angleMode(DEGREES); // 角度の単位をradianからdegreeに変更
  
  a = 0;
  sc = 1.5;
  
  if(wh > ww*1.5) // 縦長画面
  {
    screen_scale = ww/screen_w;
  }
  else  // 横長画面
  {
    screen_scale = wh/screen_h;
  }
    num = 50 * screen_scale;

}

function draw() 
{
  background(255);

  if(sound_onoff >= 0)
  {
  time++;
  if(time > 3)
  {
    time = 0;
    time2++;
    count++;
  }
     
  
  // タッチがある場合はタッチ座標を使用し、ない場合はマウス座標を使用

  if (touches.length > 0) {
    uX = touches[0].x;
    uY = touches[0].y;
  } else {
    uX = mouseX;
    uY = mouseY;
  }

  // 画面の縦横比で表示位置を変える
  
  if(wh > ww*1.5)  // 画面縦が横幅の1.5倍より長い
  {
    pX = ww/2;
    pY = phena_cy*screen_scale + (wh-ww*1.5)/2;  // 驚き盤表示位置をセンターに
    cX = ww/2;
    cY = wheel_cy*screen_scale + (wh-ww*1.5)/2;  // ホイール表示位置をセンターに
  }
  else // 画面縦が横幅の1.5倍より短い
  {
    pX = ww/2;
    pY = phena_cy*screen_scale;    
    cX = ww/2;
    cY = wheel_cy*screen_scale;
  }
    
  if(touch_onoff)  // タッチしている時はホイールの大きさを変える
  {
    circle_in = wheel_ind*screen_scale*0.95;
    circle_out = wheel_outd*screen_scale*1.05;
    ball_size = ball_d*screen_scale*1.1;
  }
  else  // タッチしていない時
  {
    circle_in = wheel_ind*screen_scale;
    circle_out = wheel_outd*screen_scale;
    ball_size = ball_d*screen_scale;
  }
    
  ball_center = ball_cx*screen_scale;
  
  // 原点に対するマウスの座標を取得
  let x = uX - cX;
  let y = uY - cY;

  // マウスとホイール中心との距離を測る
  d = dist(uX, uY, cX, cY);
  
  if(d < circle_out/2 * 1.5) // ホイールの感知範囲 外側円から1.5倍まで
  {
    // マウスと原点の間の角度を計算 -180〜180度
    a = atan2(y, x);
  }
  
  if(auto_zoom == 1)
  {
    a = spin_dir[image_no]*((time2 * 20)%360 - 180)-1;
    
    if(time2 > 251)
    {
      time2 = 0;
      count = 0;
      image_no++;
      if(image_no > image_no_max) image_no = 0;
    }
  }
  
  push();
  // 原点を中心に移動
  translate(pX, pY + count*3.5*screen_scale);

  // 画面に合わせて全体のスケールを変える
  scale(screen_scale);

  // 回転
  frame_angle = 20;  // 18コマ用
  if(image_no == 10) frame_angle = 30;  // 12コマ用
  
  rotate((int)((a+180)/frame_angle)*frame_angle+180+frame_angle/2);

  // コマ番号
  index = (int)((a+180)/frame_angle);
  
//  print(index);

  push();

  // 回転につれてだんだん大きくする
  if(ww < wh)
  {
    scale(phena_d/img[0].width + count*0.005);
  }
  else
  {
    scale(phena_d/img[0].width + count*0.005);
  }

  push();
  rotate(90);
  
  // 半透明に
  tint_val =255;
  if(time2 > 200) tint_val = 255 - (time2 - 200)*5;
  if(time2 < 51) tint_val = time2*5;
     
  tint(255,tint_val);
  
  // 驚き盤画像を描画 画像の中心を原点に
  image(img[image_no], -img[image_no].width/2,-img[image_no].height/2);
//  print(index);
  pop();
  
  pop();
  pop();

  // 音の再生
  if(index != index_old)
  {
    // 音のタイミングsnd_timeing[]に合わせて、鳴らす音番号snd_no[]の音を再生
    if(index == snd_timing[image_no]) snd[snd_no[image_no]].play();
    // 音のタイミングsnd_timeing2[]に合わせて、鳴らす音番号snd_no2[]の音を再生
    if(index == snd_timing2[image_no]) snd[snd_no2[image_no]].play();
    
    // 画像拡大するためのカウント
    if(touch_onoff)
    {
      count++;    
    }
  }
  
  index_old = index;

  if(auto_zoom == 0)
  {
  // 回転ホイールを描く
  push();
  translate(cX, cY);
  noFill();
  strokeWeight(screen_scale*2.0);
  if(touch_onoff)
  {
    stroke(200,200,200,90); // さわった時の色と透明度
  }
  else
  {
    stroke(200,200,200,180); // さわってない時の色と透明度
  }
  ellipse(0,0,circle_in,circle_in); // ホイール内側の円
  ellipse(0,0,circle_out,circle_out); // ホイール外側の円
  pop();
  
 // さわるボール描く
  push();
  translate(cX, cY);
  push();
  rotate(a); // 回転
  noStroke();
  fill(200,200,200);
  translate(ball_center, 0); // 半径分ずらす
  ellipse(0,0,ball_size,ball_size); // 円を描く
  pop();
  pop();
  }
  
  // クレジット描く
  push();
  translate(0, cY);
  rotate(90);
  fill(200);
  textAlign(LEFT);
  textSize(screen_scale*20);
  //カウント表示
  text("  Taku Furukawa 2003", 0, -1);
  pop();
  }
  else
  {
    // サウンドボタン押す前

  // 画面の縦横比で表示位置を変える
  
  if(wh > ww*1.5)  // 画面縦が横幅の1.5倍より長い
  {
    pX = ww/2;
    pY = phena_cy*screen_scale + (wh-ww*1.5)/2;  // 驚き盤表示位置をセンターに
    cX = ww/2;
    cY = wheel_cy*screen_scale + (wh-ww*1.5)/2;  // ホイール表示位置をセンターに
    
    bY1 = (wh-ww*1.5)/2;
    bY2 = (wh-ww*1.5)/2;
  }
  else // 画面縦が横幅の1.5倍より短い
  {
    pX = ww/2;
    pY = phena_cy*screen_scale;    
    cX = ww/2;
    cY = wheel_cy*screen_scale;
    bY1 = 0;
    bY2 = 0;
  }
    
    // 驚き盤小さく表示
    push();
    translate(pX,pY);
    scale(screen_scale);
    push();
    scale(phena_d/img[0].width*0.5 + count*0.005);
    image(img[10], -img[0].width/2,-img[0].height/2);
    pop();
    pop();
    
    // クレジット描く
    push();
    fill(0);
    textAlign(CENTER);
    textSize(num*0.8);
//    translate(pX, txt_cy1*screen_scale + bY1);
    text("Phenakistiscopes", pX, txt_cy2*screen_scale + bY1);
//    translate(0, 50*screen_scale);
    text("Taku Furukawa 2003", pX, txt_cy3*screen_scale + bY1);
    pop();
      
    push();
    fill(0);
    textAlign(CENTER);
    textSize(num*1.8);
//    translate(pX, wh/2*1.2);
    text("TAP to start", pX, txt_cy1*screen_scale + bY1);
    pop();
  }
}

function mousePressed() 
{
//  snd[0].play();
  uX = mouseX;
  uY = mouseY;
  touch_onoff = true;
  sound_onoff = 1;
}

function mouseReleased() 
{
  touch_onoff = false;
  count = 0;
  time2 = 0;
  image_no++;
  if(image_no > image_no_max) image_no = 0;
　userStartAudio();
  snd[image_no].setVolume(0.5);
  snd[image_no].playMode('restart');
}

function touchStarted() 
{
  touch_onoff = true;
  sound_onoff = 1;
}

function touchEnded() 
{
  touch_onoff = false;
  count = 0;
  time2 = 0;
  image_no++;
  if(image_no > image_no_max) image_no = 0;
  userStartAudio();
  snd[image_no].setVolume(0.5);
  snd[image_no].playMode('restart');
}

// キャンバスをウィンドウサイズに合わせる
function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
  ww = windowWidth;
  wh = windowHeight;

  if(wh > ww*1.5) // 縦長画面
  {
    screen_scale = ww/screen_w;
    bY1 = (wh-ww*1.5)/2;
    bY2 = (wh-ww*1.5)/2;
  }
  else  // 横長画面
  {
    screen_scale = wh/screen_h;
    bY1 = 0;
    bY2 = 0;
  }

  // ボタンの大きさなど再設定
  
  num = 50 * screen_scale;

}
