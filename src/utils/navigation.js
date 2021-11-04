//定位描点id
export function location(id) {
  let el = document.getElementById(id);
  this.$nextTick(function() {
    document.getElementById("mini-body").scrollTo({
      behavior: "smooth",
      top: el && el.offsetTop
    });
  });
}
export function onScroll(id) {
  const navContents = document.querySelectorAll(".content");
  // 所有锚点元素的 offsetTop
  const offsetTopArr = [];
  navContents.forEach(item => {
    let temp = {
      offsetTop: item.offsetTop,
      id: item.id
    };
    offsetTopArr.push(temp);
  });

  // 获取当前文档流的 scrollTop
  const scrollTop = document.getElementById("mini-body").scrollTop;
  // 定义当前点亮的导航下标
  let navIndex = "";
  for (let n = 0; n < offsetTopArr.length; n++) {
    // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
    // 那么此时导航索引就应该是 n 了
    if (scrollTop >= offsetTopArr[n].offsetTop - 100) {
      navIndex = offsetTopArr[n].id;
    }
  }
  // 把下标赋值给 vue 的 data
  id = navIndex;
}
