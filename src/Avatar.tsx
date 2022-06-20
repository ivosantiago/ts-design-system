import React from "react";
import styled, { css } from "styled-components";
import { color, typography } from "./shared/styles";
import { glow } from "./shared/animation";
import { Icon } from "./Icon";

export const sizes = {
  large: 40,
  medium: 28,
  small: 20,
  tiny: 16,
};

interface A11yProps {
  "aria-busy"?: boolean;
  "aria-label"?: string;
}

interface ImageProps extends A11yProps {
  size: keyof typeof sizes;
  loading: boolean;
  src?: string;
}

const Image = styled.div<ImageProps>`
  background: ${(props) => (!props.loading ? "transparent" : color.light)};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-transform: uppercase;

  height: ${sizes.medium}px;
  width: ${sizes.medium}px;
  line-height: ${sizes.medium}px;

  ${(props) =>
    props.size === "tiny" &&
    css`
      height: ${sizes.tiny}px;
      width: ${sizes.tiny}px;
      line-height: ${sizes.tiny}px;
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      height: ${sizes.small}px;
      width: ${sizes.small}px;
      line-height: ${sizes.small}px;
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      height: ${sizes.large}px;
      width: ${sizes.large}px;
      line-height: ${sizes.large}px;
    `}

  ${(props) =>
    !props.src &&
    css`
      background: ${!props.loading && "#37D5D3"};
    `}

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  svg {
    position: relative;
    bottom: -2px;
    height: 100%;
    width: 100%;
    vertical-align: top;
  }

  path {
    fill: ${color.medium};
    animation: ${glow} 1.5s ease-in-out infinite;
  }
`;

interface InitialProps {
  size: keyof typeof sizes;
  "aria-hidden": "true";
}
// prettier-ignore
const Initial = styled.div<InitialProps>`
  color: ${color.lightest};
  text-align: center;

  font-size: ${typography.size.s2}px;
  line-height: ${sizes.medium}px;

  ${props => props.size === "tiny" && css`
    font-size: ${+(typography.size.s1) - 2}px;
    line-height: ${sizes.tiny}px;
  `}

  ${props => props.size === "small" && css`
    font-size: ${typography.size.s1}px;
    line-height: ${sizes.small}px;
  `}

  ${props => props.size === "large" && css`
    font-size: ${typography.size.s3}px;
    line-height: ${sizes.large}px;
  `}
`;

interface AvatarProps {
  loading?: boolean;
  username?: string;
  src?: string;
  size?: keyof typeof sizes;
}

export function Avatar({
  loading = false,
  username = "loading",
  src,
  size = "medium",
  ...props
}: AvatarProps) {
  let avatarFigure = <Icon icon="useralt" />;
  const a11yProps: A11yProps = {};

  if (loading) {
    a11yProps["aria-busy"] = true;
    a11yProps["aria-label"] = "Loading avatar ...";
  } else if (src) {
    avatarFigure = <img src={src} alt={username} />;
  } else {
    a11yProps["aria-label"] = username;
    avatarFigure = (
      <Initial size={size} aria-hidden="true">
        {username.substring(0, 1)}
      </Initial>
    );
  }

  return (
    <Image size={size} loading={loading} src={src} {...a11yProps} {...props}>
      {avatarFigure}
    </Image>
  );
}
