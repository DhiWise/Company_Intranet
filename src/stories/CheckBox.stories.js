import { CheckBox } from "components";
export default {
  title: "company_intranet/CheckBox",
  component: CheckBox,
};

export const SampleCheckbox = (args) => <CheckBox {...args} />;

SampleCheckbox.args = {
  label: "Checkbox",
  shape: "RoundedBorder2",
  variant: "OutlineBluegray101",
  size: "md",
  inputClassName: "mr-1",
};
