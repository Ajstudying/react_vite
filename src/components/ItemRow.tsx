import { ItemList } from "../itemData";

interface ItemRowProps {
  itemCheckedData: { [key: number]: boolean }; // { 아이템ID: 체크여부 }
  validate: boolean; // validate prop 추가
  itemList: ItemList[]; // itemList의 타입을 올바르게 정의
  onChange: (id: number) => void;
}

const ItemRow = ({
  itemCheckedData,
  validate,
  itemList,
  onChange,
}: ItemRowProps) => {
  return (
    <tbody>
      {validate ? (
        <tr>
          <td>로딩중</td>
        </tr>
      ) : itemList && itemList.length > 0 ? (
        itemList.map((item) => {
          if (item.id === undefined || item.id === null) return null; // id가 undefined 또는 null인 경우

          return (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  value={item.id}
                  checked={itemCheckedData[item.id] || false} // 각 아이템의 체크 상태
                  onChange={() => {
                    if (item.id !== undefined) {
                      onChange(item.id); // id가 undefined가 아닐 때만 호출
                    }
                  }}
                />
              </td>
              <td>{item.id}</td>
              <td>
                <img src={item.image} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>
                {item.baseQuantity}&nbsp;{item.unit}
              </td>
              <td>{item.price}</td>
              <td>{item.orderAvailableData}</td>
              <td>{item.company}</td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={8}>데이터가 없습니다.</td>
        </tr>
      )}
    </tbody>
  );
};

export default ItemRow;
