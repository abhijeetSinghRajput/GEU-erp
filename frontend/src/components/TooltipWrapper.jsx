import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const TooltipWrapper = ({ children, content }) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;
