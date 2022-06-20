/* eslint-disable import/no-extraneous-dependencies */
// This is allows us to test whether the link works via the actions addon
import React from "react";
import { action } from "@storybook/addon-actions";

const fireClickAction = action("onLinkClick");

interface StoryLinkWrapperProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  to?: string;
}

export function StoryLinkWrapper({
  children,
  className = "",
  href,
  onClick = () => {},
  to,
  ...rest
}: StoryLinkWrapperProps) {
  const modifiedOnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick();
    fireClickAction(href || to);
  };

  return (
    <a
      className={className}
      href={href || to}
      onClick={modifiedOnClick}
      {...rest}
    >
      {children}
    </a>
  );
}
