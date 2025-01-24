import { useEffect } from "react";
import { useState } from "react";

const optionsData = [
  "apple",
  "orange",
  "mango",
  "applejuice",
  "mangePickle",
  "orangeshake",
];
const config = ["single", "multiple"];
const MainComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [openDrop, setOpenDrop] = useState(false);
  const [data, setData] = useState([]);
  const [configValue, setConfigValue] = useState("single");
  const [options, setOptions] = useState(optionsData);

  useEffect(() => {
    if (inputValue !== "") {
      setOpenDrop(true);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    if (e.target.value === "") {
      setOptions(optionsData);
      setInputValue("");
      return;
    }

    setInputValue(e.target.value);

    const filteredValues = options.filter(
      (item) => item.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );

    setOptions(filteredValues);
  };

  const handleConfigChange = (e) => {
    setConfigValue(e.target.value);
    setData([]);
  };

  const handleOptions = (e) => {
    let textContent = e.target.textContent;
    if (configValue === "single") {
      setData([textContent]);
    } else if (configValue === "multiple") {
      if (data.includes(textContent)) {
        return;
      }
      setData((data) => [...data, textContent]);
    }
  };

  const handleFocus = (e) => {
    setOpenDrop(!openDrop);
  };

  return (
    <div>
      <select onChange={handleConfigChange}>
        {config.map((ele) => (
          <option key={ele}>{ele}</option>
        ))}
      </select>
      <div className="dropdown">
        <input
          value={inputValue}
          onChange={handleChange}
          onClick={handleFocus}
        />

        {openDrop && (
          <div className="option-section">
            {options.map((ele) => {
              return (
                <div key={ele} onClick={handleOptions}>
                  {ele}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="show-content">
        {data.length > 0 &&
          data.map((ele) => {
            return <div key={ele}>{ele}</div>;
          })}
      </div>
    </div>
  );
};

export default MainComponent;
