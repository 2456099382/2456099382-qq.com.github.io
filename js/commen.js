function $(query) {
    return document.querySelector(query);
}

function $$(query) {
    return document.querySelectorAll(query);
}


function width() {
    return document.documentElement.clientWidth
}

function height() {
    return document.documentElement.clientHeight
}
//轮播图
function carousel(id, datas) {

    var currentIndex = 0;
    var pageWidth = width(); //页面的宽度
    var timer = null;
    //获取一些元素
    var container = document.querySelector('#' + id + ' .g_carousel-container'),
        prev = container.querySelector('.g_carousel-prev'),
        next = container.querySelector('.g_carousel-next'),
        inditor = container.querySelector('.g_carousel-indicator'),
        list = container.querySelector('.g_carousel-list');

    function createElements() {
        var listHtml = '',
            inditorHtml = '';
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i]
            if (data.link) {
                listHtml += `
                <li>
                <a href="${data.link}"
                  target="_blank">
                  <img src="${data.image}">
                </a>
              </li>
                `
            } else {
                listHtml +=
                    `
                    <li>
                      <img src="${data.image}">
                      </li>
                `
            }

            inditorHtml +=
                `
            <li></li>
           `
            list.style.width = `${datas.length}100%`
            list.innerHTML = listHtml;
            inditor.innerHTML = inditorHtml;
        }
    }
    createElements();

    function setStaus() {
        //设置轮播图的位置
        list.style.transform = `translateX(-${currentIndex * pageWidth}px)`;
        //设置指示器的样式
        var beforePage = container.querySelector('.selected');
        if (beforePage) {
            beforePage.classList.remove('selected');
        }

        inditor.children[currentIndex].classList.add('selected');

        //设置按钮的样式
        if (prev) {
            if (currentIndex === 0) {
                prev.classList.add('disabled');
            } else {
                prev.classList.remove('disabled');
            }
        }

        if (next) {
            if (currentIndex === datas.length - 1) {
                next.classList.add('disabled');
            } else {
                next.classList.remove('disabled');
            }
        }
    }
    setStaus()

    function toPrev() {
        if (currentIndex === 0) {
            return;
        }
        currentIndex--;
        setStaus();
    }

    function toNext() {
        if (currentIndex === datas.length - 1) {
            return;
        }
        currentIndex++;
        setStaus()
    }

    function start() {
        if (timer) {
            return;
        }

        timer = setInterval(() => {
            currentIndex++;
            if (currentIndex === datas.length) {
                currentIndex = 0;
            }
            setStaus();
        }, 3000);
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }
    start()
    //事件
    if (prev) {
        prev.onclick = toPrev;
    }
    if (next) {
        next.onclick = toNext;
    }
    container.ontouchstart = function (e) {
        e.stopPropagation(); // 阻止事件冒泡
        var x = e.touches[0].clientX;
        var startTime = new Date().getTime();
        stop();
        list.style.transition = 'none';
        container.ontouchmove = function (ev) {
            var dis = ev.touches[0].clientX - x;
            list.style.transform = `translate(${dis + -currentIndex *pageWidth}px)`
        }
        container.ontouchend = function (evd) {

            start();
            var dis = evd.changedTouches[0].clientX - x;
            list.style.transition = '';
            ontouchmove = null;

            var endTime = new Date().getTime();

            if ((endTime - startTime) < 300) {
                if (dis < -20 && currentIndex < datas.length - 1) {
                    toNext();
                } else if (dis > 20 && currentIndex > 0) {
                    toPrev();
                } else {
                    setStaus();
                }
            } else {
                if (dis < -pageWidth / 2 && currentIndex < datas.length - 1) {
                    toNext();
                } else if (dis > pageWidth / 2 && currentIndex > 0) {
                    toPrev();
                } else {
                    setStaus();
                }
            }
        }

    }
}

//ajax请求
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
        throw new Error("invalid url");

    }

    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`
    https://proxy.yuanjin.tech${path}
    `, {
        headers: {
            target,
        },
    }).then((r) => r.json());
}