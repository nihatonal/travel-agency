import { useState } from "react";
import { useRef } from "react";
import './AccordionItem.css'
const AccordionItem = ({ question, answer }) => {

    const [clicked, setClicked] = useState(false);
    const contentEl = useRef();



    const handleToggle = () => {
        setClicked((prev) => !prev);
    };

    return (
        <li className={`accordion_item ${clicked ? "active" : ""}`}>
            <button className="button" onClick={handleToggle}>
                {question}
                <span className="control">{clicked ? "—" : "+"} </span>
            </button>

            <div
                ref={contentEl}
                className="answer_wrapper"
                style={
                    clicked
                        ? { height: contentEl.current.scrollHeight }
                        : { height: "0px" }
                }
            >
                <div className="answer">{answer}</div>
            </div>
        </li>
    );
};

export default AccordionItem;