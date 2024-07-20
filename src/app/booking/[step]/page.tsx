"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FormStepper from "@/components/Form/FormStepper";
import Step1 from "@/components/Form/step_1";
import Step2 from "@/components/Form/step_2";
import Step3 from "@/components/Form/step_3";
import Step4 from "@/components/Form/step_4";
import Step5 from "@/components/Form/step_5";
import Step6 from "@/components/Form/step_6";

const stepsComponents = [Step1, Step2, Step3, Step4, Step5, Step6];

interface BookingStepProps {
  params: {
    step: string | undefined;
  };
}

const BookingStep = ({ params }: BookingStepProps) => {
  const router = useRouter();
  const step = params.step || "1";
  const stepNumber = parseInt(step.replace("step_", ""), 10) - 1;
  const [activeStep, setActiveStep] = useState(stepNumber);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    setActiveStep(stepNumber);
  }, [stepNumber]);

  
  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    setCompletedSteps([...completedSteps, activeStep]);
    router.push(`/booking/${nextStep + 1}`);
  };

    const handlePrevious = () => {
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
      setCompletedSteps(completedSteps.filter((step) => step !== activeStep));
      router.push(`/booking/${prevStep + 1}`);
    };

    const handleStep = (step: number) => {
      // if (step === 3 || step === 4) { // Перевірте, чи це потрібні степи
      //   const form = formRefs.current[activeStep];
      //   if (form) {
      //     form.trigger().then(isValid => {
      //       if (isValid) {
              setActiveStep(step);
              router.push(`/booking/step_${step + 1}`);
      //       }
      //     });
      //   }
      // } else {
      //   setActiveStep(step);
      //   router.push(`/booking/${step + 1}`);
      // }

    };

    const StepComponent = stepsComponents[activeStep] || Step1;

    return (
      <div className="p-4 md:p-6 xl:p-9 lg:pt-[90px] xl:pt-[102px]">
        <FormStepper
          activeStep={activeStep}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleStep={handleStep}
          completedSteps={completedSteps}
        >
           <StepComponent />
        </FormStepper>
      </div>
    );
  };

export default BookingStep;
