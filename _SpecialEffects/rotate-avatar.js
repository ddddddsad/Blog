document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.querySelector('.avatar');

if (avatar) {  // 确保元素存在
    avatar.addEventListener('mouseenter', () => {
        avatar.style.animationPlayState = 'paused'; // 鼠标悬停时暂停动画
    });

    avatar.addEventListener('mouseleave', () => {
        avatar.style.animationPlayState = 'running'; // 鼠标移开时恢复动画
    });
};
});
