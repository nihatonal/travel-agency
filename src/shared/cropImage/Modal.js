import classNames from 'classnames';

const Modal = ({ open, children }) => {
    return (
        <div
            className={'modal-crop-wrapper'}
            id="modal"
            style={open ? { display: "flex" } : { display: "none" }}
        >
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {children}
            </div>
        </div>
    );
};

export default Modal;