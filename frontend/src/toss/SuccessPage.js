import { Link, useSearchParams } from "react-router-dom";

export function SuccessPage() {
  const [searchParams] = useSearchParams();

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`승인번호: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>
      <Link to="/receipt">영수증 출력하기</Link>
      <Link to="/">홈으로</Link>
    </div>
  );
}
