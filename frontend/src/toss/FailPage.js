import { Link, useSearchParams } from "react-router-dom";

export function FailPage() {
  const [searchParams] = useSearchParams();

  return (
    <div>
      <h1>결제 실패</h1>
      <div>{`사유: ${searchParams.get("message")}`}</div>
      <Link to="/">홈으로</Link>
      <Link to="/cart">장바구니</Link>
    </div>
  );
}