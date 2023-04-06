export const downloadFile = (name, content, type) => {
  const file = new Blob([content], {type});
  const fileURL = URL.createObjectURL(file);

  const dateTime = new Date().toLocaleDateString();
  const el = document.createElement('a');
  el.href = fileURL;
  el.download = `${name.replace(/[^a-zA-Z0-9]/g, "_")}-${dateTime}.csv`;
  el.click();
}

export default {downloadFile};
