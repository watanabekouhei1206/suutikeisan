const EPS = 0.0001; // 許容誤差

/**
 * ニュートン法による根の計算
 */
function main() {
  console.log("x^3 + x - 1 のニュートン法による数値計算");

  let a = 1.0;
  let b;
  console.log("初期値 a=" + a);

  while (1) {
    b = a - func_y(a) / func_z(a); // 式(1.9)
    console.log(b);
    if (Math.abs(a - b) < EPS) break;  // 収束判定
    else a = b;
  }
  console.log("近似解 x = " + b);
}

/**
 * 根を求めたい関数
 * @param {number} x X座標
 * @return {number} Y座標
 */
function func_y(x) {
  return Math.pow(x, 3.0) + x - 1.0;
}

/**
 * 根を求めたい関数の微分関数
 * @param {number} x X座標
 * @return {number} Y座標
 */
function func_z(x) {
  return 3.0 * Math.pow(x, 2.0) + 1.0;
}

main();