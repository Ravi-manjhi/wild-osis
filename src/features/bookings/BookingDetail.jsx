import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import useBooking from "../../hooks/booking/useBooking";
import useCheckout from "../../hooks/booking/useCheckOut";
import useDeleteBooking from "../../hooks/booking/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { data, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteMutate, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  const booking = data;
  const { id, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open opens="delete">
          <Button variation="danger">Delete Booking</Button>
        </Modal.Open>

        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/check-in/${id}`)}>Check In</Button>
        )}

        {status === "checked-in" && (
          <Button
            disabled={isCheckingOut}
            Icon={HiArrowUpOnSquare}
            onClick={() => {
              checkout(id);
            }}
          >
            Check-out
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window name="delete">
        <ConfirmDelete
          disabled={isDeleting}
          onConfirm={() => {
            deleteMutate(id, { onSuccess: () => navigate(-1) });
          }}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
