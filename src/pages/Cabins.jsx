import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/addCabin/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">All Cabins</Heading>
        <CabinTableOperation />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
