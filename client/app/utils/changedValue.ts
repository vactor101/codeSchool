export const getChangedFields = (initialValues: any, values: any) => {
  const changedFields: any = {};

  const compareValues = (initial: any, current: any) => {
    // اذا كان القيمة boolean
    if (typeof initial === "boolean" && typeof current === "boolean") {
      const res = initial !== current ? current : null;
      // التعامل مع boolean
      return res;
    } else if (current instanceof File || initial instanceof File) {
      // إذا كانت القيمة ملف (File)
      return current !== initial ? current : null;
    } else if (
      typeof current === "object" &&
      current !== null &&
      !Array.isArray(current)
    ) {
      // إذا كانت القيمة object
      if (initial !== null && typeof initial === "object") {
        // تحقق من أن initial ليس null وهو كائن
        const nestedChanges: any = {};
        Object.keys(current).forEach((key) => {
          if (initial[key] !== current[key]) {
            nestedChanges[key] = current[key];
          }
        });
        return Object.keys(nestedChanges).length > 0 ? nestedChanges : null;
      }
      // إذا كانت initial null أو ليست كائن، نقوم بإرجاع current كقيمة جديدة
      return current;
    } else if (Array.isArray(current)) {
      // إذا تغير طول المصفوفة
      if (initial.length !== current.length) {
        return current;
      }

      const arrayChanges: any = [];
      // مقارنة العناصر داخل المصفوفات
      current.forEach((item: any, index: number) => {
        if (JSON.stringify(initial[index]) !== JSON.stringify(item)) {
          arrayChanges[index] = item;
        }
      });

      return arrayChanges.length > 0 ? arrayChanges : null;
    } else if (typeof current === "string" || typeof initial === "string") {
      // إذا كانت القيمة string
      return initial !== current ? current : null;
    } else if (typeof current === "number" || typeof initial === "number") {
      // إذا كانت القيمة number
      return initial !== current ? current : null;
    }
    return null;
  };

  Object.entries(values).forEach(([key, value]) => {
    const changes = compareValues(initialValues[key], value);
    if (changes !== null && changes !== undefined) {
      changedFields[key] = changes;
    }
  });

  return changedFields;
};
