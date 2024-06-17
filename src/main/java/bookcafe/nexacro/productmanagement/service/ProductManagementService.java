package bookcafe.nexacro.productmanagement.service;

import java.util.List;
import java.util.Map;

public interface ProductManagementService {

	int product_save(Map<String, Object> save_date);

	Map<String, Object> delete_product(List<Map<String, Object>> del_date);

	Map<String, Object> update_product(List<Map<String, Object>> save_date);

	void img_path_food(String path);

	void img_path_book(String path);

	int businessclosure();
	




}
