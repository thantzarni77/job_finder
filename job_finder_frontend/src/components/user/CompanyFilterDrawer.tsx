import { Drawer } from "@mui/material";
import { useCompanyFilterStore } from "../../store/Appstore";
import JobFilter from "./jobs/JobFilter";

const companyType = [
  "public",
  "private",
  "government",
  "non-profit",
  "startup",
];

export default function CompanyFilterDrawer() {
  const showCompanyFilterDrawer = useCompanyFilterStore(
    (state) => state.showCompanyFilterDrawer,
  );
  const setShowCompanyFilterDrawer = useCompanyFilterStore(
    (state) => state.setShowCompanyFilterDrawer,
  );

  return (
    <Drawer
      open={showCompanyFilterDrawer}
      onClose={() => setShowCompanyFilterDrawer(false)}
    >
      <JobFilter filterType={"Companies"} filterTypeArray={companyType} />
    </Drawer>
  );
}
