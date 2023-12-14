import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import toast from "react-hot-toast";
import useCabin from "../../hooks/hooksCabin/useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const [searchParam] = useSearchParams();
  const { cabins, isLoading, error } = useCabin();
  if (error) toast.error(error.message);
  if (isLoading) return <Spinner />;

  // filter
  let filterCabins;
  const filterValue = searchParam.get("discount") || "all";

  if (filterValue === "all") filterCabins = cabins;
  else if (filterValue === "no-discount")
    filterCabins = cabins.filter((el) => el.discount === 0);
  else if (filterValue === "with-discount") {
    filterCabins = cabins.filter((el) => el.discount > 0);
  }

  // sortBy
  const sortedValue = searchParam.get("sortBy") || "startDate-asc";
  const [field, direction] = sortedValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabin = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
