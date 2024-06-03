package bookcafe.nexacro.productmanagement.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.productmanagement.service.ProductManagementService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service
public class ProductManagementServiceImpl extends EgovAbstractServiceImpl implements ProductManagementService{

	@Autowired
	ProductManagementMapper pmm;
	
	//음식 이미지 등록
	@Override
	public void Food_Product(String path) {
		pmm.Food_Product(path);
	}
	
	//도서 이미지 등록
	@Override
	public void BooK_Product(String path) {
		pmm.BooK_Product(path);
		
	}
	
	//음식 등록
	@Override
	public int food_insert(Map<String, String> pM) {
		return  pmm.food_insert(pM);
		
	}
	
	//도서 등록
	@Override
	public int book_insert(Map<String, String> pM) {
		
		return pmm.book_insert(pM);
	}

	//등록된 제품 
	@Override
	public List<Map<String, Object>> getProudct_date() {
		// TODO Auto-generated method stub
		return pmm.getProduct_date();
	}




}
