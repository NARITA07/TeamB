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
	public int product_save(Map<String, Object> save_date) {
		System.out.println(save_date);
		int result = 0;
		
	String bool = (String) save_date.get("FIR_CODE");
	
	if(bool.equals("fir_001")) {
		//도서에 저장
		result = productmapper.book_save(save_date);
		
	}else if(bool.equals("fir_002")) {
		//음식에 저장
		result = productmapper.food_save(save_date);
		
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

	@Override
	public Map<String, Object> update_product(List<Map<String, Object>> save_date) {
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

			
			
		
		
}




