import { Drawer } from "@mui/material";
import { useTalentFilterStore } from "../../store/Appstore";
import JobFilter from "./jobs/JobFilter";

const jobs = [
  "full Time",
  "part Time",
  "intership",
  "volunteer",
  "freelancer",
  "work from home",
];

export default function TalentFilterDrawer() {
  const showTalentFilterDrawer = useTalentFilterStore(
    (state) => state.showTalentFilterDrawer,
  );
  const setShowTalentFilterDrawer = useTalentFilterStore(
    (state) => state.setShowTalentFilterDrawer,
  );

  return (
    <Drawer
      open={showTalentFilterDrawer}
      onClose={() => setShowTalentFilterDrawer(false)}
    >
      <JobFilter filterType={"Job"} filterTypeArray={jobs} />
    </Drawer>
  );
}
