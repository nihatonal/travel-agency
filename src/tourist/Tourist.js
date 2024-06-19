import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../shared/hooks/form-hook";

import ErrorModal from '../shared/UI/ErrorModal';
import SuccessModal from '../shared/UI/SuccessModal';
import { useHttpClient } from "../shared/hooks/http-hook";
import Input from '../shared/components/Input';
import {
    VALIDATOR_REQUIRE

} from "../shared/util/validators.js";

import { ShareContext } from '../shared/context/share-context';
import ImageCrop from '../shared/cropImage/ImageCrop';
import ImageCropProvider from '../shared/cropImage/ImageCropProvider';
import { FaCheck } from "react-icons/fa6";
import PropagateLoader from "react-spinners/PropagateLoader";
import './Tourist.css';
function Tourist(props) {
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location)
    const share = useContext(ShareContext);
    const touristId = useParams().tid;
    const { isLoading, sendRequest } = useHttpClient();
    const [imageFile, setimageFile] = useState(null);
    const [deleteImg, setDeleteImg] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const [formState, inputHandler] = useForm({
        comment: {
            value: '',
            isValid: false,
        },
        touristcode: {
            value: '',
            isValid: false,
        },

    });
    useEffect(() => {
        if (Array.isArray(deleteImg) && deleteImg.length < 2) return

        const deletePhoto = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/tourists/deleteimage",
                    "DELETE",
                    JSON.stringify({
                        image: deleteImg[0],
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                setDeleteImg(deleteImg.slice(1))
            } catch (err) { }
        };
        deletePhoto();
    }, [deleteImg, sendRequest]);

    useEffect(() => {

        const uploadPhoto = async () => {
            try {
                const formData = new FormData();
                formData.append("image", share.image);

                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/tourists/uploadimage",
                    "POST",
                    formData
                );
                setimageFile(responseData.data.path);
                setDeleteImg(prevState => ([...prevState, responseData.data.path]))

            } catch (err) {
                if (share.image !== null) {

                }

            }
        };
        uploadPhoto();
    }, [share.image, sendRequest]);

    const commentHandler = async (e) => {
        e.preventDefault();
        //console.log(formState.isValid, formState.inputs.comment.value, formState.inputs.touristcode.value, imageFile)
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/tourists/savecomment/${touristId}`,
                'PATCH',
                JSON.stringify({
                    comment: formState.inputs.comment.value,
                    touristcode: formState.inputs.touristcode.value,
                    image: imageFile
                }),
                {
                    'Content-Type': 'application/json',
                }

            );
            setSuccess(true)
            setTimeout(() => {
                navigate(`/`);
            }, 2000);

        } catch (err) {
            setError(true)
            console.log(error)
        }
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={() => { setError(false) }} />
            <SuccessModal success={success} onClear={() => { setSuccess(false) }} msg={'Anasayfaya yonlendiriliyorsunuz.'} />
            <div className='tourist-container'>
                <div className='tourist-wrapper'>
                    <div className="tourist-content">
                        <div className="profile-image">
                            <ImageCropProvider>
                                <ImageCrop />
                            </ImageCropProvider>
                        </div>
                        <div className="tourist-info">
                            <p className="tourist-name">Chuck Bartowski</p>
                            <p className="tourist-location"><FaCheck /> Antalya</p>
                            <p className="tourist otel"><FaCheck /> Aldai Resort Otel</p>
                            <p className="tourist-date"><FaCheck /> May 2024</p>
                        </div>
                    </div>
                    <div className="tourist-comment">
                        {/* <textarea type="text" onChange={inputHandler} id='comment' value={formState.inputs.comment.value} /> */}
                        <form
                            id="CommentForm"
                            name="CommentForm"
                            method="patch"
                            onSubmit={commentHandler}
                        >
                            <Input
                                id="comment"
                                element="textarea"
                                type="text"
                                placeholder={'Thanks for your comments...'}
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}

                            />
                            <Input
                                id="touristcode"
                                element="input"
                                type="text"
                                placeholder={'Please write code'}
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}

                            />
                            <button
                                type="submit"
                                className="comment-send-btn"
                                disabled={!formState.isValid || !share.image}>
                                {isLoading ?
                                    <PropagateLoader
                                        color={'white'}
                                        loading={true}
                                        cssOverride={''}
                                        size={4}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    /> :
                                    "Send"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
}

export default Tourist;

// const deleteHandler = async (e) => {
//     e.preventDefault();
//     try {
//         await sendRequest(
//             process.env.REACT_APP_BACKEND_URL + "/deleteimage",
//             "DELETE",
//             JSON.stringify({
//                 image: imageFile,
//             }),
//             {
//                 "Content-Type": "application/json",
//             }
//         );
//     } catch (err) { }
//     setDeleteImg(false);
// };

// const renewHandler = async () => {
//     setShowRenew(false);
//     setErrorUpload(false);

//     try {
//         const formData = new FormData();
//         formData.append("image", formState.inputs.image.value);
//         const responseData = await sendRequest(
//             process.env.REACT_APP_BACKEND_URL + "/users/userphoto",
//             "POST",
//             formData
//         );
//         setimageFile(responseData.data.path);
//         setDeleteImg(true);
//     } catch (err) {
//         if (formState.inputs.image.value !== null) setShowRenew(true);
//     }
// };

{/* <div className='tourist-profile image'>
                    <ImageUpload
                        center
                        id="image"
                        onInput={inputHandler}
                        picker={<img src={camera} alt="camera" />}
                        deleteHandler={deleteHandler}
                        Cancel={deleteHandler}
                        isLoading={isLoading}
                        showDelete={deleteImg}
                        showRenew={showRenew}
                        renewHandler={renewHandler}
                    />
                </div> */}