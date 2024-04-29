import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./FailPage.css";

export function FailPage() {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get("message");

  // 에러 메시지 유무에 따라 알림창 띄우기 및 이동
  if (!errorMessage) {
    alert("잘못된 경로입니다!");
    window.location.href = "/"; // 홈 화면으로 이동
    return null; // 컴포넌트 렌더링 중지
  }

  return (
    <div className="fail-page">
      <div className="content">
        <div className="icon-container">
          <i className="fas fa-times-circle"></i>
        </div>
        <h1>결제에 실패하였습니다.</h1>
        <div className="details">
          <p>
            <strong>사유:</strong> {errorMessage}
          </p>
        </div>
        <div className="buttons">
          <Link to="/" className="btn btn-home">
            <i className="fas fa-home"></i> 홈으로
          </Link>
          <Link to="/cart" className="btn btn-cart">
            <i className="fas fa-shopping-cart"></i> 장바구니
          </Link>
        </div>
      </div>
    </div>
  );
}
