import { createContext } from 'react';

export const ShareContext = createContext({
    setProfileImage: () => { },
    image: null
});
