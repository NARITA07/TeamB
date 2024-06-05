package bookcafe.nexacro.productmanagement.service;

import java.util.List;
import java.util.Map;

public interface ProductManagementService {

	int product_save(Map<String, Object> save_date);

	int delete_product(List<Map<String, Object>> del_date);

	void update_product(List<Map<String, Object>> save_date);
	




}
