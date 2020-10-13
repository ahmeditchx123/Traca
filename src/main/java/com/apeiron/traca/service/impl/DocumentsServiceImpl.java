package com.apeiron.traca.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import com.apeiron.traca.repository.DeliveryPackageRepository;
import com.apeiron.traca.repository.RunSheetRepository;
import com.apeiron.traca.service.DocumentsService;
import com.apeiron.traca.service.dto.DeliveryPackageDTO;
import com.apeiron.traca.service.dto.RunSheetDTO;
import com.apeiron.traca.service.mapper.DeliveryPackageMapper;
import com.apeiron.traca.service.mapper.RunSheetMapper;
import org.apache.commons.compress.utils.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@Service
public class DocumentsServiceImpl implements DocumentsService {

    private final Logger log = LoggerFactory.getLogger(DocumentsServiceImpl.class);

    private static final String logo_path = "/jasper/images/avatar.jpg";
    private final String delivery_form_template  = "/jasper/invoice.jrxml";
    private final String invoice_template = "/jasper/delivery_form.jrxml";

    private final DeliveryPackageRepository deliveryPackageRepository;
    private final RunSheetRepository runSheetRepository;
    private final DeliveryPackageMapper deliveryPackageMapper;
    private final RunSheetMapper runSheetMapper;

    public DocumentsServiceImpl(DeliveryPackageRepository deliveryPackageService, RunSheetRepository runSheetRepository, DeliveryPackageMapper deliveryPackageMapper, RunSheetMapper runSheetMapper) {
        this.deliveryPackageRepository = deliveryPackageService;
        this.runSheetRepository = runSheetRepository;
        this.deliveryPackageMapper = deliveryPackageMapper;
        this.runSheetMapper = runSheetMapper;
    }
    private File fileCreator(String fileName) {
        String osName = System.getProperty("os.name");
        String storedir = System.getProperty("java.io.tmpdir");
        String separator = "";
        if (osName == null)
            osName = "";
        if (osName.toLowerCase().contains("win")) {
            separator = "\\";
            if (storedir == null || storedir.equals(""))
                storedir = "c:\\";
        } else {
            separator = "/";
            storedir = "/tmp";
        }
        return new File(storedir + separator + fileName);
    }

    @Override
    public File printReport(Long id, HttpServletResponse response , String type) {
        ByteArrayOutputStream pdfReportStream = null;
         Optional<Object> reportDto = type.equals("run-sheet")  ? runSheetRepository.findById(id).map(runSheetMapper::toDto):
         deliveryPackageRepository.findById(id).map(deliveryPackageMapper::toDto);

        final Map<String, Object> parameters ;

        final JasperReport report ;


        if (!reportDto.isPresent()) {
            return null;
        }

        try {

            if(type.equals("delivery-package")){
            report = loadTemplate(delivery_form_template);
            }
            else if(type.equals("run-sheet")){
             report = loadTemplate(invoice_template);
            }
            else{
                throw new Exception("No supported jasper template");
            }
            final JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(Collections.singletonList("Invoice"));
            parameters = parameters(reportDto.get(), Locale.FRANCE);

            JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters, dataSource);

            JRPdfExporter pdfExporter = new JRPdfExporter();
            pdfExporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            pdfReportStream = new ByteArrayOutputStream();
            pdfExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(pdfReportStream));
            pdfExporter.exportReport();

            OutputStream responseOutputStream = response.getOutputStream();
            responseOutputStream.write(pdfReportStream.toByteArray());

        } catch (Exception e) {
            log.error("Error creating the pdf stream !",e);
        }

        byte[] bytes = new byte[0];
        if (pdfReportStream!=null) {
            bytes = pdfReportStream.toByteArray();
        }
        InputStream inputStream = new ByteArrayInputStream(bytes);
        File file = fileCreator("report.pdf");
        try(OutputStream outputStream = new FileOutputStream(file)){
            IOUtils.copy(inputStream, outputStream);

        } catch (FileNotFoundException e) {
            log.error("Error writing the pdf stream  FileNotFoundException !",e);
        } catch (IOException e) {
            log.error("Error writing the pdf stream  IOException!",e);        }
        return file;
    }


    /**
     * method  to fill the template order parameters
     *
     * @param
     * @param locale
     * @return
     */
    private Map<String, Object> parameters(Object entity, Locale locale) {
        final Map<String, Object> parameters = new HashMap<String, Object>();

        if (entity instanceof DeliveryPackageDTO) {
            parameters.put("order", (DeliveryPackageDTO) entity);
        }else if (entity instanceof RunSheetDTO){
            parameters.put("runSheet", (RunSheetDTO) entity);
        }
        parameters.put("logo", getClass().getResourceAsStream(logo_path));
        parameters.put("REPORT_LOCALE", locale);

        return parameters;
    }

    /**
     * method for Load invoice jrxml template
     *
     * @return
     * @throws JRException
     */
    private JasperReport loadTemplate(String urlJrxml) throws JRException, FileNotFoundException {

        final InputStream reportInputStream = getClass().getResourceAsStream(urlJrxml);
        log.info("Load the template.jrxml");
        final JasperDesign jasperDesign = JRXmlLoader.load(reportInputStream);
        log.info("jasper compileReport design.");
        return JasperCompileManager.compileReport(jasperDesign);

    }
}
