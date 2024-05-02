import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductSkeleton: React.FC = () => {
  return (
    <div style={{ width: "100%", margin: 10 }}>
      <div style={{ marginBottom: 10 }}>
        <Skeleton width={"100%"} height={138} />
      </div>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Skeleton width={100} height={20} />
        <Skeleton width={50} height={20} />
      </div>

      <div style={{ marginTop: 10 }}>
        <Skeleton count={2} />
      </div>
    </div>
  );
};

export default ProductSkeleton;
