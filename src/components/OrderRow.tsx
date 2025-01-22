import { useEffect, useState } from "react";
import { OrderList } from "../orderData";

interface OrderRowProps {
  orderData: OrderList[]; // props 타입 정의
}

const OrderRow = ({ orderData }: OrderRowProps) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [increaseValue, setIncreaseValue] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    const initialQuantities: { [key: number]: number } = {};
    orderData.forEach((order) => {
      if (order.id) {
        initialQuantities[order.id] = order.baseQuantity; // 각 아이템의 baseQuantity 초기화
      }
    });
    setQuantities(initialQuantities);
  }, [orderData]);

  //증가값은 처음 로딩했을 때만 설정함
  useEffect(() => {
    const initialIncreaseValue: { [key: number]: number } = {};
    orderData.forEach((order) => {
      if (order.id) {
        initialIncreaseValue[order.id] = order.baseQuantity; // 각 아이템의 baseQuantity 초기화
      }
    });
    setIncreaseValue(initialIncreaseValue);
  }, []);

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value, // 특정 아이템의 수량 업데이트
    }));
  };
  return (
    <tbody>
      {orderData && orderData.length > 0 ? (
        orderData.map((item) => (
          <tr key={item.id}>
            <td>
              <input type="checkbox" /> {/* 체크박스 추가 */}
            </td>
            <td>{item.title}</td>
            <td id="amount">
              {item.id !== undefined ? (
                <input
                  type="number"
                  // ref={numberValue}
                  value={quantities[item.id] || 0} // 해당 아이템의 수량 표시
                  min={increaseValue[item.id]}
                  max="100"
                  step={increaseValue[item.id]}
                  onChange={(e) => {
                    if (item.id !== undefined) {
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10)
                      );
                    }
                  }}
                />
              ) : (
                <input
                  type="number"
                  // ref={numberValue}
                  value="0"
                  min="0"
                  max="100"
                  step={1}
                  onChange={(e) =>
                    handleQuantityChange(0, parseInt(e.target.value, 10))
                  }
                />
              )}
            </td>
            <td>{item.unit}</td>
            <td>{item.price}</td>
            <td>{item.company}</td>
            <td>
              <button>확정</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7}>발주 데이터가 없습니다.</td>
        </tr>
      )}
    </tbody>
  );
};

export default OrderRow;
