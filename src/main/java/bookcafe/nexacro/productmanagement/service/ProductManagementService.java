package bookcafe.nexacro.productmanagement.service;

import java.util.List;
import java.util.Map;

public interface ProductManagementService {
	
	//음식 이미지 등록
	void Food_Product(String path);
	
	//도서 이미지 등록
	void BooK_Product(String path);
	
	//음식 등록
	int food_insert(Map<String, String> pM);
	
	//도서 등록
	int book_insert(Map<String, String> pM);

	//제품 등록
	List<Map<String, Object>> getProudct_date();






}
