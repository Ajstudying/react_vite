//특정 날짜 포맷으로 생성하기
function getDate(dateObject: Date | null) {
  let date;
  if (dateObject !== null) {
    date = dateObject;
  } else {
    date = new Date();
  }
  // 연도, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // "yyyy-MM-dd" 형식으로 반환
}

export default getDate;
