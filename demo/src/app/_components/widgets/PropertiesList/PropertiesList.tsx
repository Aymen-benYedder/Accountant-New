import { CardHeaderWithExtras } from "@app/_components/_core";
import { JumboCard, JumboScrollbar, JumboTabs } from "@jumbo/components";
import { JumboDdMenu } from "@jumbo/components/JumboDdMenu";
import { Refresh, Settings } from "@mui/icons-material";
import { CardContent } from "@mui/material";
import React from "react";
import { Properties } from "./components";
import {
  PropertyCategoryType,
  PropertyType,
  properties,
  propertyCategories,
} from "./data";

function useFilterProperties(
  properties: PropertyType[],
  category: PropertyCategoryType
) {
  if (category.slug === "all") return properties;
  return properties.filter((item) => item.category === category.slug);
}

const PropertiesList = ({ title }: { title: React.ReactNode }) => {
  const [activeCategory, setActiveCategory] =
    React.useState<PropertyCategoryType>(propertyCategories[0]);

  const visibleItems = useFilterProperties(properties, activeCategory);
  const handleTabChange = React.useCallback((item: any) => {
    setActiveCategory(item);
  }, []);
  return (
    <JumboCard>
      <CardHeaderWithExtras
        title={title}
        extras={
          <JumboTabs
            items={propertyCategories}
            onChange={handleTabChange}
            primaryKey="slug"
            labelKey="name"
            defaultValue={propertyCategories[0]}
          />
        }
        action={
          <JumboDdMenu
            menuItems={[
              { icon: <Refresh />, title: "Refresh" },
              { icon: <Settings />, title: "Settings" },
            ]}
          />
        }
        spacing={3}
        sx={{
          borderBottom: 1,
          borderBottomColor: "divider",
        }}
      />
      <CardContent
        sx={{
          p: 0,
          "& .MuiCollapse-entered:last-child": {
            "& .MuiListItemButton-root": {
              borderBottom: 0,
              borderBottomColor: "transparent",
            },
          },
        }}
      >
        <JumboScrollbar autoHeight autoHeightMin={554}>
          <Properties items={visibleItems} />
        </JumboScrollbar>
      </CardContent>
    </JumboCard>
  );
};

export { PropertiesList };
