import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, type ChangeEvent } from "react";
import SearchBox from "../../../components/user/SearchBox";
import CompanyCard from "../../../components/employer/CompanyCard";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoader from "../../../components/FullScreenLoader";
import {
  getCompanies,
  type EmployerApiResponse,
} from "../../../helper/companyPageApi";
import {
  useCompanyPaginateStore,
  useCompanyStore,
  useSearchByCompanyName,
} from "../../../store/CompanyStore";

const Companies = () => {
  const page = useCompanyPaginateStore((state) => state.page);
  const setPage = useCompanyPaginateStore((state) => state.setPage);

  const searchCompanyName = useSearchByCompanyName(
    (state) => state.searchCompanyName,
  );

  // getting companies data
  const {
    data: companies,
    isPending: isCompaniesPending,
    isError,
  } = useQuery<EmployerApiResponse>({
    queryKey: ["companies", page, searchCompanyName],
    queryFn: () => getCompanies(page, searchCompanyName),
  });

  // store data to parent state
  const companiesData = useCompanyStore((state) => state.companiesData);
  const setCompaniesData = useCompanyStore((state) => state.setCompaniesData);

  useEffect(() => {
    if (!isCompaniesPending && !isError) {
      setCompaniesData(companies.data);
    }
  }, [isCompaniesPending, isError, companies, setCompaniesData]);

  // to handle paginated pages
  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isCompaniesPending) {
    return <FullScreenLoader open={true} message={"loading"} />;
  }

  return (
    <Box
      sx={{
        my: 3,
        p: { xs: 0, sm: 2, md: 2, lg: 4 },
        width: { xs: "100", sm: "100%", md: "95%" },
        mx: "auto",
      }}
    >
      {/* search input && filter button*/}
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          alignItems: "center",
          width: "95%",
          mx: "auto",
        }}
      >
        <SearchBox searchType={"Company"} />
      </Box>

      {/* companies and filter */}
      <Box
        sx={{
          textAlign: "center",
          my: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "start" },
          width: "100%",
          gap: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* companies section header */}
          <Box
            sx={{
              width: { xs: "82%", sm: "90%", md: "90%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              gap: 5,
            }}
          >
            <Typography variant="caption" sx={{ color: "primary.light" }}>
              {companies &&
                companiesData.filter((company) => company.company_name != null)
                  .length}
              + companies are found
            </Typography>
          </Box>
          {/* companies */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: { xs: "100%", sm: "92%", md: "100%" },
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                },
                gap: { xs: 2, md: 4 },
                flexWrap: "wrap",
              }}
            >
              {companiesData?.map((company) => {
                if (company.company_name) {
                  return <CompanyCard company={company} key={company.id} />;
                }
              })}
            </Box>
            {/* pagination */}
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 10 }}
            >
              <Stack>
                <Pagination
                  count={companies?.meta.last_page}
                  page={companies?.meta.current_page}
                  onChange={handlePageChange}
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#5f6caf",
                      borderColor: "#5f6caf",
                    },
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Companies;
