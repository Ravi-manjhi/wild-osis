import styled from "styled-components";
import { useEffect, useState } from "react";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../../hooks/booking/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "../../hooks/booking/useCheckIn";
import useSetting from "../../hooks/setting/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { data: booking = {}, isLoading } = useBooking();
  const { checkIn, isCheckingLoading } = useCheckIn();
  const { settings, isLoading: isLoadingSetting } = useSetting();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  useEffect(() => {
    setConfirmedPaid(booking?.isPaid ?? false);
  }, [booking]);

  function handleCheckIn() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  if (isLoading || isLoadingSetting) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            disabled={isLoadingSetting}
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((val) => !val);
              setConfirmedPaid(false);
            }}
            id="breakfast"
          >
            Want to Add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmedPaid((val) => !val)}
          id={bookingId}
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid total amount of{" "}
          {formatCurrency(totalPrice + optionalBreakfastPrice)} (
          {formatCurrency(totalPrice)} +{" "}
          {formatCurrency(optionalBreakfastPrice)})
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckIn}
          disabled={!confirmPaid || isCheckingLoading}
        >
          Check in booking #{bookingId}
        </Button>
        <Button
          variation="secondary"
          onClick={moveBack}
          disabled={!confirmPaid || isCheckingLoading}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
