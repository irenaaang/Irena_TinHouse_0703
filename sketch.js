// let color_palette = ["#9DADBE", "#5D759A", "#f59eded1", "#469eac"];
// let basePalette = ["#936288", "#36675d"];
let color_palette;
let basePalette;
let padding = 300;

async function setup() {
  createCanvas(2000, 1400); // 畫布大小：width, height

  let color_rand = random();
  // features setting
  if (color_rand < 0.7) {
    // "blue and yellow"
    color_palette = [
      "#779dc6",
      "#5D759A",
      "#6885b5",
      "#EDDBB3",
      "#6d7075",
      "#f4c066c9",
      "#9DADBE",
      "#945031",
    ];
    basePalette = ["#89b5d0"];
  } else if (color_rand < 0.9) {
    // "rusty"
    color_palette = [
      "#4d86c3",
      "#5D759A",
      "#344367",
      "#945031",
      "#606c79",
      "#b5d4f5",
      "#945031",
    ];
    basePalette = ["#596c81"];
  } else {
    // "yellow and grey"
    color_palette = ["#72a8e2", "#EDDBB3", "#dfba3d"];
    basePalette = ["#b4b6b9"];
  }

  background(random(basePalette)); // 背景顏色
  colorMode(HSB);

  //   呼叫自己建立的函式;
  // RJ_rect(200, 100, 30, 20, 20, 20, 10);

  //   使用迴圈重複繪製;
  for (let i = 0; i < 60; i++) {
    let x = random(-padding, width);
    let y = random(-padding, height);
    let xCount = int(random(20, 35));
    let yCount = int(random(60, 120));
    let R = 4;
    let xSpan = R + random(2, 5);
    let ySpan = R + random(3);

    RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);
  }

  // 只畫一次
  noLoop();
}

function draw() {}

// _x: 起始x座標, _y: 起始y座標, _xCount: x方向點點排數, _yCount: y方向點點排數, _xSpan: x方向間距, _ySpan: y方向間距, _R: 點點大小
function RJ_rect(_x, _y, _xCount, _yCount, _xSpan, _ySpan, _R) {
  let mainClr = random(color_palette); // 隨機選一個顏色
  let fade_scale = random(); // 0-1

  let mainHue = hue(mainClr);
  let mainSat = saturation(mainClr);
  let mainBri = brightness(mainClr);

  let lightClr = color(mainHue, mainSat - 20, mainBri - 50); // 將當前顏色調亮

  // 繪製點點矩陣
  for (let i = 0; i < _xCount; i++) {
    let px = i * _xSpan + _x; // 計算 x 座標
    for (let j = 0; j < _yCount; j++) {
      let py = j * _ySpan + _y; // 計算 y 座標

      let fade_rate = j / _yCount; // 0-1
      fade_rate = map(fade_rate, 0, 1, 0, fade_scale);

      if (random() > fade_rate) {
        push(); // 儲存畫布目前狀態
        translate(px, py); // 移動畫布原點

        fill(mainClr); // 填色
        let a = sin((px + py) / 20);
        let b = sin((px - py) / 20);

        // fill(abs(a) < 0.3 || abs(b) < 0.1 ? lightClr : mainClr);
        let r = _R * random(0.5, 1.5); // 隨機縮放點點大小
        circle(0, 0, r); //

        // // 用弧線繪製毛茸茸材質
        // if (random() < 0.01) {
        //   noFill();
        //   stroke(random(color_palette)); // 隨機跳色
        //   strokeWeight(2);
        //   push();
        //   rotate(random(TWO_PI));
        //   let arcW = r * 2 * random(0.8, 2);
        //   let arcH = r * 2 * random(0.8, 2);
        //   arc(-random(r), random(r), arcW, arcH, 0, PI * 1.5);
        //   pop();
        // }

        // // 用線條繪製 XX 材質
        // if (random() < 0.05) {
        //   noFill();
        //   stroke(mainClr);
        //   strokeWeight(2);
        //   line(-r, -r, r, r);
        //   line(-r, r, r, -r);
        // }

        pop(); // 回復至畫布先前狀態
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
