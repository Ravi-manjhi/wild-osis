import useCheckout from "../../hooks/booking/useCheckout";
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      variation="danger"
      disabled={isCheckingOut}
      size="small"
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
