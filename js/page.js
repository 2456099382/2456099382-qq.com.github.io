(function () {
    var pages = document.querySelectorAll('#pages .page');
    var pageIndex = 0; //当前选中的页面
    var nextIndex = null;
    var isSliod = true; //判断是否可以滑动
    /**设置静态时每一页的z-indx值和top值
     * 1.z-index 除了pageIndex = 1,其他都为10为了可以让其他页面覆盖当前页面
     * 2.top值 让pageIndex的top值为零，
     *                          第一页      第二页           第三页
     * 当 pageIndex = 0          0        1 * height()       2 * height()
     * 当 pageIndex = 1    -1 * height()    0           1 * height()
     * 当 pageIndex = 2     -2*height()    -1 * height()     0
     * 当 pageIndex = n     (i - pageIndex)*height  (i - pageIndex)*height (i - pageIndex)*height
     */
    function setStatic() {

        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            page.style.zIndex = 10;
            if (pageIndex === i) {
                page.style.zIndex = 1;
            }
            page.style.top = (i - pageIndex) * height() + 'px';
        }
    }
    setStatic();

    function moving(dis) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            //不移动pageIndex 当前页面
            if (i !== pageIndex) {
                page.style.top = (i - pageIndex) * height() + dis + 'px';
            }
        }
        //向下移动 设置nextIndex;
        if (dis > 0 && pageIndex > 0) {
            nextIndex = pageIndex - 1;
        } else if (dis < 0 && pageIndex < pages.length - 1) {
            nextIndex = pageIndex + 1;
        } else {
            nextIndex = null;
        }
    }
    /**
     * 动画 恢复静态位置
     */
    function finishMove() {
        if (nextIndex === null) {
            return;
        }
        pages[nextIndex].style.transition = '.5s';
        pages[nextIndex].style.top = '0';
        pageIndex = nextIndex;

        setTimeout(function () {
            setStatic();
            // isSliod = true;
            pages[nextIndex].style.transition = '';
        }, 500);
    }
    //绑定事件
    var pageParent = $('#pages');

    pageParent.ontouchstart = function (e) {
        // if (!isSliod) {
        //     return;
        // }
        // isSliod = false;
        var y = e.touches[0].clientY;

        function handle(ev) {
            var dis = ev.touches[0].clientY - y;
            if (Math.abs(dis) > 50) {
                moving(dis);
            }
            if (e.cancelable) {
                // 如果事件可以取消
                e.preventDefault(); // 取消事件 - 阻止默认行为
            }
        }
        pageParent.addEventListener('touchmove', handle, {
            passive: false,
        })
        pageParent.ontouchend = function () {
            pageParent.removeEventListener("touchmove", handle);
            finishMove()
        }
    }

    function showPage(index) {
        nextIndex = index;
        if (index === pageIndex) {
            if (pageIndex === 0) {
                pageIndex++;
            } else if (pageIndex === pages.length - 1) {
                pageIndex--;
            } else {
                pageIndex++;
            }
        }
        setStatic();
        pages[pageIndex].clientHeight;
        pageIndex = nextIndex;
        finishMove();
        setTimeout(() => {
            setStatic();
        }, 500);
    }
    window.showPage = showPage;
})();