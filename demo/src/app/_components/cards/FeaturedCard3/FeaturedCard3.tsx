import { Div } from "@jumbo/shared";
import { getBackgroundColorStyle } from "@jumbo/utilities/helpers";
import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderProps,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";

type FeaturedCard3Props = CardHeaderProps & {
  children?: React.ReactNode;
  headerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  bgcolor?: string[];
  textColor?: string;
  headHeight?: number | string;
};

function FeaturedCard3({
  avatar,
  title,
  subheader,
  action,
  sx = {},
  children,
  contentSx,
  headerSx = {},
  bgcolor,
  textColor,
}: FeaturedCard3Props) {
  const bgColorStyle = getBackgroundColorStyle(bgcolor);
  const colorStyle = textColor ? { color: textColor } : {};
  return (
    <Card>
      <Div sx={{ ...bgColorStyle, ...colorStyle, ...sx }}>
        {action && <CardHeader action={action} />}
        <CardContent
          sx={{
            textAlign: "center",
            ...headerSx,
          }}
        >
          {avatar}
          {renderTitle(title, textColor)}
          {renderSubheader(subheader, textColor)}
        </CardContent>
      </Div>
      {children && (
        <CardContent
          sx={{
            textAlign: "center",
            bgcolor: (theme) => theme.palette.action.hover,
            ...contentSx,
          }}
        >
          {children}
        </CardContent>
      )}
    </Card>
  );
}

function renderTitle(title?: string | React.ReactNode, textColor?: string) {
  if (!title) {
    return null;
  }

  if (typeof title === "string") {
    return (
      <Typography variant={"h5"} {...(textColor && { color: textColor })}>
        {title}
      </Typography>
    );
  }

  return title;
}

function renderSubheader(
  subheader?: string | React.ReactNode,
  textColor?: string
) {
  if (!subheader) {
    return null;
  }

  if (typeof subheader === "string") {
    return (
      <Typography
        variant={"h6"}
        {...(textColor ? { color: textColor } : { color: "text.secondary" })}
        mb={2}
      >
        {subheader}
      </Typography>
    );
  }

  return subheader;
}

export { FeaturedCard3 };
