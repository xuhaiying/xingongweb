~ function () {
	let computed = function () {
		let desW = 750,
			devW = document.documentElement.clientWidth;
		if (devW >= 750) {
			document.documentElement.style.fontSize = '100px';
			return;
		}
		document.documentElement.style.fontSize = devW / desW * 100 + 'px';
	};
	computed();
	window.addEventListener('resize', computed, false);
}();
;(function (){
    //=>处理滑屏的动画效果
	let GET_N = item => {
		let p = item.parentNode;
		while (p.className.indexOf('swiper-slide') < 0) {
			p = p.parentNode;
		}
		let reg = /page(\d+)/g
		return parseInt(reg.exec(p.className)[1]) || 0;
	};
    let $AN = [];
    let $mainBox = $(".mainBox");
	$mainBox.find('.swiper-slide').find('*').each((index, item) => {
        console.log(item)
		let v = $(item).attr('AN');
		if (v) {
			let n = GET_N(item),
				t = item.tagName.toLowerCase(),
				m = `page${n}_${t}_${index}`;
			$(item).addClass(m);
			$AN.push({
				tag: t,
				an: v,
				n: n,
				m: m
			});
		}
	});
	let STY = ``;
	$AN.forEach(item => {
		let {
			tag,
			an,
			n,
			m
		} = item;
        STY += `
        .page${n} .${m}{
			opacity:0;
        }
        #page${n} .${m}{
            opacity:1;
			animation:${an};
		}`;
	});
	$('head').append(`<style>${STY}</style>`);
})();
function move (){ 
    let swiper = this;
    let activeIn = swiper.activeIndex,
        slideAry = [].slice.call(swiper.slides);

    //=>设置ID
    slideAry.forEach((item, index) => {
        if (activeIn === index) {
            item.id = `page${index + 1}`;
            return;
        }
        item.id = null;
    });

    //=>最后一页不显示上划按钮
    if (activeIn >= (slideAry.length - 1)) {
        $('.PREBTN').css('display', 'none');
    } else {
        $('.PREBTN').css('display', 'block');
    }
};
$(document).ready(function () {
    new Swiper(".swiper-container",{
        direction: 'vertical',
        on: {
            init:move,
            transitionEnd:move
          },
    })
})
