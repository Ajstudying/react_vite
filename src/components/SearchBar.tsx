import { useCallback, useEffect, useState } from "react";

interface SearchBarProps {
  selectionList: {
    [key: string]: string; // 각 키는 문자열, 값도 문자열
  };
  onSubmit: (selectedOption: string, inputData: string) => void;
}
const SearchBar = ({ selectionList, onSubmit }: SearchBarProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const firstKey = Object.keys(selectionList)[0]; // 첫 번째 키 가져오기
    if (firstKey) {
      setSelectedOption(firstKey); // 첫 번째 키를 selectedOption으로 설정
    }
  }, [selectionList]);

  //select 값 제어
  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    },
    [selectedOption]
  );
  //input 제어
  const handleSearchInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputData(event.target.value);
    },
    [inputData]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 방지
    onSubmit(selectedOption, inputData);
    setInputData("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select onChange={handleSelectChange} value={selectedOption}>
          {Object.entries(selectionList).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <input type="text" onChange={handleSearchInput} value={inputData} />
        <button className="bg-black text-white font-semibold py-1 px-4 rounded hover:bg-gray-800">
          검색
        </button>
      </form>
    </>
  );
};

export default SearchBar;
