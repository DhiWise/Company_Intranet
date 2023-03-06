import { Input } from "components";
export default {
  title: "company_intranet/Input",
  component: Input,
};

export const SampleInput = (args) => <Input {...args} />;
SampleInput.args = {
  type: "text",
  shape: "RoundedBorder8",
  variant: "FillBluegray50",
  size: "lg",
  wrapClassName: "w-[300px]",
  className: "w-full",
  placeholder: "placeholder",
};
