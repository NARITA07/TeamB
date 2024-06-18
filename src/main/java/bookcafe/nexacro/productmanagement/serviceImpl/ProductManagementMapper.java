package bookcafe.nexacro.productmanagement.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface ProductManagementMapper {

	int book_save(Map<String, Object> save_date);

	int food_save(Map<String, Object> save_date);

	int delete_food(Map<String, Object> map);

	int delete_book(Map<String, Object> map);

	int update_food(Map<String, Object> map);

	int update_book(Map<String, Object> map);

	void img_path_book(String path);

	void img_path_food(String path);

	//반납
	int bookReturn();

	int updatevipstatus();

	void updateuserleadbook();

	void downdatevipstatus();

	int product_allsavef(Map<String, Object> map);

	int product_allsaveb(Map<String, Object> map);

	int insert_book(Map<String, Object> map);

	int insert_food(Map<String, Object> map);



	
}
