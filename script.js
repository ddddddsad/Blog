/**
 * 切换子菜单的显示状态
 * @param {string} id - 需要显示的子菜单的 ID
 */
function toggleSubmenu(id) {
    const submenu = $("#submenu");
    const submenuP = submenu.find("p");
    const targetP = $("#" + id).find("p");

    if (submenu.css("display") === "none") {
        submenu.css("display", "").animate({ width: 'toggle' });
        submenuP.css("display", "none");
        targetP.css("display", "");
        $("#main-content").animate({ marginLeft: '550px', marginRight: '200px' });
    } else if (targetP.css("display") === "block") {
        submenu.animate({ width: 'toggle' });
        $("#main-content").animate({ marginLeft: '350px', marginRight: '200px' });
    } else {
        submenuP.css("display", "none");
        targetP.css("display", "");
        $("#main-content").animate({ marginLeft: '550px', marginRight: '200px' });
    }
}

/**
 * 返回到上一级子菜单
 * @param {string} id - 上一级子菜单的 ID
 */
function goBackToSubmenu(id) {
    $("#submenu").find("p").css("display", "none");
    $("#" + id).find("p").css("display", "");
}

const contentCache = {};  // 用于缓存加载过的内容

/**
 * 动态加载主内容区域的内容
 * @param {string} url - 需要加载的内容的 URL
 */
function loadContent(url, callback) {
    if (contentCache[url]) {
        document.getElementById('main-content').innerHTML = contentCache[url];
        MathJax.typeset();  // 调用 MathJax 进行渲染
        if (callback) callback();
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        const htmlContent = xhr.responseText;
        document.getElementById('main-content').innerHTML = htmlContent;
        contentCache[url] = htmlContent;  // 缓存加载的内容
        MathJax.typeset();  // 调用 MathJax 进行渲染
        if (callback) callback();
    };
    xhr.send();
}

/**
 * 滚动到页面中的特定元素
 * @param {string} id - 元素的 ID
 */
function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
