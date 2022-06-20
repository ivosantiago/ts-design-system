import React from "react";
import styled, { css } from "styled-components";
import { background, color, typography } from "./shared/styles";

type BadgeStatus = "positive" | "negative" | "neutral" | "error" | "warning";

interface BadgeWrapperProps {
  status: BadgeStatus;
}

const BadgeWrapper = styled.div<BadgeWrapperProps>`
  display: inline-block;
  vertical-align: top;
  font-size: 11px;
  line-height: 12px;
  padding: 4px 12px;
  border-radius: 3em;
  font-weight: ${typography.weight.bold};

  svg {
    height: 12px;
    width: 12px;
    margin-right: 4px;
    margin-top: -2px;
  }

  ${(props) =>
    props.status === "positive" &&
    css`
      color: ${color.positive};
      background: ${background.positive};
    `};

  ${(props) =>
    props.status === "negative" &&
    css`
      color: ${color.negative};
      background: ${background.negative};
    `};

  ${(props) =>
    props.status === "warning" &&
    css`
      color: ${color.warning};
      background: ${background.warning};
    `};

  ${(props) =>
    props.status === "error" &&
    css`
      color: ${color.lightest};
      background: ${color.negative};
    `};

  ${(props) =>
    props.status === "neutral" &&
    css`
      color: ${color.dark};
      background: ${color.mediumlight};
    `};
`;

interface BadgeProps {
  status: BadgeStatus;
  children?: React.ReactNode;
}

/**
 * **Badges?!** We don't need no stinkin' badges!!
 */
export function Badge({ status = "neutral", ...props }: BadgeProps) {
  return <BadgeWrapper status={status} {...props} />;
}
