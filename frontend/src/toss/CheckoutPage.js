import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const selector = "#payment-widget";
const clientKey = process.env.REACT_APP_TOSS_CK;
const customerKey = process.env.REACT_APP_TOSS_SK;

export function CheckoutPage({ cartItems, totalPrice }) {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(totalPrice);

  useEffect(() => {
    (async () => {
      console.log("Client Key:", clientKey);
      console.log("Customer Key:", customerKey);
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: totalPrice },
        { variantKey: "DEFAULT" }
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <div>
      <h1>주문서</h1>
      <span>{`${price.toLocaleString()}원`}</span>
      <p>(현제 test모드로 네이버페이를 지원하지 않음)</p>
      <div id="payment-widget" />

      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            // ## Q. 결제 요청 후 계속 로딩 중인 화면이 보인다면?
            // 아직 결제 요청 중이에요. 이어서 요청 결과를 확인한 뒤, 결제 승인 API 호출까지 해야 결제가 완료돼요.
            // 코드샌드박스 환경에선 요청 결과 페이지(`successUrl`, `failUrl`)로 이동할 수가 없으니 유의하세요.
            await paymentWidget?.requestPayment({
              orderId: nanoid(),
              orderName: "QR코드 키오스크",
              customerName: "GUEST",
              customerEmail: "NULL",
              successUrl: `${window.location.origin}/success`,
              failUrl: `${window.location.origin}/fail`,
            });
          } catch (error) {
            // handle error
          }
        }}
      >
        결제하기
      </button>
    </div>
  );
}
