import { useState, useCallback } from "react";


export const useShare = () => {
    const [image, setImage] = useState();
    const [adminURL, setAdminURL] = useState([{ to: "/admin", toStr: "Home", active: "home" }])

    const setProfileImage = useCallback((item) => {
        setImage(item)
    }, []);

    const AdminURL = useCallback((item) => {
        setAdminURL(item)
    }, []);

    return { setProfileImage, image, AdminURL, adminURL };
};
