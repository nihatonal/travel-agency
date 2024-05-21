import React from 'react';

function WriteComment(props) {

    // image upload
    // useEffect(() => {
    //     const uploadPhoto = async () => {
    //         try {
    //             const formData = new FormData();
    //             formData.append("image", formState.inputs.image.value);
    //             const responseData = await sendRequest(
    //                 process.env.REACT_APP_BACKEND_URL + "/users/userphoto",
    //                 "POST",
    //                 formData
    //             );
    //             setimageFile(responseData.data.path);
    //             setDelete(true);
    //         } catch (err) {
    //             if (formState.inputs.image.value !== null) {
    //                 SignUp.error = err.message;
    //                 setShowRenew(true);
    //                 setErrorUpload(true);
    //             }
    //         }
    //     };

    //     uploadPhoto();
    // }, [formState.inputs.image.value, sendRequest, SignUp.error]);
    return (
        <div>

        </div>
    );
}

export default WriteComment;