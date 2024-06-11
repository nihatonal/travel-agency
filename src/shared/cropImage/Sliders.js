import { useImageCropContext } from './ImageCropProvider';
import classNames from 'classnames';
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { HiArrowUturnRight } from "react-icons/hi2";

export const ZoomSlider = ({ className }) => {
    const { zoom, setZoom, handleZoomIn, handleZoomOut, max_zoom, min_zoom, zoom_step } =
        useImageCropContext();

    return (
        <div className={'slider-btn-wrapper'}>
            <button className="icon-btn" onClick={handleZoomOut}>
                <AiOutlineMinus className="text-gray-400 w-4" />
            </button>
            <input
                type="range"
                name="volju"
                min={min_zoom}
                max={max_zoom}
                step={zoom_step}
                value={zoom}
                onChange={e => {
                    setZoom(Number(e.target.value));
                }}
            />
            <button className="icon-btn" onClick={handleZoomIn}>
                <AiOutlinePlus className="text-gray-400 w-4" />
            </button>
        </div>
    );
};

export const RotationSlider = ({ className }) => {
    const {
        rotation,
        setRotation,
        max_rotation,
        min_rotation,
        rotation_step,
        handleRotateAntiCw,
        handleRotateCw
    } = useImageCropContext();

    return (
        <div className={'slider-btn-wrapper'}>
            <button className="icon-btn" onClick={handleRotateAntiCw}>
                <HiArrowUturnLeft className="text-gray-400 w-4" />
            </button>
            <input
                type="range"
                name="volju"
                min={min_rotation}
                max={max_rotation}
                step={rotation_step}
                value={rotation}
                onChange={e => {
                    setRotation(Number(e.target.value));
                }}
            />
            <button className="icon-btn" onClick={handleRotateCw}>
                <HiArrowUturnRight className="text-gray-400 w-4" />
            </button>
        </div>
    );
};