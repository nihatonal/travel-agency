import { useState, useEffect } from "react";

const useVideoPlayer = (videoElement) => {
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        progress: 0,
        speed: 1,
        isFullScreen: false,
        volume: 0.4,
    });

    const togglePlay = () => {
        setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying,
        });
    };


    useEffect(() => {
        playerState.isPlaying
            ? videoElement.current.play()
            : videoElement.current.pause();
    }, [playerState.isPlaying, videoElement]);

    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        setPlayerState({
            ...playerState,
            progress,
        });
    };

    const handleVideoProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
        setPlayerState({
            ...playerState,
            progress: manualChange,
        });
    };

    const handleVideoSpeed = (event) => {
        const speed = Number(event.target.value);
        videoElement.current.playbackRate = speed;
        setPlayerState({
            ...playerState,
            speed,
        });
    };
    const handleVolume = (x) => {
        console.log(videoElement.current.getVideoPlaybackQuality());
        console.log(videoElement);
        videoElement.current.volume = x;
        setPlayerState({
            ...playerState,
            x,
        })
    }

    const toggleScreen = () => {
        videoElement.current.requestFullscreen()
    };

    // useEffect(() => {
    //     playerState.isFullScreen
    //         ? (videoElement.current.requestFullscreen())
    //         : (videoElement.current.muted = false);
    // }, [playerState.isFullScreen, videoElement]);

    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleScreen,
        handleVolume
    };
};

export default useVideoPlayer;