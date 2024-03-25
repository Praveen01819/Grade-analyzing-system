import user from './user.json';
import { useEffect, useState } from 'react';
import "./App.css";
import { BarChart } from 'reaviz';

// Grade point mapping
const gradeMapping = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C":5,
  "RA": 0,
  "SA": 0,
  "W": 0
};


const gradeColors = {
  "O": "#00FF00",
  "A+": "#33CC33",
  "A": "#66CC66",
  "B+": "#99CC99",
  "B": "#CCCCFF",
  "C":" #4169E1",
  "RA": "#FF6666",
  "SA": "#FF3333",
  "W": "#FF0000"
};

function App() {
  const [keysToFilter, setKeysToFilter] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState([]);
  const [chartData, setChartData] = useState([]);

  function generateChartData(data, xAxisLabel) {
    return data.map((item, index) => ({
      key: `Record ${index + 1}`, 
      data: gradeMapping[item.grade],
      color: gradeColors[item.grade]
    }));
  }

  useEffect(() => {
    const keys = Object.keys(user[0]).filter(key => key !== "grade");
    setKeysToFilter(keys);
    setResult(user);
  }, []);

  useEffect(() => {
    if (result.length > 0 && selectedOption) {
      setChartData(generateChartData(result, selectedOption));
    }
  }, [result, selectedOption]);

  function changeText(e) {
    setSelectedOption(e.target.value);
    const filterValues = [...new Set(user.map(item => item[e.target.value]))];
    setOptions(filterValues);
    setSelectedFilter(""); 
  }

  function changeRadio(e) {
    setSelectedFilter(e.target.value);
  }

  function filterData() {
    let filtered;
    if (selectedOption === "semester" || selectedOption === "credits" || selectedOption === "register_number") {
      filtered = user.filter((e) => {
        return e[selectedOption] === parseInt(selectedFilter.replace("semester", ""));
      });
    } else {
      filtered = user.filter((e) => {
        return e[selectedOption] === selectedFilter;
      });
    }
    setResult(filtered);
  }

  return (
    <div className="App">
      <header className="menu-bar">
        <h1 className="title">Grade Analysis System</h1>
        <nav>
          <ul>
            <li><a href="#"><i className="fas fa-chart-line"></i> Dashboard</a></li>
            <li><a href="#"><i className="fas fa-user"></i> User</a></li>
            <li><a href="#"><i className="fas fa-envelope"></i> Contact Us</a></li>
            <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </nav>
      </header>

      <div className="container">
        <div className="left">
          <div className="chart-container">
            {chartData.length > 0 && (
              <BarChart id='bar' width={350} height={250} data={chartData} />
            )}
          </div>

          <div className="select-container">
            <select onChange={(e) => changeText(e)}>
              <option value="">Select</option>
              {keysToFilter.map((e) => (
                <option value={e} key={e}>{e}</option>
              ))}
            </select>

            {selectedOption && (
              <>
                <div className="radio-container">
                  {options.map((option, index) => (
                    <div key={index}>
                      <input type='radio' name={selectedOption} value={option} onChange={(e) => changeRadio(e)} />
                      <label>{selectedOption === "semester" ? `Semester ${option}` : option}</label>
                    </div>
                  ))}
                </div>
                <button onClick={filterData}>Apply</button>
              </>
            )}
          </div>
        </div>

        <div className="right">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Register_number</th>
                  <th>Grade</th>
                  <th>Semester</th>
                  <th>Credits</th>
                  <th>Course Code</th>
                </tr>
              </thead>
              <tbody>
                {result.map((e, index) => (
                  <tr key={index}>
                    <td>{e.register_number}</td>
                    <td>{e.grade}</td>
                    <td>{e.semester}</td>
                    <td>{e.credits}</td>
                    <td>{e.course_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

