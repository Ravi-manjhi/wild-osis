import styled from "styled-components";
import useRecentBooking from "../../hooks/booking/useRecentBooking";
import Spinner from "../../ui/Spinner";
import useRecentStayBooking from "../../hooks/booking/useStayBookings";
import Stats from "./stats";
import useCabin from "../../hooks/hooksCabin/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading: isBooking } = useRecentBooking();
  const { stays, isLoading: isStaying, numDays } = useRecentStayBooking();
  const { cabins, isLoading } = useCabin();

  if (isBooking || isStaying || isLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        stays={stays}
        numDays={numDays}
        cabinsCounts={cabins.length}
      />
      <TodayActivity />
      <DurationChart stays={stays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
