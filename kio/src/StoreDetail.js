import { useParams } from 'react-router-dom';

const StoreDetail = () => {
  const { storeId } = useParams(); // URL에서 storeId를 가져옴

  // 여기서 storeId를 사용하여 상점의 상세 정보를 가져오는 로직을 구현
  // 예: API 호출 또는 stores 배열에서 해당 상점 정보를 찾는 로직

  return (
    <div>
      <h1>상점 상세 페이지</h1>
      <p>상점 ID: {storeId}</p>
      {/* 상점의 상세 정보를 여기에 표시 */}
    </div>
  );
};

export default StoreDetail;