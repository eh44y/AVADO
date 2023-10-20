package com.avado.backend.controller;


import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.dto.ArticleResponseDto;
import com.avado.backend.dto.ChangeArticleRequestDto;
import com.avado.backend.dto.CreateArticleRequestDto;
import com.avado.backend.dto.MessageDto;
import com.avado.backend.dto.PageResponseDto;
import com.avado.backend.model.Attachment;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.model.FileStore;
import com.avado.backend.service.ArticleService;
import com.avado.backend.service.AttachmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/article")
public class ArticleController {
	private final ArticleService articleService;
	private final AttachmentService attachmentService;
	
	  @GetMapping("/page")
	    public ResponseEntity<Page<PageResponseDto>> pageArticle(@RequestParam(name = "page") int page) {
	        return ResponseEntity.ok(articleService.pageArticle(page));
	    }
	  
	  @GetMapping("/one")
	    public ResponseEntity<ArticleResponseDto> getOneArticle(@RequestParam(name = "id") Long id) {
	        return ResponseEntity.ok(articleService.oneArticle(id));
	    }
	
	 
	  @PostMapping("/")
	  public ResponseEntity<ArticleResponseDto> createArticle(@ModelAttribute CreateArticleRequestDto request, @RequestPart("file") MultipartFile file) {
		  try {
		       
				
		        // 게시글 생성
		        List<Attachment> attachments = attachmentService.saveAttachment(
		               Collections.singletonMap(AttachmentType.IMAGE, Collections.singletonList(file)));
		        String filename = attachments.get(0).getStorePath();
		        
		        ArticleResponseDto responseDto = articleService.postArticle(
		                request.getTitle(), request.getContent(), request.getNickname(), filename);

		        return ResponseEntity.ok(responseDto);
		    } catch (IOException e) {
		        e.printStackTrace();
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		    }
	  }
	  

	  

	  
	  @GetMapping("/change")
	  public ResponseEntity<ArticleResponseDto> getChangeArticle(@RequestParam(name = "id") Long id){
		  return ResponseEntity.ok(articleService.oneArticle((id)));
	  }
	  
	  @PutMapping("/")
	  public ResponseEntity<ArticleResponseDto> putChangeArticle(@RequestBody ChangeArticleRequestDto request){
		  return ResponseEntity.ok(articleService.changeArticle(request.getId(),request.getTitle(), request.getContent(),request.getFilename()));

	  }
	  
	  @DeleteMapping("/delete")
	  public ResponseEntity<MessageDto> deleteArticle(@RequestParam(name="id")Long id){
		  articleService.deleteArticle(id);
		  return ResponseEntity.ok(new MessageDto("Success"));
	  }
	  
	  
}
