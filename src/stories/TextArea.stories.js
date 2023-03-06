import { TextArea } from "components";
export default {
  title: "company_intranet/TextArea",
  component: TextArea,
};

export const SampleTextarea = (args) => <TextArea {...args} />;

SampleTextarea.args = {
  shape: "RoundedBorder8",
  variant: "FillBluegray50",
  size: "sm",
  placeholder: "placeholder",
};
