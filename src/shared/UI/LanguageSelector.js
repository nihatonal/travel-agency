import React, { useContext, useState, useEffect } from "react";


import { languageOptions } from "../../assets/languages/index";
import { LanguageContext } from "../context/Language";

import "./LanguageSelector.css";

export default function LanguageSelector(props) {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("ru");
  const [selectedFlag, setSelectedFlag] = useState('');

  useEffect(() => {
    const defaultLanguage = localStorage.getItem("rcml-lang");
    setSelectedOption(defaultLanguage);
    if (!defaultLanguage) {
      setSelectedFlag("Рус");
    }
    if (defaultLanguage === "en") {
      setSelectedFlag("Eng");
    } else if (defaultLanguage === "ru") {
      setSelectedFlag("Рус");
    } else if (defaultLanguage === "tr") {
      setSelectedFlag('Tr');
    }
  }, [userLanguage]);

  const langListFiltered = React.useMemo(() => {
    return Object.fromEntries(
      Object.entries(languageOptions).filter(
        ([key]) => !key.includes(selectedOption)
      )
    );
  }, [selectedOption]);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const setSelectedThenCloseDropdown = (index) => {
    setSelectedOption(index);
    setIsOptionsOpen(false);
    userLanguageChange(index);

    if (index === "ru") {
      setSelectedFlag("Рус");
    } else if (index === "en") {
      setSelectedFlag("Eng");
    } else if (index === "tr") {
      setSelectedFlag('Tr');
    }

  };

  return (
    <div className="select-lang">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        className={isOptionsOpen ? "expanded flag_button" : "flag_button"}
        onClick={toggleOptions}
        style={props.style}
      >
        {selectedFlag}
        {/* <img src={selectedFlag} alt="flag" /> */}
      </button>
      <ul
        className={`options ${isOptionsOpen ? "show" : ""}`}
        role="listbox"
        aria-activedescendant={selectedOption}
        tabIndex={-1}
      >
        {Object.entries(langListFiltered).map(([id, name]) => (
          <li
            key={id}
            id={id}
            role="option"
            aria-selected={selectedOption === id}
            tabIndex={0}
            onClick={() => {
              setSelectedThenCloseDropdown(id);
            }}
          >
            {name.name}
            {/* <img src={name.flag} alt="flag" /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
