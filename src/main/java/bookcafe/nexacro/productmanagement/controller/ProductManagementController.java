package bookcafe.nexacro.productmanagement.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
	ProductManagementService pms;
	
	@RequestMapping("product.do")
	public NexacroResult product(@ParamDataSet(name="Pr_date", required = false)Map<String,String>Pr_date) {
		NexacroResult re = new NexacroResult();
		System.out.println("제품 업글 "+ Pr_date);
		
		int result = 0;
			System.out.println(Pr_date.get("FIR_CODE"));
			if(Pr_date.get("FIR_CODE").equals("fir_002")) {
				System.out.println("음식임");
			 result =pms.food_insert(Pr_date);
			
			}else if(Pr_date.get("FIR_CODE").equals("fir_001")) {
					System.out.println("책임");
				result = pms.book_insert(Pr_date);
			}
			
			re.addDataSet("re", result);
			
		return re;
	}
	
	
	//음식 등록
	@RequestMapping("/food.do")
    public NexacroResult food(HttpServletRequest request, Object success, Map<String,Object> data) {
		NexacroResult result = new NexacroResult();
		
		String savePath = "C:/Users/wornt/git/TeamB/src/main/webapp/images/";//이미지 저장 경로
		
		LocalDateTime dateTime = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-ss");// 포맷을 지정합니다.
       
        String formattedDateTime = dateTime.format(formatter); // 출력한 "yyyy-MM-dd-ss"을 String으로 변환

        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request; //이미지는 HttpServletRequest로 받음
        
        Iterator<String> fileNames = multiRequest.getFileNames();//이미지의 이름을 fileNames에 초기화

        while (fileNames.hasNext()) {
        	
            MultipartFile file = multiRequest.getFile(fileNames.next());
            
                try {
                	
                	String fileName = file.getOriginalFilename(); // C:\Users\hcnc\Pictures\Screenshots 파일이름.png
                    
                    File file_name = new File(fileName); 
                    
                    String path_name = file_name.getName(); // 파일이름.png로 path 삭제
                  
                    int s =  path_name.lastIndexOf(".");//파일의 .위치를 찾아 int값을 저장
                    
                    String type = path_name.substring(s); // ex) .png 
                    
                    File dest = new File(savePath + "책빵" + formattedDateTime + type); // C:/Users/hcnc/git/TeamB/src/main/webapp/images/에 책방.날짜.png
                	System.out.println(dest);
                    file.transferTo(dest); // C:/Users/hcnc/git/TeamB/src/main/webapp/images/에 파일이름.png으로 저장
                    
                    String path = "images/" + "책빵" + formattedDateTime + type; //DB에 저장
                    
                    pms.Food_Product(path);
                    
                    
                    success = path; // object success path값을 초기
                
                    
                } catch (IOException e) {//예외 처리
                    e.printStackTrace();
                }
            }
        
        data.put("PRODUCT_PATH", success);
        
        result.addDataSet("PM", data);
        
        return result;
    }
	@RequestMapping("/book.do")
    public NexacroResult book(HttpServletRequest request, Object success, Map<String,Object> data) {
		NexacroResult result = new NexacroResult();
		
		String savePath = "C:/Users/wornt/git/TeamB/src/main/webapp/images/";//이미지 저장 경로
		
		LocalDateTime dateTime = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-ss");// 포맷을 지정합니다.
       
        String formattedDateTime = dateTime.format(formatter); // 출력한 "yyyy-MM-dd-ss"을 String으로 변환

        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request; //이미지는 HttpServletRequest로 받음
        
        Iterator<String> fileNames = multiRequest.getFileNames();//이미지의 이름을 fileNames에 초기화

        while (fileNames.hasNext()) {
        	
            MultipartFile file = multiRequest.getFile(fileNames.next());
            
                try {
                	
                	String fileName = file.getOriginalFilename(); // C:\Users\hcnc\Pictures\Screenshots 파일이름.png
                    
                    File file_name = new File(fileName); 
                    
                    String path_name = file_name.getName(); // 파일이름.png로 path 삭제
                  
                    int s =  path_name.lastIndexOf(".");//파일의 .위치를 찾아 int값을 저장
                    
                    String type = path_name.substring(s); // ex) .png 
                    
                    File dest = new File(savePath + "책빵" + formattedDateTime + type); // C:/Users/hcnc/git/TeamB/src/main/webapp/images/에 책방.날짜.png
                	System.out.println(dest);
                    file.transferTo(dest); // C:/Users/hcnc/git/TeamB/src/main/webapp/images/에 파일이름.png으로 저장
                    
                    String path = "images/" + "책빵" + formattedDateTime + type; //DB에 저장
                    
                    pms.BooK_Product(path);
                    
                    
                    success = path; // object success path값을 초기
                
                    
                } catch (IOException e) {//예외 처리
                    e.printStackTrace();
                }
            }
        
        data.put("PRODUCT_PATH", success);
        
        result.addDataSet("PM", data);
        
        return result;
    }
	
	//등록된 제품
	@RequestMapping("getproduct_date.do")
	public NexacroResult getproduct_date() {
		System.out.println("제품");
		NexacroResult result = new NexacroResult();
		
		List<Map<String, Object>> date = pms.getProudct_date();
		
		result.addDataSet("product", date);
		
		return result;
		
	}
	
	
	
}
