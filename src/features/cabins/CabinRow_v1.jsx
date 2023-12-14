import styled from "styled-components";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "../../hooks/hooksCabin/useDeleteCabin";
import useCreateCabin from "../../hooks/hooksCabin/useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { id, name, image, maxCapacity, discount, regular_price, description } =
    cabin;
  const { isLoading, mutate } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      discount,
      regular_price,
      image,
      description,
    });
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table.Row role="row">
          <Img src={image} />
          <Cabin>{name}</Cabin>
          <div>Fits up to {maxCapacity} guests </div>

          <Price>{formatCurrency(regular_price)}</Price>
          {discount !== 0 ? (
            <Discount>{discount}%</Discount>
          ) : (
            <span>&mdash;</span>
          )}
          <div>
            <button onClick={handleDuplicate} disabled={isCreating}>
              <HiSquare2Stack />
            </button>

            <Modal>
              <Modal.Open opens="edit">
                <button>
                  <HiPencil />
                </button>
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Open opens="delete">
                <button disabled={isLoading}>
                  <HiTrash />
                </button>
              </Modal.Open>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={name}
                  onConfirm={() => mutate(id)}
                  disabled={isLoading}
                />
              </Modal.Window>
            </Modal>
          </div>
        </Table.Row>
      )}
    </>
  );
}
