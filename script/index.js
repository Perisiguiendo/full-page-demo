const btn_Click = document.getElementsByClassName('btn-click')[0].getElementsByTagName('li');
const ul_carousel = document.getElementsByClassName('carousel')[0];
const carousel = ul_carousel.getElementsByTagName('li');
let index = 0;
let timer3D = 0;
let autoIndex = 0;

home3D();

// 手动轮播
function home3D() {
  btn_Click[0].classList.add("active");
  for (let i = 0; i < btn_Click.length; i++) {
    btn_Click[i].onclick = function () {
      clearInterval(timer3D);
      if (index != i) {
        btn_Click[index].classList.remove("active");
        carousel[index].classList.remove("active");
        btn_Click[i].classList.add("active");
        carousel[i].classList.add("active");
        if (index < i) {
          carousel[i].classList.remove("leftHide");
          carousel[i].classList.remove("leftShow");
          carousel[i].classList.remove("rightHide");
          carousel[i].classList.add("rightShow");

          carousel[index].classList.remove("leftShow");
          carousel[index].classList.remove("rightShow");
          carousel[index].classList.remove("rightHide");
          carousel[index].classList.add("leftHide");
        } else {
          carousel[i].classList.remove("leftHide");
          carousel[i].classList.remove("rightShow");
          carousel[i].classList.remove("rightHide");
          carousel[i].classList.add("leftShow");

          carousel[index].classList.remove("leftShow");
          carousel[index].classList.remove("rightShow");
          carousel[index].classList.remove("leftHide");
          carousel[index].classList.add("rightHide");
        }
        index = i;
        autoIndex = index;
      }
    }
  }
  auto3D();
}

function auto3D() {
  timer3D = setInterval(function () {
    autoIndex++;
    if (autoIndex == carousel.length) {
      autoIndex = 0;
    }

    btn_Click[index].classList.remove("active");
    btn_Click[autoIndex].classList.add("active");
    carousel[autoIndex].classList.remove("leftHide");
    carousel[autoIndex].classList.remove("leftShow");
    carousel[autoIndex].classList.remove("rightHide");
    carousel[autoIndex].classList.add("rightShow");

    carousel[index].classList.remove("leftShow");
    carousel[index].classList.remove("rightShow");
    carousel[index].classList.remove("rightHide");
    carousel[index].classList.add("leftHide");

    index = autoIndex;
  }, 3000)
  ul_carousel.onmouseenter = function () {
    clearInterval(timer3D);
  }

  ul_carousel.onmouseleave = function () {
    auto3D();
  }
}

const team = document.getElementsByClassName('team')[0];
const persons = document.getElementsByClassName('persons')[0];
const personsLis = persons.getElementsByTagName('li');
const wrap = document.getElementsByClassName('wrap')[0];

bubble();

function bubble() {
  let oc = null;
  let time1 = 0;
  let time2 = 0;
  for (let i = 0; i < personsLis.length; i++) {
    personsLis[i].onmouseenter = function () {
      for (let j = 0; j < personsLis.length; j++) {
        personsLis[j].style.opacity = .2;
      }
      this.style.opacity = 1;
      addCanvas();
      oc.style.left = (document.body.clientWidth - 948) / 2 + this.offsetLeft  + "px";
      console.log( document.body.clientWidth );
      console.log()
    }
  }

  function addCanvas() {
    if (!oc) {
      oc = document.createElement('canvas');
      oc.style.width = personsLis[0].offsetWidth + "px";
      oc.style.height = personsLis[0].offsetHeight + "px";
      oc.style.position = "absolute";
      wrap.onmouseleave = function () {
        for (let j = 0; j < personsLis.length; j++) {
          personsLis[j].style.opacity = 1;
        }
        removeCanvas();
      }
      team.appendChild(oc);
      Bubble();
    }
  }

  function Bubble() {
    if (oc.getContext) {
      let ctx = oc.getContext("2d");
      let arr = [];
      time1 = setInterval(function () {
        ctx.clearRect(0, 0, oc.width, oc.height);
        for (let i = 0; i < arr.length; i++) {
          arr[i].deg += 10;
          arr[i].x = arr[i].startX + Math.sin(arr[i].deg * Math.PI / 180) * arr[i].step * 2;
          arr[i].y = arr[i].startY - (arr[i].deg * Math.PI / 180) * arr[i].step;
          if (arr[i].y <= 50) {
            arr.splice(i, 1)
          }
        }
        for (let i = 0; i < arr.length; i++) {
          ctx.save();
          ctx.fillStyle = "rgba(" + arr[i].red + "," + arr[i].green + "," + arr[i].blue + "," + arr[i].alp + ")";
          ctx.beginPath();
          ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        }
      }, 1000 / 60)

      time2 = setInterval(function () {
        let r = Math.random() * 6 + 2;
        let x = Math.random() * oc.width;
        let y = oc.height - r;
        let red = Math.round(Math.random() * 255);
        let green = Math.round(Math.random() * 255);
        let blue = Math.round(Math.random() * 255);
        let alp = 1;
        let deg = 0;
        let startX = x;
        let startY = y;
        //曲线的运动形式
        let step = Math.random() * 20 + 10;
        arr.push({
          x: x,
          y: y,
          r: r,
          red: red,
          green: green,
          blue: blue,
          alp: alp,
          deg: deg,
          startX: startX,
          startY: startY,
          step: step
        })
      }, 50)
    }
  }

  function removeCanvas() {
    oc.remove();
    oc = null;
    clearInterval(time1);
    clearInterval(time2);
  }
}
