import { triggerCelebration } from '../../../shared/lib';

export const handlePdfResumeExport = (onPrintCallback?: () => void) => {
  triggerCelebration();
  if (onPrintCallback) {
    onPrintCallback();
  } else {
    window.print();
  }
};
