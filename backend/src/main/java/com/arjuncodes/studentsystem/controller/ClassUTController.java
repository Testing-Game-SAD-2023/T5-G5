/*

package com.arjuncodes.studentsystem.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.arjuncodes.studentsystem.service.ClassUTServiceImpl;
import com.google.api.gax.paging.Page;
import com.google.cloud.storage.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/classut_repo")
@CrossOrigin
public class ClassUTController {





        @Autowired
        ClassUTServiceImpl classService;


        //List all file name
        @GetMapping
        public ResponseEntity<List<String>> listOfFiles() {

            List<String> files = classService.listOfFiles();

            return ResponseEntity.ok(files);
        }




        @GetMapping("download")
        public ResponseEntity<Resource> downloadFile(
                @RequestParam String fileName)  {

            ByteArrayResource resource = classService.downloadFile(fileName);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + fileName + "\"");

            return ResponseEntity.ok().
                    contentType(MediaType.APPLICATION_OCTET_STREAM).
                    headers(headers).body(resource);
        }
    }

*/




