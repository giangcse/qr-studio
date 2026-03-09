import { useEffect, useRef } from "react";
import { QRCodeStyling } from "../lib/qrCodeStylingLoader";

export const useQrStyling = (config, data) => {
  const qrRef = useRef(null);
  const qrCodeInstance = useRef(null);

  useEffect(() => {
    if (!qrRef.current) return;

    if (!qrCodeInstance.current) {
      qrCodeInstance.current = new QRCodeStyling({
        width: config.size,
        height: config.size,
        margin: 16,
        data,
        image: config.logo,
        dotsOptions: {
          color: config.useGradient ? undefined : config.fgColor,
          type: config.dotsType,
          gradient: config.useGradient
            ? {
                type: "linear",
                rotation: 45,
                colorStops: [
                  { offset: 0, color: config.fgColor },
                  { offset: 1, color: config.gradientColor },
                ],
              }
            : null,
        },
        backgroundOptions: { color: config.bgColor },
        imageOptions: { crossOrigin: "anonymous", margin: 5 },
        cornersSquareOptions: {
          type: config.cornersType,
          color: config.fgColor,
        },
        cornersDotOptions: {
          type: config.cornersDotType,
          color: config.fgColor,
        },
      });
      qrCodeInstance.current.append(qrRef.current);
      return;
    }

    const dotsOptions = {
      type: config.dotsType,
      color: config.useGradient ? undefined : config.fgColor,
      gradient: config.useGradient
        ? {
            type: "linear",
            rotation: 45,
            colorStops: [
              { offset: 0, color: config.fgColor },
              { offset: 1, color: config.gradientColor },
            ],
          }
        : null,
    };

    qrCodeInstance.current.update({
      data,
      width: config.size,
      height: config.size,
      margin: 16,
      image: config.logo,
      dotsOptions,
      backgroundOptions: { color: config.bgColor },
      cornersSquareOptions: { type: config.cornersType, color: config.fgColor },
      cornersDotOptions: {
        type: config.cornersDotType,
        color: config.fgColor,
      },
    });
  }, [config]);

  const download = (extension) => {
    if (!qrCodeInstance.current) return;
    qrCodeInstance.current.download({ name: "qr-code", extension });
  };

  const copyToClipboard = async () => {
    if (!qrRef.current || !config.size) return false;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return false;

    try {
      const xml = new XMLSerializer().serializeToString(svg);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const img = new Image();
      img.src = `data:image/svg+xml;base64,${svg64}`;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = config.size;
      canvas.height = config.size;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
      if (!blob) return false;

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  return {
    qrRef,
    isReady: Boolean(qrCodeInstance.current),
    download,
    copyToClipboard,
  };
};

