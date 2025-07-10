import { Drawer } from "@mui/material";
import { useFilterStore } from "../../store/Appstore";
import JobFilter from "./jobs/JobFilter";

const jobs = [
  "full Time",
  "part Time",
  "intership",
  "volunteer",
  "freelancer",
  "work from home",
];

export default function FilterDrawer() {
  const showFilterDrawer = useFilterStore((state) => state.showFilterDrawer);
  const setShowFilterDrawer = useFilterStore(
    (state) => state.setShowFilterDrawer,
  );

  return (
    <Drawer open={showFilterDrawer} onClose={() => setShowFilterDrawer(false)}>
      <JobFilter filterType={"Job"} filterTypeArray={jobs} />
    </Drawer>
  );
}
