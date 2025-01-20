document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.querySelector('.avatar');

    avatar.addEventListener('click', (event) => {
        const fallingImg = document.createElement('img');
        fallingImg.src = 'common_pics/NotoCatWithWrySmile.png'; // 确保路径正确
        fallingImg.classList.add('falling-image');

        // 设置图片初始位置为鼠标点击位置
        fallingImg.style.left = `${event.clientX}px`;
        fallingImg.style.top = `${event.clientY}px`;

        document.body.appendChild(fallingImg);
        $(".falling-image").animate({ left: Math.random() * 80 + "%", top: Math.random() * 80 + "%", rotate: Math.random() * 7200 + 'deg', opacity: '0' }, 1000);


        // 动画结束后移除图片
        fallingImg.addEventListener('animationend', () => {
            fallingImg.remove();
        });
    });
});