var swith = document.querySelector('.menu_switch'),
    nav = document.querySelector('.menu_nav')

function expend() {
    nav.classList.toggle('menu_nav--expend');
    swith.classList.toggle('menu_switch--expend');
}

nav.addEventListener('click',function(){
    expend();
})
swith.onclick = expend;