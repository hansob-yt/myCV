export const handlePdfResumeExport = (onPrintCallback?: () => void) => {
  if (onPrintCallback) {
    onPrintCallback();
  } else {
    window.print();
  }
};
