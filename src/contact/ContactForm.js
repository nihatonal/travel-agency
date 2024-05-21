import React, { useState } from "react";
import Modal from "react-modal";
import Input from '../shared/components/Input'
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "../shared/util/validators";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./ContactForm.css";
Modal.setAppElement("#root");

function ContactForm(props) {
  const { isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [ModalIsOpen, setModalIsOpen] = useState(false);

  const sendHandler = async (e) => {
    e.preventDefault();
    // console.log(formState.inputs.name.value,
    //   formState.inputs.email.value,
    //   formState.inputs.location.value,
    //   formState.inputs.date.value,
    //   formState.inputs.message.value)
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/sendmail`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          phone: formState.inputs.phone.value,
          message: formState.inputs.message.value
        }),
        {
          "Content-Type": "application/json",
        }

      );

      setModalIsOpen(true);
    } catch (err) {
    }
  }




  return (
    <>
      <Modal
        isOpen={ModalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="popup-send"
      >
        <div className="block-popup">
          <h4> {formState.inputs.name.value},</h4>
          <h4>{props.data_success_email[0]}</h4>
          <h4>{props.data_success_email[1]}</h4>
        </div>
        <span
          onClick={() => setModalIsOpen(false)}
          className="close-btn"
        ></span>
      </Modal>
      <div id="form-wrapper" className={props.className}>
        <div id="form-inner">
          <div id="MainResult"></div>
          <div id="MainContent">
            <form
              id="MyContactForm"
              name="MyContactForm"
              method="post"
              onSubmit={sendHandler}
              className='contact_form'
            >
              <Input
                id="name"
                element="input"
                type="name"
                placeholder={props.data_form[0]}
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}

              />
              <Input
                id="email"
                element="input"
                type="email"
                placeholder={props.data_form[1]}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                onInput={inputHandler}

              />
              <Input
                id="phone"
                element="input"
                type="text"
                placeholder={props.data_form[2]}
                validators={[]}
                onInput={inputHandler}

              />
              <Input
                id="message"
                element="textarea"
                type="text"
                placeholder={props.data_form[3]}
                validators={[]}
                onInput={inputHandler}

              />
              <div>
                {/* <input
                  type="submit"
                  className={`contact-btn ${props.className}`}
                  value="Send Message"
                  disabled={!formState.isValid}
                /> */}
                <button
                  type="submit"
                  className="contact-send-btn"
                  disabled={!formState.isValid}>
                  {isLoading ?
                    <PropagateLoader
                      color={'white'}
                      loading={true}
                      cssOverride={''}
                      size={4}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    /> :
                    props.data_form[4]}
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
