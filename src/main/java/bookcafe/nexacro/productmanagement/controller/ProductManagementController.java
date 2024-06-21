package bookcafe.nexacro.productmanagement.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.soap.Addressing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.productmanagement.service.ProductManagementService;

@Controller
public class ProductManagementController {
	
	@Autowired
	ProductManagementService productservice;
	
	//추가
	@RequestMapping("save_date.do")
	public NexacroResult savedate(@ParamDataSet(name ="save_date", required = false)List<Map<String, Object>>save_date) {
		System.out.println("수정데이트" + save_date);
		NexacroResult product_save = new NexacroResult();
		
		product_save.addDataSet("message", productservice.product_save(save_date));
		System.out.println(product_save.getDataSets());
		return product_save;
		
	} 
	//다건 추가
	@RequestMapping("all_case_save.do")
	public NexacroResult allcasesave(@ParamDataSet(name ="trans")List<Map<String, Object>>trans) {
	System.out.println(trans);
		NexacroResult product_all_save = new NexacroResult();
		
		product_all_save.addDataSet("message", productservice.product_allsave(trans));
		
		return product_all_save;
		
	} 
	
	//제품 삭제
	@RequestMapping("del_date.do")
	public NexacroResult deldate(@ParamDataSet(name = "del_date", required = false)List<Map<String,Object>>del_date) {
		
		NexacroResult del =new NexacroResult();
		
			del.addDataSet("message", productservice.delete_product(del_date));
			System.out.println(del.getDataSets());
		return del;
		
		
	}

	
	//이미지 업로드
	@RequestMapping("/upload.do")
    public NexacroResult upload_food(HttpServletRequest request) throws IllegalStateException, IOException {
		Map<String, Object>result = new HashMap<>();
		 NexacroResult img_p = new NexacroResult();
		 
		String path = "";
		
		String savePath = "C:/Users/hcnc/git/TeamB/src/main/webapp/images/";//이미지 저장 경로
		
		LocalDateTime dateTime = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d-s");// 포맷을 지정합니다.
       
        String formattedDateTime = dateTime.format(formatter); // 출력한 "yyyy-MM-dd-ss"을 String으로 변환

        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request; //이미지는 HttpServletRequest로 받음
        
        Iterator<String> fileNames = multiRequest.getFileNames();//이미지의 이름을 fileNames에 초기화

        while (fileNames.hasNext()) {
        	
            MultipartFile file = multiRequest.getFile(fileNames.next());
            
                	String fileName = file.getOriginalFilename(); // C:\Users\hcnc\Pictures\Screenshots 파일이름.png
                	File file_name = new File(fileName); 
                	String path_name = file_name.getName(); // 파일이름.png로 path 삭제
                	int type_num =  path_name.lastIndexOf(".");//파일의 .위치를 찾아 int값을 저장
                    String type = path_name.substring(type_num); // ex) .png 
                    String type_name = path_name.substring(0,type_num); // 파일이름 
                    File dest = new File(savePath + type_name + formattedDateTime + type); // C:/Users/hcnc/git/TeamB/src/main/webapp/images/에 책방.날짜.png
                    file.transferTo(dest); // C:/Users/hcnc/git/TeamB/src/main/webapp/images/에 파일이름.png으로 저장
                    
                    path = "images/"+ type_name + formattedDateTime + type; //DB에 저장
                    
                    //productservice.img_path_food(path);
                  }
        	result.put("FILE_NAME", path);
        	img_p.addDataSet("File", result);
		return img_p;
                    
        }
	
	
		@RequestMapping("/upload_modi.do")
	    public void upload_modi(HttpServletRequest request) throws IllegalStateException, IOException {
			String savePath = "C:/Users/hcnc/git/TeamB/src/main/webapp/";//이미지 저장 경로
			
	        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request; //이미지는 HttpServletRequest로 받음
	        Iterator<String> fileNames = multiRequest.getFileNames();//이미지의 이름을 fileNames에 초기화
	        while (fileNames.hasNext()) {
	        	
	            MultipartFile file = multiRequest.getFile(fileNames.next());
	                	String fileName = file.getName(); //파일이름.png
	     
	                    File dest = new File(savePath + fileName); // C:/Users/hcnc/git/TeamB/src/main/webapp/images/에 책방.날짜.png
	                    file.transferTo(dest); // C:/Users/hcnc/git/TeamB/src/main/webapp/images/에 파일이름.png으로 저장
	                  }
	                    
			 
		}
		
		
		@RequestMapping("businessclosure.do")
		public NexacroResult businessclosure(){
			NexacroResult close = new NexacroResult();
			
			close.addVariable("businessclosure", productservice.businessclosure());
			
			return close;
		}
		
		@RequestMapping("serch_product.do")
		public NexacroResult serchproduct(@ParamVariable(name="serch_product", required = false)String serch_product){
			NexacroResult serch = new NexacroResult();
			
			serch.addDataSet("view_dtl", productservice.serchproduct(serch_product));
			return serch;
		
		
		}  
	
	
}
