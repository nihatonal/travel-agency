import { readFile } from './cropImage';
import { useImageCropContext } from './ImageCropProvider';
import Button from './Button';
import Cropper from './Cropper';
import { RotationSlider, ZoomSlider } from './Sliders';
import './crop.css'
const ImageCropModalContent = ({ handleDone, handleClose }) => {
    const { setImage } = useImageCropContext();

    const handleFileChange = async ({ target: { files } }) => {
        const file = files && files[0];
        const imageDataUrl = await readFile(file);
        setImage(imageDataUrl);
    };

    return (
        <div className="profile-image-crop-container">
            <h5 className="text-gray-800 mb-4">Edit profile picture</h5>
            <div className="profile-image-crop-wrapper">
                <div className="flex justify-center">
                    <div className="crop-container mb-4">
                        <Cropper />
                    </div>
                </div>
                <ZoomSlider className="mb-4" />
                <RotationSlider className="mb-4" />
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="avatarInput"
                    accept="image/*"
                />

                <button variant="light" className="crop-btn">
                    <label htmlFor="avatarInput">Upload Another Picture</label>
                </button>
                <div className="crop-btns">
                    <button className="crop-btn cancel-btn" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="crop-btn" onClick={handleDone}>
                        Done & Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropModalContent;