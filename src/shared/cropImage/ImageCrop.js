import { useState, useContext } from 'react';
import user1 from '../../assets/images/user_1.jpg';
import Modal from './Modal';
import { ShareContext } from '../context/share-context';
import { readFile } from './cropImage';
import ImageCropModalContent from './ImageCropModalContent';
import { useImageCropContext } from './ImageCropProvider';
import './crop.css'
const ImageCrop = () => {
    const share = useContext(ShareContext);
    const [openModal, setOpenModal] = useState(false);
    const [preview, setPreview] = useState(user1);

    const { getProcessedImage, setImage, resetStates } = useImageCropContext();

    const handleDone = async () => {
        const avatar = await getProcessedImage();
        setPreview(window.URL.createObjectURL(avatar));
        resetStates();
        setOpenModal(false);
        share.setProfileImage(avatar)
    };

    const handleFileChange = async ({ target: { files } }) => {
        const file = files && files[0];
        if (!file) return
        const imageDataUrl = await readFile(file);
        setImage(imageDataUrl);
        setOpenModal(true);
    };

    return (
        <div className="crop-image-container">
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="avatarInput"
                accept="image/*"
            />
            <label htmlFor="avatarInput" className="cursor-pointer">
                <img
                    src={preview}
                    height={192}
                    width={192}
                    className=""
                    alt=""
                />
            </label>

            <Modal open={openModal} handleClose={() => setOpenModal(false)}>
                <ImageCropModalContent handleDone={() => {
                    handleDone();
                    setOpenModal(false)
                }} handleClose={() => setOpenModal(false)} />
            </Modal>
        </div>
    );
};

export default ImageCrop;