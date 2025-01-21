import { OrderList } from "../orderData";

interface OrderRowProps {
  orderData: OrderList[]; // props 타입 정의
}

const OrderRow = ({ orderData }: OrderRowProps) => {
  return (
    <tbody>
      {orderData && orderData.length > 0 ? (
        orderData.map((item) => (
          <tr key={item.id}>
            <td>
              <input type="checkbox" /> {/* 체크박스 추가 */}
            </td>
            <td>{item.title}</td>
            <td>{item.quantity}</td>
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
