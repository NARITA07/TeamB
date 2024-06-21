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
	public Map<String, Object> product_save(List<Map<String, Object>> save_date) {
		Map<String, Object> num = new HashMap<>();
		int result = 0;
		
		for(int i = 0; i < save_date.size(); i++) {
			
		if(save_date.get(i).get("PRODUCT_CODE").equals("도서")) {//인서트
			result += productmapper.insert_book(save_date.get(i));
				
			}else if(save_date.get(i).get("PRODUCT_CODE").equals("음식")) {//인서트
				
				result += productmapper.insert_food(save_date.get(i));
			}else {//업데이트
				
					String data = (String)save_date.get(i).get("PRODUCT_CODE");
					System.out.println(data.substring(0,1));
					if(data.substring(0,1).equals("f")) {
						//음식
						result += productmapper.update_food(save_date.get(i));
					}else if(data.substring(0,1).equals("b")) {
						//도서
						result += productmapper.update_book(save_date.get(i));
					}
						
					
				
			}
			
		}
		
		num.put("num", result);
		
		return num;
	}

	@Override
	public Map<String, Object> delete_product(List<Map<String, Object>> del_date) {
		Map<String, Object>nums = new HashMap<>();
		int num = 0;
		String mes = "";
		for(int i = 0; i < del_date.size(); i++) {
			String date = (String) del_date.get(i).get("PRODUCT_CODE");
				if(date.substring(0,1).equals("f")) {//분류 구분
					if(productmapper.product_quantity(del_date.get(i).get("PRODUCT_CODE")) == 0) {
						if(productmapper.stock_order_status(del_date.get(i).get("PRODUCT_CODE")) == null) {
												
							//입고 주문한적이 없음. - > 삭제
							num += productmapper.delete_food(del_date.get(i));
							
						}else if(productmapper.stock_order_status(del_date.get(i).get("PRODUCT_CODE")) >0) {
							//입고 주문한적이 있으나 현재 입고가 다 끝난 상태 -> 삭제
							num += productmapper.delete_food(del_date.get(i));
						}else {
							
							//주문이 들어가서 입고 대기중 ->삭제 불가능;
							
							mes += (String) del_date.get(i).get("PRODUCT_NAME") + "제품이 입고대기 중인 항목입니다.*\n";
						}
				}else {
					//재고 남아있음 ->삭제 불가능
					mes += (String) del_date.get(i).get("PRODUCT_NAME")+ "제품의 재고가 남아있습니다.*\n";
					
				}
				
				
			}else if(date.substring(0,1).equals("b")) {
				String book_quantity = (String) del_date.get(i).get("PRODUCT_CODE");
				//도서는 대여상태라면 삭제 불가능.
					if(productmapper.book_quantity(book_quantity).equals("N")) {
							System.out.println("대여상태"+ del_date.get(i));
						mes += (String) del_date.get(i).get("PRODUCT_NAME") + " 도서는 현재 대여상태입니다.*\n";
					}else {
						
						num += productmapper.delete_book(del_date.get(i));
						
					}
				
			}
			
			
		}
		
		nums.put("num", num);
		nums.put("mes", mes);
		return nums;
	}

	//제품 수정
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
		
		
		return date;
	}

	@Override
	public int product_allsave(List<Map<String, Object>> trans) {
		
		int date = 0;
		//String sdate = "";
		
		for(int i = 0; i < trans.size(); i++) {
			
			date = productmapper.product_allsavef(trans.get(i));
			
				
			}
			
			
			
//		}

		return date;
	
	}

	@Override
	public Map<String, Object> serchproduct(String serch_product) {
			return productmapper.serchproduct(serch_product);
	}	
}




