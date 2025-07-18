import { Drawer } from "@mui/material";
import { useJobFilterStore } from "../../store/Appstore";
import JobFilter from "./jobs/JobFilter";

const jobs = [
  "full Time",
  "part Time",
  "intership",
  "volunteer",
  "freelancer",
  "work from home",
];

export default function JobFilterDrawer() {
  const showJobFilterDrawer = useJobFilterStore(
    (state) => state.showJobFilterDrawer,
  );
  const setShowJobFilterDrawer = useJobFilterStore(
    (state) => state.setShowJobFilterDrawer,
  );

  return (
    <Drawer
      open={showJobFilterDrawer}
      onClose={() => setShowJobFilterDrawer(false)}
    >
      <JobFilter filterType={"Job"} filterTypeArray={jobs} />
    </Drawer>
  );
}
