const EPS = 0.0001; // constは定数の定義

/**
 * 2分法による根の計算
 */
function main() {
  let a = 0.0,
    b = 1.0; // 初期値

  console.log("x^3 + x - 1 の2分法による数値計算");
  console.log("初期値 a=" + a);
  console.log("初期値 b=" + b);
  let x = nibun(a, b); // 解
  console.log("近似解 x = " + x);
}

/**
 * 実際の計算部分
 * @param {number} a 計算範囲
 * @param {number} b 計算範囲
 * @return {number} 近似解
 */
function nibun(a, b) {
  let c;

  do {
    c = (a + b) / 2.0; // 2分計算
    console.log(c);
    if (func_y(c) * func_y(a) < 0) b = c; // 式(1.2)
    else a = c; // 式(1.3)
  } while (Math.abs(a - b) > EPS); // 収束判別　式(1.4)の変形
  return c;
}

/**
 * 根を求めたい関数
 * @param {number} x X座標
 * @return {number} Y座標
 */
function func_y(x) {
  return Math.pow(x, 3.0) + x - 1.0;
}

main();