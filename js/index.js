window.onload = function() {
    // mouse chase
    // 角度参考系的选取：以地球所在盒子的中心作为顶角点。
    //【顶角点到nav盒子顶部的距离】=（rotateBaseY），【顶角点到nav盒子左部的距离】=（rotateBaseX）。
    //【鼠标的y坐标 - rotateBaseY】= triY（即邻边），【鼠标的x坐标 - rotateBaseX】= triX (即对边)。
    // 通过Math.atan(triX / triY)得到顶角的弧度值
    // 角度 = 弧度 * 180 / Math.PI

    let chaseBox = document.querySelector('#top-nav-chase-box');
    // 地球盒子中心为三角形顶角
    let earthBox = chaseBox.querySelector('.top-nav-chase-earth');
    // 飞机盒子 center top 为旋转中心
    let plane = chaseBox.querySelector('.top-nav-chase-plane');

    let rotateBaseY = earthBox.offsetTop + earthBox.offsetHeight / 2;
    let rotateBaseX = earthBox.offsetLeft + earthBox.offsetWidth / 2;

    console.log(rotateBaseY, rotateBaseX);



}