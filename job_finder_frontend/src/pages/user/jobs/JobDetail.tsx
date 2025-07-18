import { Box, Button, Checkbox, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import JobCard from "../../../components/user/jobs/JobCard";
import CustomAppilicant from "../../../components/custom_svg/CustomAppilicant";
import { useNavigate } from "react-router";
import EmployerCard from "../../../components/employer/EmployerCard";

const JobDetail = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "90%", mx: "auto" }}>
      {/* Job title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 5,
          mb: 4,
        }}
      >
        <ArrowBackIosIcon
          onClick={() => navigate("/jobs")}
          sx={{
            color: "primary.main",
            fontSize: 32,
            ":hover": {
              color: "secondary.main",
              cursor: "pointer",
            },
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, mx: "auto" }}>
          Job Details
        </Typography>
      </Box>
      {/* Job Contents and Employer Card */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "start",
          width: "100%",
        }}
      >
        {/* Jobs and Job Badges */}
        <Box
          sx={{
            mx: "auto",
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          {/* Job*/}
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mb: { xs: 1, md: 3 },
              }}
            >
              {/* jobs title and badge container */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column-reverse", md: "row" },
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    my: { xs: 2, md: 0 },
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Job Title
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 400, color: "secondary.main" }}
                  >
                    Full Stack Developer
                  </Typography>
                </Box>

                {/* Job badge */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "80%" },
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    alignItems: { xs: "start", md: "start", lg: "start" },
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "#ffffff",
                      border: 1,
                      borderColor: "primary.main",
                      borderRadius: "4px",
                      height: "28px",
                      px: "5px",
                      py: "5px",
                    }}
                  >
                    <Checkbox
                      disableRipple
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 22, ml: -1 },
                        color: "primary.main",
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                      icon={<BookmarkBorderOutlinedIcon />}
                      checkedIcon={<BookmarkIcon />}
                      name={"bookMark"}
                    />
                    <Typography variant="caption" sx={{ ml: -1, mr: 1 }}>
                      Bookmark this
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "primary.main",
                      color: "#ffffff",
                      borderRadius: "4px",
                      height: "28px",
                      px: "5px",
                      py: "5px",
                      gap: "5px",
                    }}
                  >
                    <CustomAppilicant />
                    <Typography variant="caption">24 applicants</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "primary.main",
                      color: "#ffffff",
                      borderRadius: "4px",
                      height: "28px",
                      px: "5px",
                      py: "5px",
                      gap: "5px",
                    }}
                  >
                    <QueryBuilderIcon sx={{ fontSize: "20px" }} />
                    <Typography variant="caption">
                      Deadline 21 Jul 2025
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 3,
                mt: { xs: 0, md: -5, lg: 0 },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Position
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 400, color: "secondary.main" }}
              >
                Senior
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 3,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Gender
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 400, color: "secondary.main" }}
              >
                All
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 3,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Salary
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 400, color: "secondary.main" }}
              >
                500000MMK
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 3,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Address
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 400, color: "secondary.main" }}
              >
                No.123, Yadanar St, Marchart Road, Yangon
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 3,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Working Type
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 400, color: "secondary.main" }}
              >
                Full time
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 3,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Working hour
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 400, color: "secondary.main" }}
              >
                9:00 am to 5:00 pm
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 3,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Responsibilities
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                  color: "secondary.main",
                  width: { xs: "100%", md: "70%" },
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Nec quis nec sagittis
                ultrices egestas nunc urna cursus at. Lectus varius a libero
                pulvinar et cursus mi pharetra. Dictum urna tortor amet lectus
                dolor. Tellus at aenean dignissim in commodo dolor leo. Pulvinar
                eget et eu accumsan odio sed. Cum volutpat sit ac rhoncus porta.
                Sagittis morbi malesuada feugiat arcu cras aliquam lacus. Id
                bibendum bibendum diam pretium auctor vitae odio. Ac et cum eget
                risus. Magnis odio facilisi morbi mattis sed faucibus. Feugiat
                nunc ultrices vulputate lectus urna diam nec. Volutpat ipsum
                aliquet ut sit augue id in. In lacus neque sit eget arcu quis ut
                ornare augue. Aliquet non malesuada lobortis euismod duis
                aliquam.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 3,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Requirements
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                  color: "secondary.main",
                  width: { xs: "100%", md: "70%" },
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Nec quis nec sagittis
                ultrices egestas nunc urna cursus at. Lectus varius a libero
                pulvinar et cursus mi pharetra. Dictum urna tortor amet lectus
                dolor. Tellus at aenean dignissim in commodo dolor leo. Pulvinar
                eget et eu accumsan odio sed. Cum volutpat sit ac rhoncus porta.
                Sagittis morbi malesuada feugiat arcu cras aliquam lacus. Id
                bibendum bibendum diam pretium auctor vitae odio. Ac et cum eget
                risus. Magnis odio facilisi morbi mattis sed faucibus. Feugiat
                nunc ultrices vulputate lectus urna diam nec. Volutpat ipsum
                aliquet ut sit augue id in. In lacus neque sit eget arcu quis ut
                ornare augue. Aliquet non malesuada lobortis euismod duis
                aliquam.
              </Typography>
            </Box>

            <Button
              onClick={() => navigate("/job/JC-1111/apply")}
              variant="contained"
              sx={{
                width: { xs: "100%", md: "73%" },
                boxShadow: "none",
                textTransform: "none",
                fontWeight: 400,
                borderRadius: "8px",
                px: 1,
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Apply Now
            </Button>
          </Box>
        </Box>

        {/* employer card */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <EmployerCard />
        </Box>
      </Box>

      {/* similar jobs */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 2,
          my: 5,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mt: 1, mb: 3 }}>
          Similar Jobs
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column", lg: "row" },
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 6,
          }}
        >
          <JobCard />
          <JobCard />
          <JobCard />
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetail;
