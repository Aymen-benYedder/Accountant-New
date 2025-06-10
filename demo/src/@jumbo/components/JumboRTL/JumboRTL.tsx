import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { useJumboTheme } from "../JumboTheme/hooks";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const JumboRTL = (props:any) => {
  const { theme } = useJumboTheme();

  if (theme.direction === "rtl")
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;

  return props.children;
};

export default JumboRTL;
