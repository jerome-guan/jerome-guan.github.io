window.onload = function() {
    document.querySelector('div.shade').style.display = 'none';
    // Hide all components in #mid-main
    document.querySelector('#mid-main').style.display = 'none';
    // 调整页面尺寸
    function refreshRem(designWidth) {
        let winWidth = document.documentElement.offsetWidth;
        document.documentElement.style.fontSize = winWidth / designWidth + 'px';
    }
    refreshRem(1920);
    window.addEventListener('resize', function() {
        refreshRem(1920);
    })
    
    // Tools dropdown functionality - modified for top-header placement
    const toolsDropdown = document.querySelector('.tools-dropdown');
    const dropdownMenu = document.querySelector('header#top-header .dropdown-menu');
    
    // Function to position the dropdown menu below the Tools button
    function positionDropdownMenu() {
        // Get the position of the Tools button
        const toolsRect = toolsDropdown.getBoundingClientRect();
        
        // Position the dropdown menu below the Tools button
        dropdownMenu.style.position = 'fixed';
        dropdownMenu.style.top = toolsRect.bottom + 'px';
        dropdownMenu.style.left = toolsRect.left + 'px';
        // Set width to 1.5 times the Tools button width
        dropdownMenu.style.width = (toolsRect.width * 1.5) + 'px';
    }
    
    // Position the dropdown menu initially
    window.addEventListener('load', positionDropdownMenu);
    window.addEventListener('resize', positionDropdownMenu);
    
    // Track if mouse is over dropdown menu or tools button
    let isMouseOverDropdown = false;
    let isMouseOverTools = false;
    
    // We'll use mouseenter/mouseleave for hover behavior
    toolsDropdown.addEventListener('mouseenter', function() {
        isMouseOverTools = true;
        positionDropdownMenu(); // Ensure correct position
        dropdownMenu.style.display = 'block';
    });
    
    toolsDropdown.addEventListener('mouseleave', function() {
        isMouseOverTools = false;
        // Don't hide immediately, give time for mouse to enter dropdown
        setTimeout(function() {
            // Only hide if mouse is not over dropdown and not in "clicked open" state
            if (!isMouseOverDropdown && !toolsDropdown.classList.contains('menu-clicked')) {
                dropdownMenu.style.display = 'none';
            }
        }, 50);
    });
    
    // Add event listeners for the dropdown menu itself
    dropdownMenu.addEventListener('mouseenter', function() {
        isMouseOverDropdown = true;
    });
    
    dropdownMenu.addEventListener('mouseleave', function() {
        isMouseOverDropdown = false;
        // Only hide if we're not in "clicked open" state and mouse is not over tools
        if (!toolsDropdown.classList.contains('menu-clicked') && !isMouseOverTools) {
            dropdownMenu.style.display = 'none';
        }
    });
    
    // Click behavior toggles a persistent state
    toolsDropdown.addEventListener('click', function(e) {
        // Only toggle if clicking on the Tools text or its span
        if (e.target.tagName === 'SPAN' || e.target === toolsDropdown) {
            positionDropdownMenu(); // Ensure correct position
            toolsDropdown.classList.toggle('menu-clicked');
            
            // If we're toggling on, show the menu
            if (toolsDropdown.classList.contains('menu-clicked')) {
                dropdownMenu.style.display = 'block';
            } else {
                // If we're toggling off and not hovering over either element, hide the menu
                if (!isMouseOverTools && !isMouseOverDropdown) {
                    dropdownMenu.style.display = 'none';
                }
            }
            
            e.stopPropagation();
        }
    });
    
    // Handle clicks on dropdown menu links
    dropdownMenu.addEventListener('click', function(e) {
        // If clicking on a link, close the dropdown
        if (e.target.tagName === 'A') {
            toolsDropdown.classList.remove('menu-clicked');
            // We don't hide the menu immediately as the link will open in a new tab
        }
    });
    
    // Close dropdown when clicking elsewhere on the page
    document.addEventListener('click', function(e) {
        // Don't close if clicking on the dropdown menu itself or the tools button
        if (!dropdownMenu.contains(e.target) && !toolsDropdown.contains(e.target)) {
            if (toolsDropdown.classList.contains('menu-clicked')) {
                toolsDropdown.classList.remove('menu-clicked');
                // Only hide if mouse is not over the dropdown or the tools button
                if (!isMouseOverTools && !isMouseOverDropdown) {
                    dropdownMenu.style.display = 'none';
                }
            }
        }
    });


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
