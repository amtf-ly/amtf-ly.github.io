export default function 监听图片点击(params) {
    const div = document.getElementById("页面顶层div")
    var imgs = div.querySelectorAll("img")
    const zoomOverlay = document.querySelector(".zoom-overlay")
    const zoomedImage = document.getElementById("zoomed-image")

    imgs.forEach(img => {
        img.addEventListener("click", () => {
            zoomedImage.src = img.src
            zoomOverlay.style.display = "block"
        })

        img.addEventListener("mouseover", () => {
            img.style.cursor = "zoom-in"
        })
    })

    zoomOverlay.addEventListener("click", () => {
        zoomOverlay.style.display = "none"
    })

    // var modal = document.getElementById("modal")
    // var modalImg = document.getElementById("img01")
    // var captionText = document.getElementById("caption")

    // // var img = document.getElementById("myImg");
    // console.log("imgs :>> ", imgs.length)
    // // 遍历所有图像并添加点击事件监听器
    // if (imgs.length > 0) {
    //     imgs.forEach(function (img) {
    //         console.log("img :>> ", img)
    //         img.onclick = function () {
    //             // 显示模态窗口的代码...
    //             modal.style.display = "block"
    //             modalImg.src = this.src
    //             captionText.innerHTML = this.alt
    //         }
    //     })
    // }
}
