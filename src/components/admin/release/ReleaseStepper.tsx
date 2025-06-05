import { Step, StepLabel, Stepper } from "@mui/material";
type GroupStepperProps = {
  step: number;
};
const GroupStepper: React.FC<GroupStepperProps> = ({ step }) => {
  return (
    <Stepper activeStep={step} alternativeLabel sx={{ mt: 4, mb: 2 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const steps = ["Choose", "Confirm", "Information"];

export default GroupStepper;
