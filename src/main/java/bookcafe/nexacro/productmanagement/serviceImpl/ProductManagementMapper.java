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



	
}
