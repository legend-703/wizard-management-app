import {
  Email,
  Description,
  Code,
  CheckCircle,
  Settings,
  HelpOutline,
} from "@mui/icons-material";
import React from "react";

export const stepTypeMeta: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  email: { icon: Email, color: "#1976d2", label: "Email Step" }, // blue
  form: { icon: Description, color: "#0288d1", label: "Form Step" }, // light blue
  api: { icon: Code, color: "#f57c00", label: "API Step" }, // orange
  action: { icon: CheckCircle, color: "#388e3c", label: "Action Step" }, // green
  config: { icon: Settings, color: "#7b1fa2", label: "Config Step" }, // purple
  default: { icon: HelpOutline, color: "#9e9e9e", label: "Step" }, // gray
};
