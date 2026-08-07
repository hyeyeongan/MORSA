const videoWraps = document.querySelectorAll('.hover-video_wrap');

videoWraps.forEach(wrap => {
    const video = wrap.querySelector('.hover-video');
    const thumbnail = wrap.querySelector('.video_thumbnail');
    const playBtn = wrap.querySelector('.play_btn');

    const showVideo = async () => {
        try {
            await video.play();

            // 실제로 재생에 성공한 다음 이미지를 숨김
            thumbnail.classList.add('hide');
            playBtn.classList.add('hide');
        } catch (error) {
            console.log('영상 재생 실패:', error);
        }
    };

    const resetVideo = () => {
        video.pause();
        video.currentTime = 0;

        thumbnail.classList.remove('hide');
        playBtn.classList.remove('hide');
    };

    // 마우스를 사용할 수 있는 PC만 hover 적용
    if (window.matchMedia('(hover: hover)').matches) {
        wrap.addEventListener('mouseenter', showVideo);
        wrap.addEventListener('mouseleave', resetVideo);
    }

    // 아이폰·태블릿은 터치할 때 재생/정지
    wrap.addEventListener('click', () => {
        if (window.matchMedia('(hover: none)').matches) {
            if (video.paused) {
                showVideo();
            } else {
                resetVideo();
            }
        }
    });
});