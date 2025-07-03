export const transformToOptions = (
  array: any[],
  valueKey = "name",
  labelKey = "name"
) => {
  return array
    .map((item) => {
      let value, label;

      if (typeof item === "object") {
        value = valueKey.split(".").reduce((acc, key) => acc && acc[key], item);
        label = labelKey.split(".").reduce((acc, key) => acc && acc[key], item);
      } else {
        value = item;
        label = item;
      }

      if (value && label) {
        return {
          value: value.toString(),
          label: label.charAt(0) + label.slice(1),
        };
      }

      return null;
    })
    .filter((item) => item !== null);
};
