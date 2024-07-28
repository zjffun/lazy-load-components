import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import LazyLoading from "./LazyLoading";
import WithoutLazyLoading from "./WithoutLazyLoading";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="lazyLoading" />
          <Tab label="withoutLazyLoading" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LazyLoading></LazyLoading>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <WithoutLazyLoading></WithoutLazyLoading>
      </CustomTabPanel>
    </Box>
  );
}
