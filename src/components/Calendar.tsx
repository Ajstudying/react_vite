import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 기본 스타일 import
import getDate from "./getDate";
interface CalendarProps {
  selectedDate: string;
  onDateChange: (date: Date | null) => void;
}

//달력 라이브러리 사용
const Calendar = ({ onDateChange, selectedDate }: CalendarProps) => {
  const today = getDate(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null); // Date | null 타입으로 정의
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handleToggle}
        className={startDate ? "selected" : ""} // 선택 여부에 따라 클래스 추가
      >
        {/* {startDate ? startDate.toLocaleDateString() : today} */}
        {startDate ? selectedDate : today}
      </button>

      {isOpen && (
        <div className="calendar-container">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              onDateChange(date); // 부모 컴포넌트에 날짜 전달
              setIsOpen(false); // 날짜 선택 후 달력 닫기
            }}
            inline // 인라인 모드로 표시
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
