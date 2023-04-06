'use strict';

module.exports = ({strapi}) => ({
  async exportCSV(ctx) {
    const {contentType} = ctx.params;

    try {
      strapi.contentType(contentType);
    } catch (err) {
      ctx.badRequest(null, [{messages: [{id: 'Content type does not exist'}]}]);
    }

    const {headers, content} = await strapi.plugin('csv-export').service('csvExport').exportCSVData(contentType);


    ctx.send({data: `${headers.join()}\n${content}`})
  },
});
