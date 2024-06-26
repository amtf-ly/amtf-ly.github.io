import type { Directive, DirectiveBinding } from 'vue';
interface ElType extends HTMLElement {
  parentNode: any;
}
const draggable: Directive = {
  mounted: function (el: ElType, binding: DirectiveBinding) {
    el.style.cursor = 'move';
    el.style.position = 'absolute';
    el.onmousedown = function (e) {
      let disX = e.pageX - el.offsetLeft;
      let disY = e.pageY - el.offsetTop;

      if (binding.value === 'father') {
        disX = e.pageX - el.parentNode.offsetLeft;
        disY = e.pageY - el.parentNode.offsetTop;
      } else {
        disX = e.pageX - el.offsetLeft;
        disY = e.pageY - el.offsetTop;
      }

      document.onmousemove = function (e) {
        let x = e.pageX - disX;
        let y = e.pageY - disY;
        let maxX;
        let maxY;

        if (binding.value === 'father') {
          maxX =
            el.parentNode.parentNode.offsetWidth - el.parentNode.offsetWidth;
          maxY =
            el.parentNode.parentNode.offsetHeight - el.parentNode.offsetHeight;
        } else {
          maxX = el.parentNode.offsetWidth - el.offsetWidth;
          maxY = el.parentNode.offsetHeight - el.offsetHeight;
        }

        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }

        if (binding.value === 'father') {
          el.parentNode.style.left = x + 'px';
          el.parentNode.style.top = y + 'px';
        } else {
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        }
      };
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};
export default draggable;