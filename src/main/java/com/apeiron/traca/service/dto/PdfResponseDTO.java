package com.apeiron.traca.service.dto;

import java.io.InputStream;

public class PdfResponseDTO {
    private InputStream pdfEncoded;

    public InputStream getPdfEncoded() {
        return pdfEncoded;
    }

    public void setPdfEncoded(InputStream pdfEncoded) {
        this.pdfEncoded = pdfEncoded;
    }
}
