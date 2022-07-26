
window.onload = function(){     // HTMLを読み込んだら実行するというお約束
    // Canvas使用の手続き（お約束）
    var canvas = document.getElementById('myGraph');
    if (! canvas || ! canvas.getContext){return false;}
    ctx = canvas.getContext('2d');
    // 描画するグラフに合わせて、X軸、Y軸の最小値と最大値を設定する
    Xmin = -5;
    Xmax = 5;
    Ymin = -5;
    Ymax = 15;
    maxWidth = canvas.width;    // Canvasの大きさはHTMLで指定する
    maxHeight = canvas.height;
    graphSheet(Xmin, Xmax, Ymin, Ymax); // グラフの元になるシートを作成
};
function graphSheet(Xmin, Xmax, Ymin, Ymax){
    // グラフを表示する際の拡大率、縮小率を求める
    scaleX = Math.round(maxWidth/(Math.abs(Xmin)+Math.abs(Xmax)));
    scaleY = Math.round(maxHeight/(Math.abs(Ymin)+Math.abs(Ymax)));
    // 原点(0,0)の位置
    offsetX = (0-Xmin)*scaleX;
    offsetY = maxHeight - (0-Ymin)*scaleY;  // CanvasのY座標は左上が「0」なので
    // 目盛の増分
    stepX = Math.round((40 * (Math.abs(Xmin)+Math.abs(Xmax)) / maxWidth)*100)/100;
    stepY = Math.round((40 * (Math.abs(Ymin)+Math.abs(Ymax)) / maxHeight)*100)/100;
    numX = Xmin;    // X軸の数値
    numY = Ymax;    // Y軸の数値
    // グラフ内を塗る（消す）
    ctx.fillStyle = "rgba(255, 255, 255, 1)";   // 引数[alfa]は透明度：0～1
    ctx.fillRect(0, 0, maxWidth, maxHeight);
    // 外枠を描く
    ctx.lineWidth = 1;  // 線の太さ
    ctx.strokeStyle = "rgba(204, 204, 204, 1)";
    ctx.strokeRect(0, 0, maxWidth, maxHeight);
    // X軸、Y軸を描く
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(maxWidth, offsetY);
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, maxHeight);
    ctx.stroke();
    // X軸の目盛
    for(i=0; i<maxWidth; i+= 10){
        ctx.beginPath();
        ctx.moveTo(i, offsetY);
        ctx.lineTo(i, offsetY+5);
        ctx.stroke();
    }
    // X軸の原点(0)から数値を振る
    numX = 0;
    for(i=offsetX; i<maxWidth; i+=40){
        if(!(i==offsetX)){
            numX += stepX;
            ctx.font = "10px serif";
            ctx.fillStyle = "#cccccc";
            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.fillText(Math.round(numX*10)/10, i, offsetY+5);
        }
    }
    numX = 0;
    for(i=offsetX; i>0; i-=40){
        if(!(i==offsetX)){
            numX -= stepX;
            ctx.font = "10px serif";
            ctx.fillStyle = "#cccccc";
            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.fillText(Math.round(numX*10)/10, i, offsetY+5);
        }
    }
    // Y軸の目盛
    for(i=0; i<maxHeight; i+= 10){
        ctx.beginPath();
        ctx.moveTo(offsetX-5, i);
        ctx.lineTo(offsetX, i);
        ctx.stroke();
    }
    // Y軸の原点(0)から数値を振る
    numY = 0;
    for(i=offsetY; i<maxHeight; i+=40){
        if(!(i==offsetY)){
            numY -= stepY;
            ctx.font = "10px serif";
            ctx.fillStyle = "#cccccc";
            ctx.textBaseline = "bottom";
            ctx.textAlign = "right";
            ctx.fillText(Math.round(numY*10)/10, offsetX-5, i+5);
        }
    }
    numY = 0;
    for(i=offsetY; i>0; i-=40){
        if(!(i==offsetY)){
            numY += stepY;
            ctx.font = "10px serif";
            ctx.fillStyle = "#cccccc";
            ctx.textBaseline = "bottom";
            ctx.textAlign = "right";
            ctx.fillText(Math.round(numY*10)/10, offsetX-5, i+5);
        }
    }
}
// 二次関数のグラフを描く
function drawParabola(){
    var addX = scaleX /(Math.abs(Xmin * scaleX) + Math.abs(Xmax * scaleX));
    var C1 = parseFloat(document.myFORM.myC1.value);
    var C2 = parseFloat(document.myFORM.myC2.value);
    var C3 = parseFloat(document.myFORM.myC3.value);
    if(isNaN(C1)||isNaN(C2)||isNaN(C3)){
        alert("係数のいずれかが数値ではありません！");
    }else{
        var X1 = Xmin * scaleX + offsetX;
        var Y1 = (Math.pow(Xmin,2)* C1 + C2*Xmin + C3)*-1 * scaleY + offsetY;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        for(i=Xmin; i<Xmax; i+=addX){
            var X2 = i * scaleX + offsetX;
            var Y2 = (Math.pow(i,2) * C1 + C2 * i + C3)*-1 * scaleY + offsetY;
            ctx.beginPath();
            ctx.moveTo(X1, Y1);
            ctx.lineTo(X2, Y2);
            ctx.stroke();
            X1 = X2;
            Y1 = Y2;
        }
    }
}
