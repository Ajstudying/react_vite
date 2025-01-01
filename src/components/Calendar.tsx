import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 기본 스타일 import

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null); // Date | null 타입으로 정의
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {startDate ? startDate.toLocaleDateString() : "날짜 선택"}
      </button>

      {isOpen && (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setIsOpen(false); // 날짜 선택 후 달력 닫기
          }}
          inline // 인라인 모드로 표시
        />
      )}
    </div>
  );
};

export default Calendar;
