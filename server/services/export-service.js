'use strict';

function getFieldsFromItems(items) {
  const fieldNames = new Set();
  items.forEach((item) => {
    try {
      Object.keys(item).forEach((fieldName) => fieldNames.add(fieldName));
    } catch (err) {
      console.error(err);
    }
  });

  return Array.from(fieldNames);
}

function jsonToCsv(data, headers) {
  const escapeQuote = (text) => text.replace(/\"/g, '""');
  return headers
    .map((header) => {
      const element = data[header];
      if (element === null || element == undefined) return "";

      if (typeof element === "object") {
        const textObject = JSON.stringify(element);
        return `"${escapeQuote(textObject)}"`;
      }

      if (
        typeof element === "string" &&
        (element.includes("\n") ||
          element.includes(",") ||
          element.includes('"'))
      ) {
        return `"${escapeQuote(element)}"`;
      }

      return element;
    })
    .join();
}

module.exports = ({strapi}) => ({
  async exportCSVData(contentType) {
    let isFetching = true;
    let offset = 0;
    let result = [];

    while (isFetching) {
      const data = await strapi.entityService.findMany(contentType, {
        sort: {
          id: 'ASC',
        },
        start: offset,
        limit: 100,
      });

      result.push(...data);
      offset += 100;

      if (data.length === 0) {
        isFetching = false;
        break;
      }
    }

    const fields = getFieldsFromItems(result);
    const csv = result.map((item) => jsonToCsv(item, fields)).join("\n");

    return {headers: fields, content: csv};
  }
});
