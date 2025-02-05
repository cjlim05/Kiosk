import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StoreDetail = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/stores/${storeId}`)
      .then((response) => response.json())
      .then((data) => setStore(data))
      .catch((error) => console.error("Error fetching store data:", error));
  }, [storeId]);

  if (!store) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>{store.storeName}</h1>
      <p>주소: {store.detialAddress}</p>
      <p>설명: {store.category}</p>
    </div>
  );
};

export default StoreDetail;
