import { useState, useCallback } from "react";


export const useShare = () => {
    const [image, setImage] = useState();

    const setProfileImage = useCallback((item) => {
        setImage(item)
    }, []);

    return { setProfileImage, image };
};
