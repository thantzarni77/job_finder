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
import UserDetailsForm from "./registerComponent/UserDetailsForm";
import PasswordInputFields from "./registerComponent/PasswordInputFields";
import SeekerDetailsFrom from "./registerComponent/SeekerDetailsForm";
import CompanyInfoForm from "./registerComponent/CompanyInfoForm";
import ContactToAdminForm from "./registerComponent/ContactToAdminForm";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerStepOne,
  registerStepTwo,
} from "../helper/registerHelperFunctions";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/UserStore";
import { useRegisterStore } from "../store/RegisterStore";
import { isAxiosError } from "axios";

const STEP_LABELS = {
  YOUR_DETAILS_AND_ROLE: "Your Details & Role",
  SEEKER_PROFILE_AND_PASS: "Seeker Details & Password",
  CHOOSE_EMPLOYER_TYPE: "Choose Employer Type",
  COMPANY_INFO_AND_PASS: "Company Info & Password",
  ADMIN_CONTACT: "Contact Administrator",
  CREATE_PASSWORD: "Create Your Password",
};

type ChoiceButtonsProps = {
  onSelectPrimary: () => void;
  onSelectSecondary: () => void;
  primaryText: string;
  secondaryText: string;
};

type RegisterFormData = {
  // From UserDetailsForm
  name: string;
  email: string;
  userType: "seeker" | "employer";
  phone?: string;
  address?: string;

  // From SeekerDetailsForm.tsx
  skills?: { value: string }[];
  education?: { degree: string; year: string }[];
  work_experience?: { value: string }[];
  role?: "junior" | "mid-level" | "senior";
  bio?: string;
  talent?: string;
  social_media_link?: { value: string }[];
  image: File;
  seekerPassword?: string;

  // From CompanyInfoForm
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyType?: string;
  companyProfile?: File;
  companyDescription?: string;
  companyPassword?: string;

  // From ContactToAdminForm
  title?: string;
  message?: string;

  // From PasswordInputFields
  password?: string;
};

export default function Register() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const setToken = useUserStore((state) => state.setToken);

  //register state logic
  const firstUserID = useRegisterStore((state) => state.firstUserID);
  const setFirstUserID = useRegisterStore((state) => state.setFirstUserID);
  const setRegisterErrors = useRegisterStore(
    (state) => state.setRegisterErrors,
  );

  const registerStepOneMutation = useMutation({
    mutationFn: registerStepOne,
    onSuccess: (data) => {
      setFirstUserID(data.data.id);
      setActiveStep((prev) => prev + 1);
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setRegisterErrors(err.response?.data.data);
      }
    },
  });

  const registerStepTwoMutation = useMutation({
    mutationFn: registerStepTwo,
    onSuccess: (res) => {
      setToken(res.data.token);
      setActiveStep((prev) => prev + 1);
      queryClient.invalidateQueries({ queryKey: ["seekerProfile"] });
      setTimeout(() => {
        navigate("/");
      }, 4000);
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setRegisterErrors(err.response?.data.data);
      }
    },
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const methods = useForm<RegisterFormData>({
    mode: "all",
    defaultValues: {
      skills: [{ value: "" }],
      work_experience: [{ value: "" }],
      education: [{ degree: "", year: "" }],
      social_media_link: [{ value: "" }],
    },
  });

  const { handleSubmit, trigger, getValues, watch } = methods;

  const userType = watch("userType");
  const phoneField = watch("phone");

  const [employerType, setEmployerType] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([STEP_LABELS.YOUR_DETAILS_AND_ROLE]);
  const [showPassword, setShowPassword] = useState(false);

  const onFinalSubmit = (data: RegisterFormData) => {
    //seeker register
    if (userType == "seeker") {
      const {
        skills,
        education,
        work_experience,
        role,
        bio,
        talent,
        social_media_link,
        image,
        seekerPassword,
      } = data;

      const seekerInfo = new FormData();

      // --- CORRECTED ARRAY HANDLING ---

      // Handle skills array
      const skillsValues = skills
        ?.map((single) => single.value)
        .filter(Boolean);
      if (skillsValues && skillsValues.length > 0) {
        skillsValues.forEach((skill) => seekerInfo.append("skills[]", skill));
      }

      // Handle education array of objects
      if (education && education.length > 0) {
        education.forEach((edu, index) => {
          // Only append if both degree and year exist for that entry
          if (edu.degree && edu.year) {
            seekerInfo.append(`education[${index}][degree]`, edu.degree);
            seekerInfo.append(`education[${index}][year]`, edu.year);
          }
        });
      }

      // Handle work experience array
      const workExpValues = work_experience
        ?.map((single) => single.value)
        .filter(Boolean);
      if (workExpValues && workExpValues.length > 0) {
        workExpValues.forEach((exp) =>
          seekerInfo.append("work_experience[]", exp),
        );
      }

      // Handle social media links array
      const socialMediaValues = social_media_link
        ?.map((single) => single.value)
        .filter(Boolean);
      if (socialMediaValues && socialMediaValues.length > 0) {
        socialMediaValues.forEach((link) =>
          seekerInfo.append("social_media_link[]", link),
        );
      }

      // --- Other fields remain the same ---
      if (role) seekerInfo.append("role", role);
      if (bio) seekerInfo.append("bio", bio);
      if (talent) seekerInfo.append("talent", talent);
      if (image) seekerInfo.append("image", image);
      if (seekerPassword) seekerInfo.append("password", seekerPassword);

      // This mutation will now send the data in a server-friendly format
      registerStepTwoMutation.mutate({
        userID: firstUserID,
        userData: seekerInfo,
      });

      // You can use this to debug and see the final FormData structure
      // console.log("Seeker Details Payload:");
      // for (const [key, value] of seekerInfo.entries()) {
      // console.log(seekerInfo.getAll("skills[]"));
    }

    //company register
    if (employerType == "company") {
      console.log(data);

      const {
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
        companyDescription,
        companyType,
        companyProfile,
        companyPassword,
      } = data;

      const companyFormData = new FormData();
      if (companyName) companyFormData.append("company_name", companyName);
      if (companyAddress)
        companyFormData.append("company_address", companyAddress);
      if (companyPhone) companyFormData.append("company_phone", companyPhone);
      if (companyEmail) companyFormData.append("company_email", companyEmail);
      if (companyType) companyFormData.append("company_type", companyType);
      if (companyDescription)
        companyFormData.append("company_description", companyDescription);
      companyFormData.append("verification", "pending");
      if (companyProfile)
        companyFormData.append("company_image", companyProfile);
      if (companyPassword) companyFormData.append("password", companyPassword);

      registerStepTwoMutation.mutate({
        userID: firstUserID,
        userData: companyFormData,
      });
    }
  };

  const handleNext = async () => {
    const currentStepLabel = steps[activeStep];

    const fieldsPerStep: { [key: string]: (keyof RegisterFormData)[] } = {
      [STEP_LABELS.YOUR_DETAILS_AND_ROLE]: phoneField
        ? ["name", "email", "phone", "userType"]
        : ["name", "email", "userType"],
      [STEP_LABELS.SEEKER_PROFILE_AND_PASS]: [
        "skills",
        "education",
        "work_experience",
        "role",
        "bio",
        "talent",
        "social_media_link",
        "seekerPassword",
      ],
      [STEP_LABELS.COMPANY_INFO_AND_PASS]: [
        "companyName",
        "companyAddress",
        "companyPhone",
        "companyEmail",
        "companyType",
        "companyProfile",
        "companyPassword",
      ],
      [STEP_LABELS.ADMIN_CONTACT]: ["title", "message"],
      [STEP_LABELS.CREATE_PASSWORD]: ["password"],
    };

    const fieldsToValidate = fieldsPerStep[currentStepLabel];
    await new Promise((resolve) => setTimeout(resolve, 50));
    const isValid = fieldsToValidate ? await trigger(fieldsToValidate) : true;

    if (!isValid) {
      return;
    }

    //Only define the next steps when advancing from the *first* step.
    if (currentStepLabel === STEP_LABELS.YOUR_DETAILS_AND_ROLE) {
      const { userType } = getValues();
      if (userType === "seeker") {
        setSteps([
          STEP_LABELS.YOUR_DETAILS_AND_ROLE,
          STEP_LABELS.SEEKER_PROFILE_AND_PASS,
        ]);
      } else if (userType === "employer") {
        setSteps([
          STEP_LABELS.YOUR_DETAILS_AND_ROLE,
          STEP_LABELS.CHOOSE_EMPLOYER_TYPE,
        ]);
      }
    }

    //register first setep
    if (currentStepLabel === STEP_LABELS.YOUR_DETAILS_AND_ROLE) {
      const { name, email, phone, address, userType } = getValues();
      const userData = new FormData();
      userData.append("name", name);
      userData.append("email", email);
      if (phone) {
        userData.append("phone", phone);
      }

      if (address) {
        userData.append("address", address);
      }

      userData.append("user_type", userType);
      registerStepOneMutation.mutate(userData);
    } else if (
      employerType == "individual" &&
      currentStepLabel === STEP_LABELS.ADMIN_CONTACT
    ) {
      const { title, message } = getValues();
      console.log("API CALL (Admin Contact): Posting message...", {
        title,
        message,
      });
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  // const handleBack = () => {
  //   setActiveStep((prev) => prev - 1);
  // };

  const handleSelectIndividual = () => {
    setEmployerType("individual");
    setSteps([
      STEP_LABELS.YOUR_DETAILS_AND_ROLE,
      STEP_LABELS.CHOOSE_EMPLOYER_TYPE,
      STEP_LABELS.ADMIN_CONTACT,
      STEP_LABELS.CREATE_PASSWORD,
    ]);
    setActiveStep((prev) => prev + 1);
  };

  const handleSelectCompany = () => {
    setEmployerType("company");
    setSteps([
      STEP_LABELS.YOUR_DETAILS_AND_ROLE,
      STEP_LABELS.CHOOSE_EMPLOYER_TYPE,
      STEP_LABELS.COMPANY_INFO_AND_PASS,
    ]);
    setActiveStep((prev) => prev + 1);
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
          borderRadius: 3,
          boxShadow: "none",
          textTransform: "none",
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
          borderRadius: 3,
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

  //render contents
  const getStepContent = (stepIndex: number) => {
    const currentStepLabel = steps[stepIndex];
    switch (currentStepLabel) {
      case STEP_LABELS.YOUR_DETAILS_AND_ROLE:
        return <UserDetailsForm />;
      case STEP_LABELS.SEEKER_PROFILE_AND_PASS:
        return <SeekerDetailsFrom />;
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
        return <CompanyInfoForm />;
      case STEP_LABELS.ADMIN_CONTACT:
        return <ContactToAdminForm />;
      case STEP_LABELS.CREATE_PASSWORD:
        return (
          <PasswordInputFields
            showPassword={showPassword}
            onToggleVisibility={() => setShowPassword(!showPassword)}
          />
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  const isLastStep = activeStep === steps.length - 1 && steps.length > 1;

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
        px: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        sx={{ fontWeight: 700, fontSize: { xs: "25px", md: "28px" } }}
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
        <Box
          component="form"
          noValidate
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
                Account Registering Process Finished !!
              </Typography>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Redirecting to home page.....
              </Typography>
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
                {/* <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, borderRadius: 2 }}
                >
                  Back
                </Button> */}
                <Box sx={{ flex: "1 1 auto" }} />

                {![STEP_LABELS.CHOOSE_EMPLOYER_TYPE].includes(
                  steps[activeStep],
                ) && (
                  <Button
                    loading={
                      registerStepOneMutation.isPending ||
                      registerStepTwoMutation.isPending
                    }
                    variant="contained"
                    type={isLastStep ? "submit" : "button"}
                    onClick={isLastStep ? undefined : handleNext}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      boxShadow: "none",
                      ":hover": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    {isLastStep ? "Finish" : "Next"}
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </FormProvider>
    </Box>
  );
}
