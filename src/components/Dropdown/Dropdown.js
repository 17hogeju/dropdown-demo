import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.css';



const Dropdown = ({ multiselect = false, optionStrings = [], label, onChange, name }) => {
  const [options, setOptions] = useState([])
  const [isVisible, setIsVisible] = useState(false);
  const optionsSetRef = useRef(false);
  const dropdownRef = useRef(null);

  // Determines if all options are selected
  const isFull = () => {
    return options.every(option => option.isSelected);
  };

  // Computes button text based on selected options
  const computeButtonText = () => {
    const selected = options.filter(option => option.isSelected);
    return selected.length > 0 ? selected.map(option => option.label).join(', ') : 'None';
  };

  // Effect to initialize options from optionStrings prop
  useEffect(() => {
    if (!optionsSetRef.current) {
      const optionObjects = optionStrings.map((option) => ({
        id: option.trim().replace(/\s+/g, '-').toLowerCase(),
        label: option,
        isSelected: false
      }));
      setOptions(optionObjects);
      optionsSetRef.current = true; // Marks that initial options have been set
    }

  }, [optionStrings])

  // Effect to handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsVisible(false); // Close the dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);  // Cleanup to remove event listener
    };
  }, []);

  // Handles selection/deselection of options
  const handleToggleChoice = (selectedOption, event) => {
    let updatedOptions = [...options];

    if (multiselect) {
      // Multiselect logic: toggle the selection state of the clicked option
      updatedOptions = options.map(option => {
        if (option.id === selectedOption.id) {
          return { ...option, isSelected: !option.isSelected }; // Toggle the isSelected property
        }
        return option; // Return unmodified for other options
      });

      // Update the options state, trigger OnChange, do NOT close dropdown after one selection
      setOptions(updatedOptions);
      onChange({
        target: {
          name,
          value:
            updatedOptions.filter(option => option.isSelected).map(option => option.label)
        }
      });
    } else {
      // Single select logic
      event.preventDefault(); // needed for setIsVisible
      updatedOptions = options.map(option => {
        if (option.id === selectedOption.id) {
          return { ...option, isSelected: true };  // Set the clicked option as selected
        }
        return { ...option, isSelected: false }; // Set all other options as not selected
      })

      // Update the options state, trigger OnChange and close the dropdown
      setOptions(updatedOptions);
      setIsVisible(false);
      onChange({
        target: {
          name,
          value: selectedOption.label
        }
      });
    }
  }

  // Handles 'Select All' option for multiselect
  const handleSelectAll = (event) => {
    // Maps over the existing options to update their isSelected property
    const updatedOptions = options.map(option => ({
      ...option,
      // Sets isSelected to true or false for all options based on the checkbox's current checked state
      isSelected: event.target.checked
    }));

    setOptions(updatedOptions);
    onChange({
      target: {
        name,
        value: event.target.checked ? updatedOptions.map(option => option.label) : []
      }
    });
  }

  // Toggles the visibility of the dropdown
  const toggleDropdown = () => {
    setIsVisible(prev => !prev);
  }


  return (
    <div className={styles.Dropdown} data-testid="Dropdown" ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className={styles.btn}>{label}: {computeButtonText()}</button>
      {isVisible && (
        <div id='dropdown-content' className={styles.dropdownContent}>
          <div id="dropdownForm">
            <label onClick={(e) => !multiselect && handleToggleChoice({ id: 'default', label: 'None' }, e)} key='default'>
              {multiselect && <input
                onChange={handleSelectAll}
                type='checkbox'
                name='default'
                checked={isFull()}
                value='All'
              />}
              {multiselect ? 'All' : 'None'}
            </label>
            {options.map(option => (
              // Using a label here so user can toggle checkbox just by clicking in the label
              <label onClick={(e) => !multiselect && handleToggleChoice(option, e)} key={option.id}>
                {multiselect ? (
                  <input
                    onChange={(e) => handleToggleChoice(option, e)}
                    type="checkbox"
                    checked={option.isSelected}
                    value={option.id}
                  />
                ) : null}
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

Dropdown.propTypes = {
  multiselect: PropTypes.bool,
  optionStrings: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Dropdown;
