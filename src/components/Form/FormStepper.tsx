"use client";

import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const steps = [1, 2, 3, 4, 5, 6];

interface FormStepperProps {
  activeStep: number;
  handleNext: () => void;
  handlePrevious: () => void;
  handleStep: (step: number) => void;
  completedSteps: number[];
  children: ReactNode;
}

const FormStepper = ({
  activeStep,
  handleNext,
  handlePrevious,
  handleStep,
  completedSteps,
  children,
}: FormStepperProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        "& .css-vnkopk-MuiStepLabel-iconContainer": {
          padding: 0,
        },
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step} completed={completedSteps.includes(step)}>
            <StepLabel
              StepIconComponent={() => (
                <div
                  className="flex justify-center items-center size-[18px] md:size-6 lg:size-9  text-[12px] md:text-[14px] lg:text-[18px] rounded-full"
                  onClick={() => handleStep(index)}
                  style={{
                    background:
                      activeStep >= index
                        ? "linear-gradient(180deg, #006778 0%, #00BFDE 100%)"
                        : "linear-gradient(180deg, rgba(0, 103, 120, 0.20) 0%, rgba(0, 191, 222, 0.20) 100%)",
                    color: activeStep >= index ? "#fff" : "rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {step}
                </div>
              )}
            />
          </Step>
        ))}
      </Stepper>
      {children}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
        }}
      >
        <Button
          onClick={handlePrevious}
          disabled={activeStep === 0}
          sx={{
            fontFamily: "Lato",
            color: "#262D33",
            "&:hover": {
              color: "#00BFDE",
            },
          }}
        >
          Previous
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          sx={{
            fontFamily: "Lato",
            color: "#006778",
            "&:hover": {
              color: "#00BFDE",
            },
          }}
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default FormStepper;
