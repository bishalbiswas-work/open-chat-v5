import React from "react";

const sizeClasses = {
  txtLatoSemiBold15: "font-lato font-semibold",
  txtLatoBold28: "font-bold font-lato",
  txtLatoSemiBold14: "font-lato font-semibold",
  txtDMSansBold14: "font-bold font-dmsans",
  txtLatoSemiBold12: "font-lato font-semibold",
  txtLatoBold14: "font-bold font-lato",
  txtLatoRegular14Gray800: "font-lato font-normal",
  txtDMSansRegular10: "font-dmsans font-normal",
  txtLatoBold24: "font-bold font-lato",
  txtLatoSemiBold16: "font-lato font-semibold",
  txtPoppinsSemiBold24: "font-poppins font-semibold",
  txtPoppinsSemiBold16: "font-poppins font-semibold",
  txtLatoRegular14: "font-lato font-normal",
  txtLatoMedium14: "font-lato font-medium",
  txtLatoSemiBold12Bluegray700: "font-lato font-semibold",
  txtDMSansMedium12: "font-dmsans font-medium",
  txtLatoRegular12: "font-lato font-normal",
  txtDMSansMedium11: "font-dmsans font-medium",
  txtPoppinsExtraBold16: "font-extrabold font-poppins",
  txtDMSansRegular12: "font-dmsans font-normal",
  txtInterRegular14: "font-inter font-normal",
  txtLatoRegular14Bluegray700bf: "font-lato font-normal",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
