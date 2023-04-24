// IO play pause video
function playPauseVideo() {
  let videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    // We can only control playback without interaction if video is mute
    video.muted = true;
    // Play is a promise so we need to check we have it
    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {
        let observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.intersectionRatio !== 1 && !video.paused) {
                video.pause();
              } else if (video.paused) {
                video.play();
              }
            });
          },
          { threshold: 0.25 }
        );
        observer.observe(video);
      });
    }
  });
}
playPauseVideo();
