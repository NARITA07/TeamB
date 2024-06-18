package bookcafe.nexacro.productmanagement.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.productmanagement.service.ProductManagementService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service
public class ProductManagementServiceImpl extends EgovAbstractServiceImpl implements ProductManagementService{
	
	@Autowired
	ProductManagementMapper productmapper;

	@Override
	public int product_save(List<Map<String, Object>> save_date) {
		int result = 0;
		
		for(int i = 0; i < save_date.size(); i++) {
			
			if(save_date.get(i).get("PRODUCT_CODE").equals("도서")) {
			result += productmapper.insert_book(save_date.get(i));
				
			}else if(save_date.get(i).get("PRODUCT_CODE").equals("음식")) {
				
				result += productmapper.insert_food(save_date.get(i));
			}
			
		}
		
		
		return result;
	}

	@Override
	public Map<String, Object> delete_product(List<Map<String, Object>> del_date) {
		Map<String, Object>nums = new HashMap<>();
		int num = 0;
		
		for(int i = 0; i < del_date.size(); i++) {
			
			String date = (String) del_date.get(i).get("PRODUCT_CODE");
			
			if(date.substring(0,1).equals("f")) {
				
				num += productmapper. delete_food(del_date.get(i));
				
			}else if(date.substring(0,1).equals("b")) {
				
				num += productmapper. delete_book(del_date.get(i));
			}
			
			
		}
		
		nums.put("num", num);
		return nums;
	}

	//제품 수정
	@Override
	public Map<String, Object> update_product(List<Map<String, Object>> save_date) {
		System.out.println(save_date);
		Map<String, Object>nums = new HashMap<>();
		int num = 0;
		
		for(int i = 0; i < save_date.size(); i++){
			
			String date = (String)save_date.get(i).get("PRODUCT_CODE");
			
			
			if(date.substring(0,1).equals("f")) {
				
				num += productmapper.update_food(save_date.get(i));
				
			}else if(date.substring(0,1).equals("b")) {
				
				num += productmapper. update_book(save_date.get(i));
			}
			
			
		}
		nums.put("num", num);
		return nums;
	}

	public void img_path_book(String path) {
		productmapper.img_path_book(path);
		
	}	
	
	public void img_path_food(String path) {
		productmapper.img_path_food(path);
		
	}

	@Override
	public int businessclosure() {
		int date = 0;
		
		//반납 책 확인 
		if(productmapper.bookReturn() >0) {// 반납할 책이 1개라도 있으면 
			date = productmapper.bookReturn();
			return date;
			
		}else{ //VIP 등급 변경
			productmapper.updatevipstatus(); //vip 업뎃
			
			productmapper.updateuserleadbook();
		}
		
		
		
		
		//이후 마감 
		System.out.println(date);
		return date;
	}

	@Override
	public int product_allsave(List<Map<String, Object>> trans) {
		
		int date = 0;
		//String sdate = "";
		
		for(int i = 0; i < trans.size(); i++) {
			
			date = productmapper.product_allsavef(trans.get(i));
			
			
//			sdate = (String)trans.get(i).get("분류코드");
//			
//				if(sdate.substring(0,1).equals("b")){
//					date += productmapper.product_allsaveb(trans.get(i));
//				
//			}else if(sdate.substring(0,1).equals("f")) {
//				
//				date += productmapper.product_allsavef(trans.get(i));
				
			}
			
			
			
//		}

		return date;
	
	}	

			
			
		
		
}




