import { useEffect, useState } from "react";

interface SearchBarProps {
  selectionList: {
    [key: string]: string; // 각 키는 문자열, 값도 문자열
  };
}
const SearchBar = ({ selectionList }: SearchBarProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputData, setInputData] = useState("");

  //select 값 제어
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };
  //input 제어
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
    console.log(event.target.value);
  };

  //서버검색
  const handleSearch = () => {};

  return (
    <>
      <form onSubmit={handleSearch}>
        <select onChange={handleSelectChange} value={selectedOption}>
          {Object.entries(selectionList).map(([key, value]) => (
            <option value={key}>{value}</option>
          ))}
        </select>
        <input type="text" onBlur={handleSearchInput} />
        <button className="bg-black text-white font-semibold py-1 px-4 rounded hover:bg-gray-800">
          검색
        </button>
      </form>
    </>
  );
};

export default SearchBar;
