window.onload = function() {
    document.querySelector('div.shade').style.display = 'none';
    // 调整页面尺寸
    function refreshRem(designWidth) {
        let winWidth = document.documentElement.offsetWidth;
        document.documentElement.style.fontSize = winWidth / designWidth + 'px';
    }
    refreshRem(1920);
    window.addEventListener('resize', function() {
        refreshRem(1920);
    })

    
    // mouse chase
    // 角度参考系的选取：以飞机所在盒子的顶部中心作为顶角点。
    //【顶角点到nav盒子顶部的距离】=（rotateBaseY），【顶角点到nav盒子左部的距离】=（rotateBaseX）。
    //【鼠标的y坐标 - rotateBaseY】= triY（即邻边），【鼠标的x坐标 - rotateBaseX】= triX (即对边)。
    // 通过Math.atan(triX / triY)得到顶角的弧度值
    // 角度 = 弧度 * 180 / Math.PI
    // 正直顺时针，负值逆时针
    let chaseBox = document.querySelector('#top-nav-chase-box');
    // 地球盒子中心为三角形顶角
    let earthBox = chaseBox.querySelector('.top-nav-chase-earth');
    // 飞机盒子 center top 为旋转中心
    let plane = chaseBox.querySelector('.top-nav-chase-plane');

    let rotateOriX = 0.5;
    let rotateOriY = 0.3;

    let rotateBaseY = plane.offsetTop + plane.offsetHeight * rotateOriY;
    let rotateBaseX = chaseBox.offsetLeft + plane.offsetLeft + plane.offsetWidth * rotateOriX;

    window.addEventListener('mousemove', function(e) {
        let triY = e.clientY - rotateBaseY;
        let triX = e.clientX - rotateBaseX;
        let rotateAngle = Math.atan((-triX) / (triY)) * 180 / Math.PI;

        if (triY <= 0 ) {
            if (triX < 0) {
                rotateAngle = 90;
            } else if (triX > 0) {
                rotateAngle = -90;
            }
        }

        plane.style.transform = 'translateX(-50%) rotate(' + (rotateAngle) + 'deg)';
        plane.style.transformOrigin = rotateOriX * 100 + '% ' + rotateOriY * 100 + '%';
    })

    
    // 可点击事件地球放大效果
    


}