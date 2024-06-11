import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import TourCard from './TourCard.js';
import { FaUserCircle } from "react-icons/fa";
import Modal from '../../shared/UI/Modal'
import './TouristDetails.css';

function TouristDetails(props) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttpClient();
    const [loadedTourist, setLoadedTourist] = useState([]);

    const temail = useParams().temail;

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/tourists/gettourists`
                );
                // console.log(responseData.tourists.filter((item) => item.touristemail === temail))
                setLoadedTourist(responseData.tourists.filter((item) => item.touristemail === temail))

            } catch (err) { }
        };
        fetchPlace();
    }, [sendRequest, temail]);

    const confirmDeleteHandler = async (_id) => {
        setShowConfirmModal(false);
        const filter = loadedTourist.filter((item) => item.id !== _id)
        setLoadedTourist(filter);



        try {
            await sendRequest(
                `http://localhost:5000/api/tourists/${_id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            if (filter.length < 1) {
                navigate("/tourists/touristlist");
            }
            setLoadedTourist(loadedTourist.filter((item) => item.id !== _id))
        } catch (err) { }
    };


    return (
        <div className="admin-content-wrapper">

            <div className="admin-content">
                <div className="tourist-details-header">
                    {loadedTourist.length > 0 && loadedTourist[0].image !== "" ?
                        < img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourist[0].image}`} alt='profileimage' /> :
                        <div className="profile_icon">
                            <FaUserCircle />
                        </div>
                    }
                    <div className="tourist-details-header-content">
                        <h3 className="tourist-details-title">{loadedTourist.length > 0 && loadedTourist[0].touristname}</h3>
                        <a href={`mailto:${loadedTourist.length > 0 && loadedTourist[0].touristemail}`} target='_blank' rel='noopener noreferrer'>
                            <span>Email:</span>{loadedTourist.length > 0 && loadedTourist[0].touristemail}
                        </a>
                        <a href={`tel:${loadedTourist.length > 0 && loadedTourist[0].touristphone}`} target='_blank' rel='noopener noreferrer'>
                            <span>Phone:</span>{loadedTourist.length > 0 && loadedTourist[0].touristphone}
                        </a>
                        <p><span>Tours:</span>{loadedTourist.length > 0 && loadedTourist.length}</p>
                        <p><span>Cost:</span>{loadedTourist.length > 0 &&
                            loadedTourist.length > 0 &&
                            new Intl.NumberFormat("ru-RU").format(loadedTourist.map((x) => Number(x.cost)).reduce((a, b) => a + b, 0))

                        } ₽</p>
                    </div>
                </div>

                {/* <a href='tel:+905308997709' target='_blank' rel='noopener noreferrer'
                            className="contact_info_item">
                            <AiOutlinePhone />+90 530 899 77 09
                        </a>
                        <a href='mailto:monihomes48@gmail.com' target='_blank' rel='noopener noreferrer'
                            className="contact_info_item">
                            <IoIosMail />monihomes48@gmail.com
                        </a> */}


                {isLoading ? <div className='loading-wrapper'><PropagateLoader
                    color={'#ff6a4f'}
                    loading={true}
                    cssOverride={''}
                    size={4}
                    aria-label="Loading Spinner"
                    data-testid="loader"

                /></div> :
                    <div className="tourists-wrapper">

                        {loadedTourist && loadedTourist.map((item) =>

                            <TourCard
                                data={item}
                                key={item.id}
                                deleteWarningHandler={showDeleteWarningHandler}
                            >
                                <Modal
                                    show={showConfirmModal}
                                    onCancel={cancelDeleteHandler}
                                    header="Are you sure?"
                                    footerClass="place-item__modal-actions"
                                    footer={
                                        <React.Fragment>
                                            <div className="tourist-card-btns">
                                                <button className='btn btn-tourist-card submit-btn' inverse onClick={cancelDeleteHandler}>
                                                    CANCEL
                                                </button>
                                                <button className='btn btn-tourist-card delete-btn' onClick={() => { confirmDeleteHandler(item.id) }}>
                                                    DELETE
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    }
                                >
                                    <p>
                                        Do you want to proceed and delete this place? Please note that it
                                        can't be undone thereafter.
                                    </p>
                                </Modal>
                            </TourCard>

                        )}

                    </div>
                }
            </div>
        </div>
    );
}

export default TouristDetails;