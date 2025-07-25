import { Drawer } from "@mui/material";
import { useJobFilterStore } from "../../store/Appstore";
import JobFilter from "./jobs/JobFilter";

type JobTypes = {
  id: number;
  name: string;
};

type RoleType = {
  id: number;
  name: string;
};

export default function JobFilterDrawer({
  jobTypes,
  roles,
}: {
  jobTypes: JobTypes[];
  roles: RoleType[];
}) {
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
      <JobFilter filterType={"Job"} jobTypes={jobTypes} roles={roles} />
    </Drawer>
  );
}
