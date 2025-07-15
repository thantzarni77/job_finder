import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BG_IMG from "../assets/login_signup_bg.jpg";

import { useState } from "react";

import FormWrapper from "./user/register/FormWrapper";
import UserDetailsForm from "./user/register/UserDetailsForm";
import PasswordInputFields from "./user/register/PasswordInputFields";
import SeekerDetailsFrom from "./user/register/SeekerDetailsForm";
import CompanyInfoForm from "./user/register/CompanyInfoForm";
import ContactToAdminForm from "./user/register/ContactToAdminForm";
// import { useBasicDetailStore } from "../store/RegisterInfoStore";
import { FormProvider, useForm } from "react-hook-form";

const STEP_LABELS = {
  USER_DETAILS: "Enter your details",
  CHOOSE_USER_TYPE: "Are you a seeker or employer?",
  SEEKER_PROFILE_AND_PASS: "Profile & Password",
  CHOOSE_EMPLOYER_TYPE: "Are you an individual or a company?",
  COMPANY_INFO_AND_PASS: "Info & Password", // Renamed and combined
  ADMIN_CONTACT: "Contact administrator",
  CREATE_PASSWORD: "Create your password",
};

type ChoiceButtonsProps = {
  onSelectPrimary: () => void;
  onSelectSecondary: () => void;
  primaryText: string;
  secondaryText: string;
};

type UserType = "seeker" | "employer" | "";
type EmployerType = "individual" | "company" | "";

export default function Register() {
  // const name = useBasicDetailStore((state) => state.name);
  // const email = useBasicDetailStore((state) => state.email);
  // const phoneNum = useBasicDetailStore((state) => state.phoneNum);

  // console.log(`Name : ${name}`);
  // console.log(`Email : ${email}`);
  // console.log(`Phone No : ${phoneNum}`);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    STEP_LABELS.USER_DETAILS,
    STEP_LABELS.CHOOSE_USER_TYPE,
  ]);

  const [userType, setUserType] = useState<UserType>("");
  const [employerType, setEmployerType] = useState<EmployerType>("");
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({ mode: "onBlur" });
  const { handleSubmit, trigger, watch } = methods;

  //for optional filed
  const phoneValue = watch("phone");

  //on final submit
  const onFinalSubmit = (data) => {
    console.log(data);

    // setActiveStep((prev) => prev + 1);
  };

  const handleNext = async () => {
    //check which fields to validate
    const fieldsToValidate = {
      [STEP_LABELS.USER_DETAILS]: phoneValue
        ? ["name", "email", "phone"]
        : ["name", "email"],
      [STEP_LABELS.SEEKER_PROFILE_AND_PASS]: [
        "skill",
        "education",
        "workExp",
        "role",
        "bio",
        "talent",
        "socialLink",
        "password",
      ],
    };

    //for example, on activeStep 1, we validate ['name' and 'email']
    const currentStepFields = fieldsToValidate[steps[activeStep]];
    // manually trigger validation for only the fields in the current step
    const isValid = currentStepFields ? await trigger(currentStepFields) : true;

    //let go to next step only if validation pass
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    const currentStepLabel = steps[activeStep];
    if (
      [
        STEP_LABELS.SEEKER_PROFILE_AND_PASS,
        STEP_LABELS.CHOOSE_EMPLOYER_TYPE,
      ].includes(currentStepLabel)
    ) {
      setSteps([STEP_LABELS.USER_DETAILS, STEP_LABELS.CHOOSE_USER_TYPE]);
      setUserType("");
    } else if (
      [STEP_LABELS.COMPANY_INFO_AND_PASS, STEP_LABELS.ADMIN_CONTACT].includes(
        currentStepLabel,
      )
    ) {
      setSteps([
        STEP_LABELS.USER_DETAILS,
        STEP_LABELS.CHOOSE_USER_TYPE,
        STEP_LABELS.CHOOSE_EMPLOYER_TYPE,
      ]);
      setEmployerType("");
    } else if (currentStepLabel === STEP_LABELS.CREATE_PASSWORD) {
      const newSteps = [...steps];
      newSteps.pop();
      setSteps(newSteps);
    }
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSteps([STEP_LABELS.USER_DETAILS, STEP_LABELS.CHOOSE_USER_TYPE]);
    setUserType("");
    setEmployerType("");
  };

  const handleSelectSeeker = () => {
    setUserType("seeker");
    setSteps([
      STEP_LABELS.USER_DETAILS,
      STEP_LABELS.CHOOSE_USER_TYPE,
      STEP_LABELS.SEEKER_PROFILE_AND_PASS,
    ]);
    handleNext();
  };

  const handleSelectEmployer = () => {
    setUserType("employer");
    setSteps([
      STEP_LABELS.USER_DETAILS,
      STEP_LABELS.CHOOSE_USER_TYPE,
      STEP_LABELS.CHOOSE_EMPLOYER_TYPE,
    ]);
    handleNext();
  };

  const handleSelectIndividual = () => {
    setEmployerType("individual");
    // individual still needs a separate password step
    setSteps((prevSteps) => [
      ...prevSteps,
      STEP_LABELS.ADMIN_CONTACT,
      STEP_LABELS.CREATE_PASSWORD,
    ]);
    handleNext();
  };

  const handleSelectCompany = () => {
    setEmployerType("company");
    setSteps((prevSteps) => [...prevSteps, STEP_LABELS.COMPANY_INFO_AND_PASS]);
    handleNext();
  };

  const ChoiceButtons = ({
    onSelectPrimary,
    onSelectSecondary,
    primaryText,
    secondaryText,
  }: ChoiceButtonsProps) => (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        gap: 2,
        width: "100%",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Button
        variant="contained"
        onClick={onSelectPrimary}
        sx={{
          flexGrow: 1,
          borderRadius: 2,
          textTransform: "none",
          boxShadow: "none",
          ":hover": {
            boxShadow: "none",
          },
        }}
      >
        {primaryText}
      </Button>
      <Button
        variant="contained"
        onClick={onSelectSecondary}
        sx={{
          flexGrow: 1,
          borderRadius: 2,
          boxShadow: "none",
          textTransform: "none",
          ":hover": {
            boxShadow: "none",
          },
        }}
      >
        {secondaryText}
      </Button>
    </Box>
  );

  //render step content function
  const getStepContent = (stepIndex: number) => {
    const currentStepLabel = steps[stepIndex];

    switch (currentStepLabel) {
      case STEP_LABELS.USER_DETAILS:
        return <UserDetailsForm />;

      case STEP_LABELS.CHOOSE_USER_TYPE:
        return (
          <ChoiceButtons
            onSelectPrimary={handleSelectSeeker}
            onSelectSecondary={handleSelectEmployer}
            primaryText="I'm a Seeker"
            secondaryText="I'm an Employer"
          />
        );

      case STEP_LABELS.SEEKER_PROFILE_AND_PASS:
        return (
          <SeekerDetailsFrom>
            <PasswordInputFields
              showPassword={showPassword}
              onToggleVisibility={() => setShowPassword(!showPassword)}
            />
          </SeekerDetailsFrom>
        );

      case STEP_LABELS.CHOOSE_EMPLOYER_TYPE:
        return (
          <ChoiceButtons
            onSelectPrimary={handleSelectIndividual}
            onSelectSecondary={handleSelectCompany}
            primaryText="Individual"
            secondaryText="Company"
          />
        );

      case STEP_LABELS.COMPANY_INFO_AND_PASS:
        return (
          <CompanyInfoForm>
            <PasswordInputFields
              showPassword={showPassword}
              onToggleVisibility={() => setShowPassword(!showPassword)}
            />
          </CompanyInfoForm>
        );

      case STEP_LABELS.ADMIN_CONTACT:
        return <ContactToAdminForm />;

      case STEP_LABELS.CREATE_PASSWORD:
        return (
          <FormWrapper>
            <PasswordInputFields
              showPassword={showPassword}
              onToggleVisibility={() => setShowPassword(!showPassword)}
            />
          </FormWrapper>
        );

      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${BG_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: "25px", md: "28px" },
        }}
      >
        LOGO
      </Typography>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
      >
        Register an account here
      </Typography>

      <FormProvider {...methods}>
        {/* stepper and contents  */}
        <Box
          component="form"
          onSubmit={handleSubmit(onFinalSubmit)}
          sx={{
            width: { xs: "100%", sm: "90%", md: "700px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
            p: 2,
            borderRadius: "12px",
          }}
        >
          <Stepper
            activeStep={activeStep}
            orientation={isMobile ? "vertical" : "horizontal"}
            alternativeLabel={!isMobile}
            sx={{ width: "100%", pl: isMobile ? 2 : 0 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished!
              </Typography>
              <Button onClick={handleReset}>Start Over</Button>
            </Box>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  mt: 2,
                  width: "100%",
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    borderRadius: 2,
                    boxShadow: "none",
                    textTransform: "none",
                    ":hover": {
                      boxShadow: "none",
                    },
                  }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {![
                  STEP_LABELS.CHOOSE_USER_TYPE,
                  STEP_LABELS.CHOOSE_EMPLOYER_TYPE,
                ].includes(steps[activeStep]) && (
                  <Button
                    variant="contained"
                    // If it's the last step, make it a submit button
                    type={activeStep === steps.length - 1 ? "submit" : "button"}
                    // Otherwise, trigger per-step validation
                    onClick={
                      activeStep === steps.length - 1 ? undefined : handleNext
                    }
                    sx={{
                      borderRadius: 2,
                      boxShadow: "none",
                      textTransform: "none",
                      ":hover": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                  // <Button
                  //   variant="contained"
                  //   onClick={handleNext}

                  // >
                  //   {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  // </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </FormProvider>
    </Box>
  );
}
