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
	ProductManagementService productservice;
	
	@RequestMapping("save_date.do")
	public NexacroResult savedate(@ParamDataSet(name ="save_date")Map<String, Object>save_date) {
		System.out.println(save_date);
		NexacroResult product_save = new NexacroResult();
		
		product_save.addVariable("message", productservice.product_save(save_date));
		return product_save;
		
	} 
	
	@RequestMapping("del_date.do")
	public void deldate(@ParamDataSet(name = "del_date", required = false)List<Map<String,Object>>del_date) {
		System.out.println(del_date);	
		
		NexacroResult del =new NexacroResult();
		
			del.addDataSet("asd", productservice.delete_product(del_date));
		
		
		
		
	}
	
	@RequestMapping("modi.do")
	public void modi(@ParamDataSet(name = "save_date", required = false)List<Map<String,Object>>save_date){
		System.out.println(save_date);
		productservice.update_product(save_date);
		
	}
		
		
		
	
	
}
