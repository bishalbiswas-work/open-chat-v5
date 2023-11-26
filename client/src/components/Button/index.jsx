import React from "react";
import PropTypes from "prop-types";

const shapes = { round: "rounded-[20px]", circle: "rounded-[50%]" };
const variants = {
  fill: {
    white_A700: "bg-white-A700",
    green_A700: "bg-green-A700",
    blue_A400: "bg-blue-A400",
    blue_500: "bg-blue-500",
    gray_50_01: "bg-gray-50_01",
  },
  gradient: {
    amber_200_indigo_A200: "bg-gradient2 ",
    deep_purple_A200_33_deep_purple_700_33: "bg-gradient1 ",
    purple_800_indigo_800: "bg-gradient ",
    deep_purple_A200_deep_purple_700: "bg-gradient3  text-white-A700",
  },
};
const sizes = { xs: "p-0.5", sm: "p-2", md: "p-[11px]", lg: "p-3.5" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "md",
  variant = "gradient",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["round", "circle"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  variant: PropTypes.oneOf(["fill", "gradient"]),
  color: PropTypes.oneOf([
    "white_A700",
    "green_A700",
    "blue_A400",
    "blue_500",
    "gray_50_01",
    "amber_200_indigo_A200",
    "deep_purple_A200_33_deep_purple_700_33",
    "purple_800_indigo_800",
    "deep_purple_A200_deep_purple_700",
  ]),
};

export { Button };
