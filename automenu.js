document.addEventListener("DOMContentLoaded", function() {
    generateTOC(); // 页面加载时生成目录
});

function generateTOC() {
    console.log("Generating Table of Contents...");

    const navContent = document.querySelector(".nav-content");
    const content = document.querySelector(".content");

    if (!navContent || !content) {
        console.error("navContent or content element not found.");
        return;
    }

    const headings = Array.from(content.querySelectorAll("h1, h2, h3, h4, h5, h6"));

    if (headings.length === 0) {
        console.log("No headings found, exiting TOC generation.");
        return;
    }

    const tocList = document.createElement("ul");

    headings.forEach((heading, index) => {
        const tocItem = document.createElement("li");
        const tocLink = document.createElement("a");

        const headingText = heading.textContent.trim();

        tocLink.href = `#${heading.id || 'heading' + index}`;
        tocLink.textContent = headingText;

        if (!heading.id) {
            heading.id = 'heading' + index;
        }

        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
    });

    navContent.innerHTML = ''; // 清除之前的内容
    navContent.appendChild(tocList);

    const updateActiveLink = () => {
        const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

        let activeLink = null;
        headings.forEach((heading) => {
            if (heading.offsetTop <= scrollPos && (heading.offsetTop + heading.offsetHeight) > scrollPos) {
                if (!activeLink || heading.offsetTop > activeLink.offsetTop) {
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
    };

    updateActiveLink(); // 初始化时高亮当前部分
    window.addEventListener('scroll', updateActiveLink);

    console.log("TOC generated and added to the page.");
}
