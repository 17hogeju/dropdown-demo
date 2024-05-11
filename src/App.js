import './App.css';
import Dropdown from './components/Dropdown/Dropdown'
import React from 'react';
import { CLASSES, DATA, LEVELS } from './constants/sampleData';

function App() {
  const [filterSettings, setFilterSettings] = React.useState({
    level: 'None',
    classes: [],
  });
  const [filteredResults, setFilteredResults] = React.useState(DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterSettings({
      ...filterSettings,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Filters the DATA array to obtain only the entries that meet the specified criteria based on the user's filter settings.
    // This operation performs two checks simultaneously:
    const filteredData = DATA.filter(item =>
      // Level Filter: It checks if the 'level' in filterSettings is set to 'None', which means no filtering by level is required. 
      //    If not 'None', it checks whether the item's level matches the level specified in filterSettings.
      (filterSettings.level === 'None' || item.level === filterSettings.level) &&
      // Class Filter: It first checks if any classes are specified in filterSettings. If no classes are specified, no filtering by class is needed.
      //    If classes are specified, it further checks two conditions:
      //    a) The item must have at least one class defined (item.class.length).
      //    b) There should be an overlap between the item's classes and the classes specified in filterSettings. This is achieved by checking if 
      //       any class tags in the item are included in the filterSettings.classes array.
      (!filterSettings.classes.length || (item.class.length && item.class.some(tag => filterSettings.classes.includes(tag))))
    );

    setFilteredResults(filteredData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sample Data for Text Moderation</h1>
        <div className="sectionContainer">
          <h3>Select filters to customize displayed results</h3>
          <form onSubmit={handleSubmit} className="formContainer">
            <Dropdown label='Severity Level' optionStrings={LEVELS} onChange={handleChange} value={filterSettings.level} name="level"></Dropdown>
            <Dropdown label='Classes' multiselect optionStrings={CLASSES} onChange={handleChange} value={filterSettings.classes} name="classes"></Dropdown>
            <button type="submit" className="submitButton">Apply Filters</button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Severity Level</th>
              <th>Classes</th>
              <th>Text Content</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((item) => (
              <tr key={item.id}>
                <td>{item.level}</td>
                <td>{item.class.length ? item.class.join(", ") : "None"}</td>
                <td>{item.text}</td>
              </tr>
            ))}

          </tbody>
        </table>

      </header>
    </div>
  );
}

export default App;
