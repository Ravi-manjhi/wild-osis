import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";

export default function Stats({ bookings, stays, numDays, cabinsCounts }) {
  const numBooking = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = stays.length;

  const occupancy =
    stays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCounts);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkIns}
      />
      <Stat
        title="Occupancy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}
