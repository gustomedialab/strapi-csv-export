import React, { useState } from "react";
import { Button } from "@strapi/design-system/Button";
import { useSelector } from "react-redux";
import _get from "lodash/get";
import { downloadFile } from "../../utils/exportUtils";
import { request } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";

export const ExportButton = ({ strapi }) => {
  const [isLoading, setIsLoading] = useState(false);
  const contentTypeUID = useSelector((state) =>
    _get(state, ["content-manager_listView", "contentType", "uid"], null)
  );
  const handleClick = async () => {
    setIsLoading(true);
    const { data } = await request(`/${pluginId}/${contentTypeUID}`);
    downloadFile(contentTypeUID, data, "text/csv");
    setIsLoading(false);
  };

  return (
    <Button onClick={handleClick} disabled={isLoading} loading={isLoading}>
      Export
    </Button>
  );
};
