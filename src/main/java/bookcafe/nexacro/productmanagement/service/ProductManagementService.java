package bookcafe.nexacro.productmanagement.service;

import java.util.List;
import java.util.Map;

public interface ProductManagementService {

	Map<String, Object> product_save(List<Map<String, Object>> save_date);

	Map<String, Object> delete_product(List<Map<String, Object>> del_date);

	Map<String, Object> update_product(List<Map<String, Object>> save_date);

	void img_path_food(String path);

	void img_path_book(String path);

	int businessclosure();

	int product_allsave(List<Map<String, Object>> trans);

	Map<String, Object> serchproduct(String serch_product);
	




}
