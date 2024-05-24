package bookcafe.nexacro.mebership.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.mebership.service.MemberManagermentService;

@Controller
public class MemberManagermentCtroller {
	
	//@ParamVariable(name="member", required = false) String member 변수 이용 시 사용
	
	@Autowired
	MemberManagermentService mms;
	
	//회원관리
	@RequestMapping("membermanagement.do")
	public NexacroResult Admin_membership() {   
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언 
		
		List<Map<String, Object>> member =  mms.select_member();
			
		result.addDataSet("Member_Management", member);
		
		return result;
		
	}
	@RequestMapping("/upload.do")
    public void upload_img(HttpServletRequest request) {
		
		System.out.println("aa");
		
		String savePath = "C:/Users/hcnc/git/TeamB/src/main/webapp/images/";//이미지 저장 경로
		
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
                    
                  mms.img_path(path);
                    
                } catch (IOException e) {//예외 처리
                    e.printStackTrace();
                }
            }
        
    }
	
}