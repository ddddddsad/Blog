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
 * @param {function} callback - 加载完成后的回调函数
 */
async function loadContent(url, callback) {
    if (contentCache[url]) {
        document.getElementById('main-content').innerHTML = contentCache[url];
        MathJax.typeset();  // 调用 MathJax 进行渲染
        generateTOC(); // 保证切换内容后目录更新
        if (callback) callback();
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const htmlContent = await response.text();
        document.getElementById('main-content').innerHTML = htmlContent;
        contentCache[url] = htmlContent;  // 缓存加载的内容
        MathJax.typeset();  // 调用 MathJax 进行渲染

        // 在内容加载后调用 generateTOC
        generateTOC(); 

        if (callback) callback();
    } catch (error) {
        console.error('Error loading content:', error);
        // 可以在这里处理错误，例如显示一个错误消息
    }
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

/**
 * 更新活动链接，滚动时高亮当前显示的章节
 */
function updateActiveLink() {
    const headings = Array.from(document.querySelectorAll(".content h1, .content h2, .content h3, .content h4, .content h5, .content h6"));
    const navContent = document.querySelector(".nav-content");
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    let activeLink = null;

    headings.forEach((heading) => {
        const headingTop = heading.offsetTop - 10; // 添加一个小偏移量，提升检测精度
        const headingBottom = headingTop + heading.offsetHeight;

        if (scrollPos >= headingTop && scrollPos < headingBottom) {
            if (!activeLink || headingTop > activeLink.offsetTop) {
                activeLink = heading;
            }
        }
    });

    navContent.querySelectorAll("a").forEach((link) => link.classList.remove("active"));

    if (activeLink) {
        const activeTocLink = navContent.querySelector(`a[href='#${activeLink.id}']`);
        if (activeTocLink) {
            activeTocLink.classList.add("active");
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const articleNav = document.getElementById('article-nav');

    // 在页面加载时缩小导航栏
    articleNav.classList.add('collapsed');

    // 可选：在鼠标移出导航栏时再次缩小导航栏
    articleNav.addEventListener('mouseleave', () => {
        articleNav.classList.add('collapsed');
    });

    // 当鼠标悬停时展开导航栏
    articleNav.addEventListener('mouseenter', () => {
        articleNav.classList.remove('collapsed');
    });

    // 更新活动链接，滚动时高亮当前章节
    window.addEventListener('scroll', updateActiveLink);
});
