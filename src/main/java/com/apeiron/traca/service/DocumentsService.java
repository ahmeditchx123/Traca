package com.apeiron.traca.service;



import javax.servlet.http.HttpServletResponse;
import java.io.File;

public interface DocumentsService {


    File printReport(Long id, HttpServletResponse response, String type);

}
