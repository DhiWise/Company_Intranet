import { SelectBox } from "components";
export default {
  title: "company_intranet/SelectBox",
  component: SelectBox,
  argTypes: {
    options: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
};

export const SampleSelectbox = (args) => <SelectBox {...args} />;

SampleSelectbox.args = {
  placeholder: "Select",
  shape: "RoundedBorder8",
  variant: "FillBluegray50",
  size: "md",
  className: "w-[300px]",
};
