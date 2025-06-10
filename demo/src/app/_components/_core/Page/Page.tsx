import React from "react";

const Page = ({
  Component,
  hoc,
}: {
  Component: React.ComponentType<any>;
  hoc?: (component: React.ComponentType<any>) => React.ComponentType<any>;
}) => {
  // eslint-disable-next-line no-console
  console.log("Page: rendering", Component?.name || typeof Component, "with hoc?", !!hoc);
  if (hoc) {
    const WrappedComponent = hoc(Component);
    return <WrappedComponent />;
  }
  return <Component />;
};

export { Page };
