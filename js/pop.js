// /**
//  * 1.弹出窗口
//  * 2.关闭窗口
//  * 3.处理一些特殊的事情
//  */

var showPop = (function () {

    var contai;

    function showPop(id) {
        contai = $('#' + id);
        contai.style.display = '';
        if (id === "popVideo") {
            $('video').play();
        }
        if (contai !== undefined) {
            var close = contai.querySelector('.pop_close');
            close.onclick = function () {
                contai.style.display = 'none';
                if (id === "popVideo") {
                    $('#popVideo video').pause();
                }
            }

            var popWx = contai.querySelector('.pop_wx'),
                popQq = contai.querySelector('.pop_qq');
            if (popWx) {
                popQq.onclick = function () {
                    this.classList.add('selected');
                    popWx.classList.remove('selected');
                }
                popWx.onclick = function () {
                    this.classList.add('selected');
                    popQq.classList.remove('selected');
                }
            }
        }
    }
    return showPop;
})();